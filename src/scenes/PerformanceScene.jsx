import { useCallback, useRef } from 'react'
import SceneContainer from '../components/SceneContainer'
import UIPanel from '../components/UIPanel'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { getSceneAssetStyle, stagger } from '../utils/animation'

export default function PerformanceScene({ scene, state, markerRef }) {
  const rootRef = useRef(null)
  const panelStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.14,
    enterEnd: 0.3,
    exitStart: 0.72,
    exitEnd: 0.94,
    fromY: 52,
    exitY: -36,
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
        select('[data-performance-panel]'),
        {
          opacity: [0, 1],
          y: [34, 0],
          scale: [0.96, 1],
          duration: 900,
          ease: 'outExpo',
        },
        180,
      )
      .add(
        select('[data-bar-row]'),
        {
          opacity: [0, 1],
          y: [16, 0],
          delay: stagger(90),
          duration: 420,
          ease: 'outExpo',
        },
        360,
      )
      .add(
        select('[data-bar-fill]'),
        {
          scaleX: [0, 1],
          delay: stagger(90),
          duration: 760,
          ease: 'outExpo',
        },
        460,
      )
      .add(
        select('[data-bar-value]'),
        {
          opacity: [0, 1],
          y: [10, 0],
          delay: stagger(90),
          duration: 360,
          ease: 'outExpo',
        },
        640,
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
        className="grid h-full items-center gap-12 pt-16 lg:grid-cols-[0.74fr_1.26fr] lg:gap-20"
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
        </div>

        <div style={panelStyle}>
          <UIPanel accent className="opacity-0 p-7 lg:p-8" data-performance-panel>
            <div className="flex items-center justify-between border-b border-white/8 pb-4">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/30">
                FPS comparison
              </p>
              <p className="rounded-full border border-bloom-300/18 bg-bloom-400/8 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-bloom-100">
                Bloom leads
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {scene.bars.map((item) => (
                <div
                  key={item.name}
                  data-bar-row
                  className="rounded-[24px] border border-white/10 bg-black/22 p-4 opacity-0"
                >
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/28">
                        Measured average
                      </p>
                    </div>
                    <p
                      data-bar-value
                      className={`text-xl font-semibold opacity-0 ${
                        item.name === 'Bloom Client' ? 'text-bloom-100' : 'text-white/76'
                      }`}
                    >
                      {item.fps} fps
                    </p>
                  </div>

                  <div className="h-3 rounded-full bg-white/8">
                    <div
                      data-bar-fill
                      className={`h-full origin-left rounded-full ${
                        item.name === 'Bloom Client'
                          ? 'bg-gradient-to-r from-bloom-200 to-bloom-400 shadow-[0_0_24px_rgba(242,108,182,0.32)]'
                          : 'bg-gradient-to-r from-white/34 to-white/12'
                      }`}
                      style={{ width: `${(item.fps / scene.maxFps) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </UIPanel>
        </div>
      </div>
    </SceneContainer>
  )
}
