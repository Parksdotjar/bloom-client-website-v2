import { useCallback, useRef } from 'react'
import { BadgeCheck, Palette, Sparkles } from 'lucide-react'
import BloomLogo from '../components/BloomLogo'
import SceneContainer from '../components/SceneContainer'
import UIPanel from '../components/UIPanel'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { getSceneAssetStyle, stagger } from '../utils/animation'

const themeGradients = [
  'from-[#ffe3f6] via-[#f59dcc] to-[#d14992]',
  'from-[#f4e7ff] via-[#9b86b9] to-[#1d1a25]',
  'from-[#faf6ff] via-[#c6c1cf] to-[#6f677d]',
]

export default function IdentityScene({ scene, state, markerRef }) {
  const rootRef = useRef(null)
  const cardStyle = getSceneAssetStyle(state.progress, {
    enterStart: 0.14,
    enterEnd: 0.3,
    exitStart: 0.72,
    exitEnd: 0.94,
    fromY: 54,
    exitY: -36,
    fromScale: 0.94,
    exitScale: 0.976,
  })

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(select('[data-copy]'), {
        opacity: [0, 1],
        y: [20, 0],
        delay: stagger(90),
        duration: 560,
        ease: 'outExpo',
      })
      .add(
        select('[data-identity-glow]'),
        {
          opacity: [0, 1],
          scale: [0.72, 1.04],
          duration: 1200,
          ease: 'outExpo',
        },
        120,
      )
      .add(
        select('[data-identity-card]'),
        {
          opacity: [0, 1],
          y: [48, 0],
          scale: [0.94, 1],
          duration: 980,
          ease: 'outExpo',
        },
        260,
      )
      .add(
        select('[data-identity-petal]'),
        {
          opacity: [0, 1],
          scale: [0.2, 1],
          y: [24, 0],
          delay: stagger(80),
          duration: 520,
          ease: 'outExpo',
        },
        360,
      )
      .add(
        select('[data-swatch]'),
        {
          opacity: [0, 1],
          y: [20, 0],
          delay: stagger(90),
          duration: 520,
          ease: 'outExpo',
        },
        640,
      )
      .add(
        select('[data-badge]'),
        {
          opacity: [0, 1],
          y: [18, 0],
          delay: stagger(80),
          duration: 480,
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
      <div
        ref={rootRef}
        className="grid h-full items-center gap-12 pt-16 lg:grid-cols-[0.82fr_1.18fr]"
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

        <div className="relative flex h-[64vh] min-h-[450px] items-center justify-center">
          <div
            data-identity-glow
            className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom-400/18 opacity-0 blur-[140px]"
          />

          {[
            'left-[20%] top-[16%]',
            'right-[18%] top-[18%]',
            'left-[18%] bottom-[20%]',
            'right-[22%] bottom-[16%]',
            'left-[50%] top-[8%] -translate-x-1/2',
            'left-[54%] bottom-[8%] -translate-x-1/2',
          ].map((position, index) => (
            <span
              key={position}
              data-identity-petal
              className={`absolute h-4 w-4 rounded-full bg-bloom-200/80 opacity-0 shadow-[0_0_26px_rgba(255,190,231,0.72)] ${position}`}
              style={{ filter: index % 2 === 0 ? 'blur(0px)' : 'blur(1px)' }}
            />
          ))}

          <div className="w-full max-w-[560px]" style={cardStyle}>
            <UIPanel
              accent
              className="w-full opacity-0"
              data-identity-card
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-[26px] border border-bloom-300/20 bg-bloom-400/10 p-3">
                    <BloomLogo className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/30">
                      Account
                    </p>
                    <p className="mt-1 text-xl text-white">Parks / Bloom profile</p>
                  </div>
                </div>
                <div className="rounded-full border border-bloom-300/20 bg-bloom-400/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-bloom-100">
                  Active
                </div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4">
                  <div className="rounded-[28px] border border-white/8 bg-black/20 p-5">
                    <div className="flex items-center gap-3 text-white/66">
                      <Palette className="h-4 w-4 text-bloom-200" strokeWidth={1.6} />
                      Theme stacks
                    </div>
                    <div className="mt-5 space-y-3">
                      {scene.themes.map((theme, index) => (
                        <div
                          key={theme}
                          data-swatch
                          className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3 opacity-0"
                        >
                          <span
                            className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${themeGradients[index]}`}
                          />
                          <div>
                            <p className="text-white">{theme}</p>
                            <p className="text-sm text-white/42">Stored theme preset</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Sparkles,
                      title: 'Cosmetics',
                      note: 'Subtle accents. Nothing loud.',
                    },
                    {
                      icon: BadgeCheck,
                      title: 'Identity',
                      note: 'Trusted account, persistent preferences.',
                    },
                  ].map(({ icon: Icon, title, note }) => {
                    const IconComponent = Icon

                    return (
                      <div
                        key={title}
                        data-badge
                        className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5 opacity-0"
                      >
                        <div className="flex items-center gap-3 text-white">
                          <IconComponent
                            className="h-4 w-4 text-bloom-200"
                            strokeWidth={1.6}
                          />
                          <span>{title}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-white/48">{note}</p>
                      </div>
                    )
                  })}

                  <div
                    data-badge
                    className="rounded-[26px] border border-bloom-300/18 bg-bloom-400/10 p-5 opacity-0"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/30">
                      Signature
                    </p>
                    <p className="mt-3 text-lg text-white">Premium, without spectacle.</p>
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
