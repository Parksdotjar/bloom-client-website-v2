import { useCallback, useRef } from 'react'
import ClientScreenshot from './ClientScreenshot'
import SceneContainer from './SceneContainer'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { getSceneAssetStyle, stagger } from '../utils/animation'

export default function ScreenshotFeatureScene({ scene, state, markerRef }) {
  const rootRef = useRef(null)
  const screenshotStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.14,
    enterEnd: 0.3,
    exitStart: 0.72,
    exitEnd: 0.94,
    fromY: 54,
    exitY: -38,
    fromScale: 0.95,
    exitScale: 0.978,
  })

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(
        select('[data-copy]'),
        {
          opacity: [0, 1],
          y: [22, 0],
          delay: stagger(90),
          duration: 580,
          ease: 'outExpo',
        },
        40,
      )
      .add(
        select('[data-detail]'),
        {
          opacity: [0, 1],
          y: [16, 0],
          delay: stagger(90),
          duration: 460,
          ease: 'outExpo',
        },
        280,
      )
      .add(
        select('[data-shot]'),
        {
          opacity: [0, 1],
          y: [34, 0],
          scale: [0.96, 1],
          duration: 980,
          ease: 'outExpo',
        },
        180,
      )
  }, [])

  useAnimeScene({
    markerRef,
    rootRef,
    duration: 2800,
    progress: state.progress,
    setup,
  })

  return (
    <SceneContainer scene={scene} state={state}>
      <div
        ref={rootRef}
        className="grid h-full items-center gap-12 pt-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20"
      >
        <div className="max-w-xl space-y-5">
          <p
            data-copy
            className="font-display text-[0.68rem] uppercase tracking-[0.34em] text-white/28 opacity-0"
          >
            {scene.label}
          </p>
          <h2
            data-copy
            className="text-4xl leading-tight text-white opacity-0 sm:text-5xl lg:text-[4rem]"
          >
            {scene.headline}
          </h2>
          <p
            data-copy
            className="max-w-md text-base leading-relaxed text-white/50 opacity-0"
          >
            {scene.supporting}
          </p>

          {scene.details?.length ? (
            <div className="space-y-3 pt-2">
              {scene.details.map((detail) => (
                <div
                  key={detail}
                  data-detail
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/62 opacity-0"
                >
                  {detail}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <div style={screenshotStyle}>
            <ClientScreenshot
              src={scene.imageSrc}
              alt={scene.imageAlt || scene.headline}
              className="opacity-0"
              data-shot
            />
          </div>
        </div>
      </div>
    </SceneContainer>
  )
}
