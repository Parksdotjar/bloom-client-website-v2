import { createRef, useMemo } from 'react'
import { useScrollStory } from '../hooks/useScrollStory'
import { clamp01, mix } from '../utils/animation'
import SceneProgress from './SceneProgress'

function StartOverlay({ progress }) {
  const veilOpacity = 1 - clamp01(progress / 0.08)
  const cueOpacity = 1 - clamp01(progress / 0.12)
  const cueLift = mix(0, -18, clamp01(progress / 0.08))

  return (
    <div
      className="pointer-events-none absolute inset-0 z-40"
      aria-hidden={progress > 0.12}
    >
      <div className="absolute inset-0 bg-black" style={{ opacity: veilOpacity }} />

      <div
        className="absolute left-1/2 top-1/2"
        style={{
          opacity: cueOpacity,
          transform: `translate3d(-50%, calc(-50% + ${cueLift}px), 0)`,
        }}
      >
        <p className="intro-scroll-float font-display text-[0.68rem] uppercase tracking-[0.42em] text-white/46">
          Scroll
        </p>
      </div>
    </div>
  )
}

function EndOverlay({ progress }) {
  const opacity = clamp01((progress - 0.93) / 0.07)

  return (
    <div
      className="pointer-events-none absolute inset-0 z-40 bg-black"
      style={{ opacity }}
      aria-hidden={opacity < 0.02}
    />
  )
}

function StageBackdrop({ overallProgress }) {
  const backdropDim =
    clamp01(1 - overallProgress / 0.1) * 0.95 +
    clamp01((overallProgress - 0.9) / 0.1) * 0.95

  return (
    <>
      <div className="absolute inset-0 story-grid opacity-50" />
      <div className="absolute inset-0 story-noise opacity-60" />
      <div className="absolute inset-0 story-scanlines opacity-25" />
      <div className="absolute inset-0 vignette" />

      <div
        className="absolute left-1/2 top-[16%] h-[34rem] w-[34rem] rounded-full bg-bloom-400/10 blur-[140px]"
        style={{
          transform: `translate3d(${mix(-160, 120, overallProgress)}px, -50%, 0)`,
        }}
      />
      <div
        className="absolute right-[8%] top-[52%] h-[28rem] w-[28rem] rounded-full bg-bloom-500/10 blur-[140px]"
        style={{
          transform: `translate3d(${mix(80, -100, overallProgress)}px, ${mix(-80, 40, overallProgress)}px, 0)`,
        }}
      />
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: backdropDim }}
      />
    </>
  )
}

export default function ScrollStage({ scenes }) {
  const markerRefs = useMemo(() => scenes.map(() => createRef()), [scenes])
  const { overallProgress, activeScene, sceneStates } = useScrollStory(scenes)

  return (
    <main className="relative">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <StageBackdrop overallProgress={overallProgress} />
      </div>

      <div className="fixed inset-0 z-20 overflow-hidden">
        {scenes.map((scene, index) => {
          const SceneComponent = scene.Component
          const state = {
            ...sceneStates[index],
            navLabel: scene.navLabel,
          }

          return (
            <SceneComponent
              key={scene.id}
              scene={scene}
              state={state}
              markerRef={markerRefs[index]}
            />
          )
        })}

        <SceneProgress
          activeScene={activeScene}
          overallProgress={overallProgress}
          scenes={sceneStates.map((sceneState, index) => ({
            ...sceneState,
            id: scenes[index].id,
            navLabel: scenes[index].navLabel,
          }))}
        />
        <StartOverlay progress={overallProgress} />
        <EndOverlay progress={overallProgress} />
      </div>

      <div className="relative z-10">
        {scenes.map((scene, index) => (
          <section
            key={scene.id}
            ref={markerRefs[index]}
            style={{ height: `${scene.length * 100}svh` }}
            className="relative"
            aria-label={scene.title}
          >
            <span className="sr-only">{scene.title}</span>
          </section>
        ))}
      </div>
    </main>
  )
}
