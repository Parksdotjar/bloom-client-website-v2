import { useCallback, useRef } from 'react'
import { ArrowRight, Download, MessageSquare } from 'lucide-react'
import BloomLogo from '../components/BloomLogo'
import SceneContainer from '../components/SceneContainer'
import UIButton from '../components/UIButton'
import UIPanel from '../components/UIPanel'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { stagger } from '../utils/animation'

export default function DownloadScene({ scene, state, markerRef }) {
  const rootRef = useRef(null)

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(select('[data-download-glow]'), {
        opacity: [0, 1],
        scale: [0.72, 1.04],
        duration: 1200,
        ease: 'outExpo',
      })
      .add(
        select('[data-download-panel]'),
        {
          opacity: [0, 1],
          y: [42, 0],
          scale: [0.95, 1],
          duration: 920,
          ease: 'outExpo',
        },
        140,
      )
      .add(
        select('[data-download-copy]'),
        {
          opacity: [0, 1],
          y: [18, 0],
          delay: stagger(90),
          duration: 520,
          ease: 'outExpo',
        },
        420,
      )
      .add(
        select('[data-download-badge]'),
        {
          opacity: [0, 1],
          y: [14, 0],
          delay: stagger(70),
          duration: 420,
          ease: 'outExpo',
        },
        620,
      )
      .add(
        select('[data-download-button]'),
        {
          opacity: [0, 1],
          y: [16, 0],
          delay: stagger(80),
          duration: 460,
          ease: 'outExpo',
        },
        760,
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
    <SceneContainer scene={scene} state={state} interactive={state.focus > 0.3}>
      <div ref={rootRef} className="flex h-full items-center justify-center">
        <div className="relative w-full max-w-[760px]">
          <div
            data-download-glow
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-400/16 opacity-0 blur-[140px]"
          />

          <UIPanel
            accent
            className="opacity-0 px-8 py-10 text-center lg:px-12"
            data-download-panel
          >
            <div
              data-download-copy
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-bloom-300/18 bg-bloom-400/10 opacity-0"
            >
              <BloomLogo className="h-12 w-12" />
            </div>

            <p
              data-download-copy
              className="mt-6 font-display text-[0.68rem] uppercase tracking-[0.34em] text-white/30 opacity-0"
            >
              {scene.label}
            </p>
            <h2
              data-download-copy
              className="mt-4 text-4xl text-white opacity-0 sm:text-5xl lg:text-[4rem]"
            >
              {scene.headline}
            </h2>
            <p
              data-download-copy
              className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/52 opacity-0"
            >
              {scene.supporting}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {scene.badges.map((badge) => (
                <span
                  key={badge}
                  data-download-badge
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/42 opacity-0"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div data-download-button className="opacity-0">
                <UIButton icon={Download}>Download for Windows</UIButton>
              </div>
              <div data-download-button className="opacity-0">
                <UIButton icon={MessageSquare} variant="secondary">
                  Discord
                </UIButton>
              </div>
              <div data-download-button className="opacity-0">
                <UIButton icon={ArrowRight} variant="secondary">
                  Learn more
                </UIButton>
              </div>
            </div>
          </UIPanel>
        </div>
      </div>
    </SceneContainer>
  )
}
