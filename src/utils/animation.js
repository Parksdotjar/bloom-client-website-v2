import { createTimeline, onScroll, stagger } from 'animejs'
import { settleEase } from './easing'

const defaultObserverOptions = {
  sync: 0.2,
  enter: 'start end',
  leave: 'end start',
  repeat: true,
}

export function createSceneObserver(marker, options = {}) {
  return onScroll({
    target: marker,
    ...defaultObserverOptions,
    ...options,
  })
}

export function createSceneTimeline({
  duration = 3000,
} = {}) {
  const timeline = createTimeline({
    autoplay: false,
    duration,
    defaults: {
      duration: 560,
      ease: settleEase,
    },
  })

  return { timeline }
}

export function clamp01(value) {
  return Math.max(0, Math.min(1, value))
}

export function mix(from, to, amount) {
  return from + (to - from) * amount
}

export function getSceneAssetStyle(
  progress,
  {
    enterStart = 0.12,
    enterEnd = 0.28,
    exitStart = 0.72,
    exitEnd = 0.94,
    fromX = 0,
    fromY = 48,
    exitX = 0,
    exitY = -32,
    fromScale = 0.95,
    exitScale = 0.985,
  } = {},
) {
  const enter = clamp01((progress - enterStart) / Math.max(enterEnd - enterStart, 0.001))
  const exit = clamp01((progress - exitStart) / Math.max(exitEnd - exitStart, 0.001))
  const holdOpacity = 1 - exit

  return {
    opacity: enter * holdOpacity,
    transform: `translate3d(${mix(fromX, 0, enter) + mix(0, exitX, exit)}px, ${
      mix(fromY, 0, enter) + mix(0, exitY, exit)
    }px, 0) scale(${mix(fromScale, 1, enter) + (exitScale - 1) * exit})`,
  }
}

export { stagger }
