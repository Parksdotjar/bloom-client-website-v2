import { useCallback, useRef } from 'react'
import BloomLogo from '../components/BloomLogo'
import SceneContainer from '../components/SceneContainer'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { stagger } from '../utils/animation'

export default function AmbientOutro({ scene, state, markerRef }) {
  const rootRef = useRef(null)

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(select('[data-rest-glow]'), {
        opacity: [0, 1],
        scale: [0.72, 1],
        duration: 1200,
        ease: 'outExpo',
      })
      .add(
        select('[data-rest-ring]'),
        {
          opacity: [0, 1],
          scale: [0.84, 1],
          duration: 920,
          ease: 'outExpo',
        },
        180,
      )
      .add(
        select('[data-rest-particle]'),
        {
          opacity: [0, 1],
          scale: [0, 1],
          delay: stagger(90),
          duration: 400,
          ease: 'outBack(2)',
        },
        320,
      )
      .add(
        select('[data-rest-logo]'),
        {
          opacity: [0, 1],
          scale: [0.84, 1],
          duration: 720,
          ease: 'outExpo',
        },
        420,
      )
      .add(
        select('[data-rest-copy]'),
        {
          opacity: [0, 1],
          y: [18, 0],
          delay: stagger(90),
          duration: 520,
          ease: 'outExpo',
        },
        620,
      )
  }, [])

  useAnimeScene({
    markerRef,
    rootRef,
    duration: 2600,
    progress: state.progress,
    setup,
  })

  return (
    <SceneContainer scene={scene} state={state}>
      <div ref={rootRef} className="flex h-full items-center justify-center">
        <div className="relative flex w-full max-w-[760px] flex-col items-center justify-center gap-6 text-center">
          <div
            data-rest-glow
            className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-400/16 opacity-0 blur-[140px]"
          />
          <div
            data-rest-ring
            className="absolute h-72 w-72 rounded-full border border-white/10 opacity-0"
          />

          {[
            'left-[24%] top-[24%]',
            'right-[28%] top-[18%]',
            'left-[18%] bottom-[28%]',
            'right-[22%] bottom-[22%]',
            'left-[50%] top-[14%] -translate-x-1/2',
            'left-[58%] bottom-[14%] -translate-x-1/2',
          ].map((position, index) => (
            <span
              key={position}
              data-rest-particle
              className={`absolute h-2.5 w-2.5 rounded-full bg-white/70 opacity-0 ${
                index % 2 === 0 ? 'animate-drift' : 'animate-pulse-glow'
              } ${position}`}
            />
          ))}

          <div data-rest-logo className="opacity-0">
            <BloomLogo className="h-24 w-24" monochrome />
          </div>

          <p
            data-rest-copy
            className="font-display text-[0.68rem] uppercase tracking-[0.34em] text-white/28 opacity-0"
          >
            Ambient Outro
          </p>
          <h2
            data-rest-copy
            className="text-3xl text-white opacity-0 sm:text-4xl lg:text-[3.2rem]"
          >
            {scene.headline}
          </h2>
          <p
            data-rest-copy
            className="max-w-md text-base leading-relaxed text-white/48 opacity-0"
          >
            {scene.supporting}
          </p>
        </div>
      </div>
    </SceneContainer>
  )
}
