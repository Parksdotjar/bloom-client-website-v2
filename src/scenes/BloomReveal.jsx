import { useCallback, useRef } from 'react'
import BloomLogo from '../components/BloomLogo'
import ClientScreenshot from '../components/ClientScreenshot'
import SceneContainer from '../components/SceneContainer'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { getSceneAssetStyle, stagger } from '../utils/animation'

export default function BloomReveal({ scene, state, markerRef }) {
  const rootRef = useRef(null)
  const frameStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.12,
    enterEnd: 0.3,
    exitStart: 0.72,
    exitEnd: 0.94,
    fromY: 54,
    exitY: -38,
    fromScale: 0.94,
    exitScale: 0.975,
  })

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(select('[data-halo]'), {
        opacity: [0, 1],
        scale: [0.76, 1.04],
        duration: 1200,
        ease: 'outExpo',
      })
      .add(
        select('[data-wordmark]'),
        {
          opacity: [0, 1],
          y: [18, 0],
          duration: 620,
          ease: 'outExpo',
        },
        160,
      )
      .add(
        select('[data-hero-line]'),
        {
          opacity: [0, 1],
          y: [36, 0],
          delay: stagger(110),
          duration: 840,
          ease: 'outExpo',
        },
        180,
      )
      .add(
        select('[data-outline]'),
        {
          opacity: [0, 0.8],
          scaleX: [0.3, 1],
          duration: 820,
          ease: 'outExpo',
        },
        340,
      )
      .add(
        select('[data-frame]'),
        {
          opacity: [0, 1],
          y: [54, 0],
          scale: [0.94, 1],
          duration: 1100,
          ease: 'outExpo',
        },
        280,
      )
      .add(
        select('[data-module]'),
        {
          opacity: [0, 1],
          y: [28, 0],
          scale: [0.96, 1],
          delay: stagger(100),
          duration: 700,
          ease: 'outExpo',
        },
        600,
      )
  }, [])

  useAnimeScene({
    markerRef,
    rootRef,
    duration: 3200,
    progress: state.progress,
    setup,
  })

  return (
    <SceneContainer scene={scene} state={state}>
      <div
        ref={rootRef}
        className="grid h-full items-center gap-12 pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20"
      >
        <div className="relative z-10 flex flex-col items-start justify-center gap-7">
          <div
            data-wordmark
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 opacity-0 backdrop-blur-xl"
          >
            <BloomLogo className="h-6 w-6" />
            <span className="font-display text-xs uppercase tracking-[0.3em] text-white/52">
              {scene.label}
            </span>
          </div>

          <div className="space-y-4">
            <h1
              data-hero-line
              className="max-w-[10ch] text-5xl leading-[0.98] text-white opacity-0 sm:text-6xl lg:text-[5.4rem]"
            >
              Bloom Client
            </h1>
            <p
              data-hero-line
              className="max-w-[18ch] text-2xl leading-tight text-white/78 opacity-0 sm:text-3xl lg:text-[2.55rem]"
            >
              {scene.headline}
            </p>
          </div>

          <p
            data-hero-line
            className="max-w-md text-base leading-relaxed text-white/54 opacity-0"
          >
            {scene.supporting}
          </p>
        </div>

        <div className="relative flex h-[62vh] min-h-[430px] items-center justify-center">
          <div
            data-halo
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-400/16 opacity-0 blur-[120px]"
          />
          <div
            data-outline
            className="absolute left-[6%] right-[6%] top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-white/16 to-transparent opacity-0"
          />

          <div className="w-full max-w-[920px]" style={frameStyle}>
            <ClientScreenshot
              src="/client-images/create%20instance.png"
              alt="Bloom Client create instance screen"
              className="aspect-[1.59/1] opacity-0"
              imageClassName="h-full w-full object-cover object-top"
              data-frame
            />
          </div>
        </div>
      </div>
    </SceneContainer>
  )
}
