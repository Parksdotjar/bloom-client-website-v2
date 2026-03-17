import { useCallback, useRef } from 'react'
import BloomLogo from '../components/BloomLogo'
import SceneContainer from '../components/SceneContainer'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { clamp01, stagger } from '../utils/animation'

const BOOT_REVEAL_DELAY = 0.12

export default function BootSequence({ scene, state, markerRef }) {
  const rootRef = useRef(null)
  const delayedProgress = clamp01(
    (state.progress - BOOT_REVEAL_DELAY) / (1 - BOOT_REVEAL_DELAY),
  )
  const revealOpacity = clamp01((state.progress - 0.08) / 0.08)
  const revealTranslate = (1 - revealOpacity) * 16

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(select('[data-aura]'), {
        opacity: [0, 1],
        scale: [0.65, 1.05],
        duration: 1200,
        ease: 'outExpo',
      })
      .add(
        select('[data-ring]'),
        {
          opacity: [0, 1],
          scale: [0.82, 1],
          delay: stagger(120),
          duration: 900,
          ease: 'outExpo',
        },
        0,
      )
      .add(
        select('[data-petal]'),
        {
          opacity: [0, 0.96],
          scale: [0.42, 1],
          rotate: [-18, 0],
          delay: stagger(80),
          duration: 820,
          ease: 'outExpo',
        },
        140,
      )
      .add(
        select('[data-core]'),
        {
          opacity: [0, 1],
          scale: [0.35, 1],
          duration: 720,
          ease: 'outBack(1.8)',
        },
        260,
      )
      .add(
        select('[data-segment]'),
        {
          opacity: [0, 1],
          scaleX: [0, 1],
          delay: stagger(60),
          duration: 320,
          ease: 'outExpo',
        },
        500,
      )
      .add(
        select('[data-copy-line]'),
        {
          opacity: [0, 1],
          y: [16, 0],
          delay: stagger(100),
          duration: 520,
          ease: 'outExpo',
        },
        620,
      )
      .add(
        select('[data-sweep]'),
        {
          x: ['-60%', '60%'],
          opacity: [0, 0.75, 0],
          duration: 980,
          ease: 'inOutSine',
        },
        680,
      )
      .add(
        select('[data-particle]'),
        {
          opacity: [0, 1],
          scale: [0.4, 1],
          y: [16, 0],
          delay: stagger(90),
          duration: 480,
          ease: 'outExpo',
        },
        740,
      )
  }, [])

  useAnimeScene({
    markerRef,
    rootRef,
    duration: 2800,
    progress: delayedProgress,
    setup,
  })

  return (
    <SceneContainer scene={scene} state={state}>
      <div
        ref={rootRef}
        className="flex h-full items-center justify-center"
        style={{
          opacity: revealOpacity,
          transform: `translate3d(0, ${revealTranslate}px, 0)`,
        }}
      >
        <div className="relative flex w-full max-w-[760px] flex-col items-center justify-center gap-7 text-center">
          <div
            data-sweep
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[26rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-bloom-200/80 to-transparent opacity-0 blur-sm"
          />

          <span
            data-particle
            className="absolute left-[18%] top-[34%] h-2 w-2 rounded-full bg-bloom-200/70 opacity-0 shadow-[0_0_18px_rgba(255,185,226,0.7)]"
          />
          <span
            data-particle
            className="absolute right-[19%] top-[38%] h-1.5 w-1.5 rounded-full bg-white/70 opacity-0"
          />
          <span
            data-particle
            className="absolute bottom-[28%] left-[32%] h-1.5 w-1.5 rounded-full bg-white/55 opacity-0"
          />

          <div className="relative flex h-56 w-56 items-center justify-center">
            <div
              data-ring
              className="absolute inset-0 rounded-full border border-white/8 opacity-0"
            />
            <div
              data-ring
              className="absolute inset-5 rounded-full border border-bloom-200/12 opacity-0"
            />
            <div
              data-ring
              className="absolute inset-10 rounded-full border border-white/10 opacity-0"
            />
            <div
              data-ring
              className="absolute inset-[4.5rem] rounded-full border border-white/10 opacity-0"
            />
            <BloomLogo className="h-36 w-36" />
          </div>

          <div className="flex items-center gap-2.5">
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                key={item}
                data-segment
                className="h-px w-10 origin-left rounded-full bg-gradient-to-r from-white/18 to-bloom-200/80 opacity-0"
              />
            ))}
          </div>

          <div className="space-y-2">
            <p
              data-copy-line
              className="font-display text-sm uppercase tracking-[0.36em] text-white/34 opacity-0"
            >
              Boot Sequence
            </p>
            <h1
              data-copy-line
              className="text-4xl text-white opacity-0 sm:text-5xl lg:text-[4rem]"
            >
              {scene.headline}
            </h1>
            <p
              data-copy-line
              className="mx-auto max-w-md text-sm text-white/48 opacity-0 sm:text-base"
            >
              {scene.supporting}
            </p>
          </div>
        </div>
      </div>
    </SceneContainer>
  )
}
