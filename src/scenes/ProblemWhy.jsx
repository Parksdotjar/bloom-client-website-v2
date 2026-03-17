import { useCallback, useRef } from 'react'
import SceneContainer from '../components/SceneContainer'
import UIPanel from '../components/UIPanel'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { getSceneAssetStyle, stagger } from '../utils/animation'

const chaosTokens = [
  'Alerts',
  'Widgets',
  'Tabs',
  'Noise',
  'Stacks',
  'Badges',
  'Overflow',
  'Shortcuts',
]

export default function ProblemWhy({ scene, state, markerRef }) {
  const rootRef = useRef(null)
  const frameStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.14,
    enterEnd: 0.32,
    exitStart: 0.68,
    exitEnd: 0.92,
    fromY: 52,
    exitY: -36,
    fromScale: 0.95,
    exitScale: 0.978,
  })

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(
        select('[data-problem-frame]'),
        {
          opacity: [0, 1],
          y: [34, 0],
          scale: [0.97, 1],
          duration: 760,
          ease: 'outExpo',
        },
        180,
      )
      .add(
        select('[data-statement]'),
        {
          opacity: [0.18, 1],
          y: [18, 0],
          delay: stagger(140),
          duration: 620,
          ease: 'outExpo',
        },
        60,
      )
      .add(
        select('[data-support]'),
        {
          opacity: [0, 1],
          y: [18, 0],
          duration: 560,
          ease: 'outExpo',
        },
        260,
      )
      .add(
        select('[data-transform-line]'),
        {
          opacity: [0, 1],
          scaleY: [0, 1],
          duration: 820,
          ease: 'outExpo',
        },
        260,
      )
      .add(
        select('[data-chaos]'),
        {
          opacity: [0.78, 0.08],
          x: (_, index) => (index % 2 === 0 ? -64 : 52),
          y: (_, index) => (index % 3 === 0 ? 44 : -32),
          rotate: (_, index) => (index % 2 === 0 ? -10 : 12),
          scale: [1, 0.92],
          delay: stagger(34),
          duration: 900,
          ease: 'outExpo',
        },
        360,
      )
      .add(
        select('[data-clean]'),
        {
          opacity: [0, 1],
          y: [18, 0],
          scale: [0.96, 1],
          duration: 760,
          ease: 'outExpo',
        },
        420,
      )
      .add(
        select('[data-accent-bar]'),
        {
          opacity: [0, 1],
          scaleX: [0.14, 1],
          duration: 680,
          ease: 'outExpo',
        },
        660,
      )
  }, [])

  useAnimeScene({
    markerRef,
    rootRef,
    duration: 3000,
    progress: state.progress,
    setup,
  })

  return (
    <SceneContainer scene={scene} state={state}>
      <div
        ref={rootRef}
        className="grid h-full items-center gap-12 pt-16 lg:grid-cols-[0.78fr_1.22fr]"
      >
        <div className="max-w-xl space-y-6">
          <p className="font-display text-[0.68rem] uppercase tracking-[0.34em] text-white/28">
            {scene.label}
          </p>
          <div className="space-y-4">
            {scene.statements.map((statement, index) => (
              <p
                key={statement}
                data-statement
                className={`text-3xl leading-tight opacity-20 sm:text-4xl lg:text-[3.4rem] ${
                  index === scene.statements.length - 1 ? 'text-white' : 'text-white/70'
                }`}
              >
                {statement}
              </p>
            ))}
          </div>
          <p
            data-support
            className="max-w-sm text-base leading-relaxed text-white/50 opacity-0"
          >
            {scene.supporting}
          </p>
        </div>

        <div className="relative h-[62vh] min-h-[430px]">
          <div className="absolute inset-0" style={frameStyle}>
            <UIPanel
              className="absolute inset-0 overflow-hidden p-8 opacity-0 lg:p-10"
              data-problem-frame
            >
              <div
                data-transform-line
                className="absolute left-1/2 top-[14%] h-[72%] w-px origin-top bg-gradient-to-b from-transparent via-white/18 to-transparent opacity-0"
              />

              <div className="grid h-full grid-cols-[1.04fr_0.96fr] gap-8">
                <div className="flex flex-col justify-center">
                  <div className="rounded-[28px] border border-white/8 bg-black/20 p-6">
                    <div className="text-[0.68rem] uppercase tracking-[0.28em] text-white/28">
                      Before
                    </div>
                    <div className="mt-5 rounded-[24px] border border-white/8 bg-white/[0.02] px-5 py-6">
                      <div className="flex flex-wrap gap-3">
                        {chaosTokens.map((token) => (
                          <span
                            key={token}
                            data-chaos
                            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/46"
                          >
                            {token}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="h-3 rounded-full bg-white/8" />
                        <div className="h-3 w-[84%] rounded-full bg-white/8" />
                        <div className="h-3 w-[66%] rounded-full bg-white/8" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-start gap-3 pt-6">
                  <div
                    data-clean
                    className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 opacity-0"
                  >
                    <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.28em] text-white/30">
                      <span>Structure</span>
                      <span>01</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="h-3 rounded-full bg-white/10" />
                      <div
                        data-accent-bar
                        className="h-3 origin-left rounded-full bg-gradient-to-r from-bloom-300/80 to-bloom-400/30 opacity-0"
                      />
                      <div className="h-3 rounded-full bg-white/10" />
                    </div>
                  </div>

                  <div
                    data-clean
                    className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 opacity-0"
                  >
                    <div className="grid gap-3">
                      {['Intentional layout', 'Fewer surfaces', 'Clear priority'].map(
                        (item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/62"
                          >
                            {item}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div
                    data-clean
                    className="rounded-[22px] border border-bloom-300/18 bg-bloom-400/8 p-4 opacity-0"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/30">
                      Bloom
                    </p>
                    <p className="mt-2 text-base text-white">Clean by default.</p>
                  </div>
                </div>
              </div>
            </UIPanel>
          </div>
        </div>
      </div>
    </SceneContainer>
  )
}
