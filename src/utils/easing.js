import { cubicBezier } from 'animejs'

export const revealEase = cubicBezier(0.16, 1, 0.3, 1)
export const settleEase = cubicBezier(0.22, 1, 0.36, 1)
export const glassEase = cubicBezier(0.4, 0, 0.2, 1)
export const driftEase = 'inOutSine'
