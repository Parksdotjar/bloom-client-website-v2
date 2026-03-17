import { useCallback, useRef } from 'react'
import { Eye, RefreshCw, Settings2, SlidersHorizontal, Sparkles } from 'lucide-react'
import ClientWindow from '../components/ClientWindow'
import SceneContainer from '../components/SceneContainer'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { getSceneAssetStyle, stagger } from '../utils/animation'

export default function LauncherCustomization({ scene, state, markerRef }) {
  const rootRef = useRef(null)
  const leftPanelStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.14,
    enterEnd: 0.28,
    exitStart: 0.7,
    exitEnd: 0.93,
    fromY: 46,
    exitY: -30,
    fromScale: 0.94,
    exitScale: 0.978,
  })
  const centerPanelStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.18,
    enterEnd: 0.34,
    exitStart: 0.72,
    exitEnd: 0.94,
    fromY: 56,
    exitY: -40,
    fromScale: 0.94,
    exitScale: 0.972,
  })
  const rightPanelStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.22,
    enterEnd: 0.38,
    exitStart: 0.74,
    exitEnd: 0.95,
    fromY: 46,
    exitY: -28,
    fromScale: 0.94,
    exitScale: 0.978,
  })

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(
        select('[data-copy]'),
        {
          opacity: [0, 1],
          y: [20, 0],
          delay: stagger(90),
          duration: 560,
          ease: 'outExpo',
        },
        40,
      )
      .add(
        select('[data-panel]'),
        {
          opacity: [0, 1],
          y: [52, 0],
          x: (_, index) => (index === 0 ? -60 : index === 2 ? 60 : 0),
          scale: [0.94, 1],
          delay: stagger(110),
          duration: 980,
          ease: 'outExpo',
        },
        220,
      )
      .add(
        select('[data-chip]'),
        {
          opacity: [0, 1],
          y: [16, 0],
          delay: stagger(55),
          duration: 420,
          ease: 'outExpo',
        },
        640,
      )
      .add(
        select('[data-toggle-knob]'),
        {
          x: [0, 18],
          delay: stagger(80),
          duration: 420,
          ease: 'outExpo',
        },
        760,
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
      <div ref={rootRef} className="flex h-full flex-col justify-center gap-10 pt-16">
        <div className="max-w-xl space-y-5">
          <p
            data-copy
            className="font-display text-[0.68rem] uppercase tracking-[0.34em] text-white/28 opacity-0"
          >
            {scene.label}
          </p>
          <h2
            data-copy
            className="text-4xl leading-tight text-white opacity-0 sm:text-5xl lg:text-[3.85rem]"
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

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.08fr_0.88fr]">
          <div style={leftPanelStyle}>
            <ClientWindow compact activeIndex={1} className="opacity-0" data-panel>
              <div className="space-y-4">
                <div
                  data-chip
                  className="rounded-[22px] border border-white/10 bg-black/30 p-4 opacity-0"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[0.68rem] uppercase tracking-[0.28em] text-bloom-200/90">
                        Instances
                      </div>
                      <div className="mt-2 text-3xl font-semibold text-white">Your Library</div>
                      <p className="mt-2 text-sm text-white/40">
                        Select an instance to open full edit mode.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.66rem] uppercase tracking-[0.22em] text-white/48">
                        <RefreshCw className="mr-2 inline h-3 w-3" strokeWidth={1.7} />
                        Refresh
                      </div>
                      <div className="rounded-xl border border-bloom-300/20 bg-bloom-400/10 px-4 py-2 text-[0.66rem] uppercase tracking-[0.22em] text-bloom-100">
                        Create
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  data-chip
                  className="flex h-[14rem] items-center justify-center rounded-[22px] border border-white/10 bg-black/20 text-center opacity-0"
                >
                  <div>
                    <div className="text-3xl font-semibold text-white">No instances yet</div>
                    <p className="mt-2 text-sm text-white/36">Create one to start.</p>
                  </div>
                </div>
              </div>
            </ClientWindow>
          </div>

          <div style={centerPanelStyle}>
            <ClientWindow compact activeIndex={6} className="opacity-0" data-panel>
              <div className="space-y-4">
                <div
                  data-chip
                  className="rounded-[22px] border border-white/10 bg-black/30 p-4 opacity-0"
                >
                  <div className="text-[0.68rem] uppercase tracking-[0.28em] text-bloom-200/90">
                    Settings
                  </div>
                  <div className="mt-2 text-3xl font-semibold text-white">Launcher Control</div>
                  <p className="mt-2 text-sm text-white/40">
                    System, visuals, and runtime defaults.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['General', 'Appearance', 'Widgets'].map((tab, index) => (
                    <div
                      key={tab}
                      data-chip
                      className={`rounded-xl border px-3 py-2 text-[0.64rem] uppercase tracking-[0.22em] opacity-0 ${
                        index === 0
                          ? 'border-bloom-300/20 bg-bloom-400/10 text-bloom-100'
                          : 'border-white/10 bg-white/[0.03] text-white/46'
                      }`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                <div
                  data-chip
                  className="rounded-[22px] border border-white/10 bg-black/20 p-4 opacity-0"
                >
                  <div className="flex items-center justify-between text-sm text-white/54">
                    <span>Memory</span>
                    <Settings2 className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="relative h-full w-[44%] rounded-full bg-bloom-300/90">
                      <span
                        data-toggle-knob
                        className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-bloom-100 shadow-[0_0_18px_rgba(255,183,226,0.6)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Search', 'Ctrl+K'],
                    ['Create', 'Ctrl+N'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      data-chip
                      className="rounded-[20px] border border-white/10 bg-black/20 p-4 opacity-0"
                    >
                      <div className="text-sm text-white">{label}</div>
                      <div className="mt-3 rounded-xl border border-bloom-300/18 bg-bloom-400/8 px-3 py-2 text-center text-sm font-semibold text-white/84">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ClientWindow>
          </div>

          <div style={rightPanelStyle}>
            <ClientWindow compact activeIndex={4} className="opacity-0" data-panel>
              <div className="space-y-4">
                <div
                  data-chip
                  className="rounded-[22px] border border-white/10 bg-black/30 p-4 opacity-0"
                >
                  <div className="text-[0.68rem] uppercase tracking-[0.28em] text-bloom-200/90">
                    Widgets
                  </div>
                  <div className="mt-2 text-3xl font-semibold text-white">Widget Manager</div>
                  <p className="mt-2 text-sm text-white/40">
                    Choose a page and enable only what matters.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['Account', 'Instances', 'Mods', 'Importer'].map((item, index) => (
                    <div
                      key={item}
                      data-chip
                      className={`rounded-[18px] border px-3 py-3 opacity-0 ${
                        index === 0
                          ? 'border-bloom-300/20 bg-bloom-400/10 text-white'
                          : 'border-white/10 bg-black/20 text-white/56'
                      }`}
                    >
                      <div className="text-sm font-semibold">{item}</div>
                      <div className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-white/30">
                        /{item.toLowerCase()}
                      </div>
                    </div>
                  ))}
                </div>

                {[
                  ['Hero', 'Main account header and quick launch panel.'],
                  ['Metrics', 'Theme and launcher status cards.'],
                ].map(([label, note]) => (
                  <div
                    key={label}
                    data-chip
                    className="flex items-center justify-between rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 opacity-0"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{label}</div>
                      <div className="mt-1 text-xs text-white/36">{note}</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-white/46">
                      <Eye className="h-4 w-4" strokeWidth={1.7} />
                    </div>
                  </div>
                ))}

                <div
                  data-chip
                  className="rounded-[20px] border border-bloom-300/20 bg-bloom-400/8 px-4 py-3 text-sm text-bloom-100 opacity-0"
                >
                  <Sparkles className="mr-2 inline h-4 w-4" strokeWidth={1.7} />
                  Layout stays deliberate.
                </div>
              </div>
            </ClientWindow>
          </div>
        </div>
      </div>
    </SceneContainer>
  )
}
