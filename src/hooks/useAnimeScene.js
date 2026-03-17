import { useEffect, useLayoutEffect, useRef } from 'react'
import { createSceneTimeline } from '../utils/animation'

export function useAnimeScene({
  rootRef,
  duration,
  progress,
  setup,
}) {
  const timelineRef = useRef(null)
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useLayoutEffect(() => {
    const root = rootRef.current

    if (!root) {
      return undefined
    }

    const { timeline } = createSceneTimeline({ duration })

    const select = (selector) => Array.from(root.querySelectorAll(selector))
    setup({ timeline, root, select })
    timeline.pause()
    timeline.seek(timeline.duration * progressRef.current, true)
    timelineRef.current = timeline

    return () => {
      timelineRef.current = null
      timeline.revert()
    }
  }, [duration, rootRef, setup])

  useEffect(() => {
    if (!timelineRef.current) {
      return
    }

    timelineRef.current.seek(timelineRef.current.duration * progress, true)
  }, [progress])
}
