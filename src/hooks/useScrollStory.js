import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { clamp01 } from '../utils/animation'

function buildRanges(scenes) {
  const totalLength = scenes.reduce((sum, scene) => sum + scene.length, 0)
  let cursor = 0

  return scenes.map((scene) => {
    const start = cursor / totalLength
    cursor += scene.length
    const end = cursor / totalLength

    return {
      id: scene.id,
      start,
      end,
      span: end - start,
    }
  })
}

function getActiveScene(ranges, progress) {
  for (let index = 0; index < ranges.length; index += 1) {
    const range = ranges[index]
    const isLast = index === ranges.length - 1

    if (progress >= range.start && (progress < range.end || isLast)) {
      return index
    }
  }

  return 0
}

function getSceneVisibility(range, index, totalScenes, progress) {
  const isFirst = index === 0
  const isLast = index === totalScenes - 1

  const enterStart = range.start
  const fullyVisibleStart = range.start + range.span * (isFirst ? 0.06 : 0.1)
  const fullyVisibleEnd = range.end - range.span * (isLast ? 0.12 : 0.18)
  const leaveEnd = range.end

  if (progress <= enterStart) {
    return isFirst && progress === 0 ? 1 : 0
  }

  if (progress < fullyVisibleStart) {
    return clamp01((progress - enterStart) / (fullyVisibleStart - enterStart))
  }

  if (progress <= fullyVisibleEnd) {
    return 1
  }

  if (progress < leaveEnd) {
    return 1 - clamp01((progress - fullyVisibleEnd) / (leaveEnd - fullyVisibleEnd))
  }

  return 0
}

function createStoryState(ranges, progress) {
  const activeScene = getActiveScene(ranges, progress)
  const sceneStates = ranges.map((range, index) => {
    const localProgress = clamp01((progress - range.start) / range.span)
    const visibility = getSceneVisibility(ranges[index], index, ranges.length, progress)
    const focus = 0.18 + visibility * 0.82

    return {
      ...range,
      index,
      progress: localProgress,
      visibility,
      focus,
      isActive: index === activeScene,
    }
  })

  return {
    overallProgress: progress,
    activeScene,
    sceneStates,
  }
}

export function useScrollStory(scenes) {
  const ranges = useMemo(() => buildRanges(scenes), [scenes])
  const targetRef = useRef(0)
  const smoothRef = useRef(0)
  const frameRef = useRef(0)

  const [storyState, setStoryState] = useState(() => createStoryState(ranges, 0))

  useEffect(() => {
    const updateTarget = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      )
      targetRef.current = clamp01(window.scrollY / maxScroll)
    }

    const tick = () => {
      const delta = targetRef.current - smoothRef.current
      smoothRef.current += delta * 0.09

      if (Math.abs(delta) < 0.00015) {
        smoothRef.current = targetRef.current
      }

      const nextState = createStoryState(ranges, smoothRef.current)
      startTransition(() => {
        setStoryState((currentState) => {
          if (
            Math.abs(currentState.overallProgress - nextState.overallProgress) <
              0.0001 &&
            currentState.activeScene === nextState.activeScene
          ) {
            return currentState
          }

          return nextState
        })
      })

      frameRef.current = window.requestAnimationFrame(tick)
    }

    updateTarget()
    frameRef.current = window.requestAnimationFrame(tick)
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)

    return () => {
      window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
    }
  }, [ranges])

  return storyState
}
