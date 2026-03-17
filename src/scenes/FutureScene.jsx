import { useCallback, useRef } from 'react'
import { Boxes, Cloud, Sparkles, Waypoints } from 'lucide-react'
import SceneContainer from '../components/SceneContainer'
import UIPanel from '../components/UIPanel'
import { useAnimeScene } from '../hooks/useAnimeScene'
import { stagger } from '../utils/animation'

const nodeIcons = [Boxes, Waypoints, Cloud, Sparkles]

export default function FutureScene({ scene, state, markerRef }) {
  const rootRef = useRef(null)

  const setup = useCallback(({ timeline, select }) => {
    timeline
      .add(
        select('[data-copy]'),
        {
          opacity: [0, 1],
          y: [22, 0],
          delay: stagger(100),
          duration: 560,
          ease: 'outExpo',
        },
        40,
      )
      .add(
        select('[data-roadmap]'),
        {
          opacity: [0, 1],
          y: [38, 0],
          scale: [0.97, 1],
          duration: 840,
          ease: 'outExpo',
        },
        220,
      )
      .add(
        select('[data-road-line]'),
        {
          opacity: [0, 1],
          scaleX: [0, 1],
          duration: 980,
          ease: 'outExpo',
        },
        360,
      )
      .add(
        select('[data-node]'),
        {
          opacity: [0, 1],
          scale: [0.2, 1],
          delay: stagger(150),
          duration: 420,
          ease: 'outBack(2)',
        },
        620,
      )
      .add(
        select('[data-node-copy]'),
        {
          opacity: [0, 1],
          y: [18, 0],
          delay: stagger(120),
          duration: 520,
          ease: 'outExpo',
        },
        760,
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
            className="text-4xl leading-tight text-white opacity-0 sm:text-5xl lg:text-[3.8rem]"
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

        <UIPanel className="opacity-0 p-8 lg:p-10" data-roadmap>
          <div className="relative h-[22rem] overflow-hidden rounded-[26px] border border-white/8 bg-black/20">
            <div
              data-road-line
              className="absolute left-[8%] right-[8%] top-1/2 h-px origin-left bg-gradient-to-r from-white/16 via-bloom-200/55 to-white/16 opacity-0"
            />

            {scene.nodes.map((node, index) => {
              const Icon = nodeIcons[index]
              const left = `${10 + index * 26}%`

              return (
                <div
                  key={node}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left }}
                >
                  <div
                    data-node
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bloom-300/20 bg-bloom-400/10 opacity-0 shadow-glow"
                  >
                    <Icon className="h-5 w-5 text-bloom-100" strokeWidth={1.6} />
                  </div>
                  <div
                    data-node-copy
                    className="mt-5 w-32 -translate-x-[20%] rounded-[22px] border border-white/8 bg-white/[0.03] p-4 opacity-0"
                  >
                    <p className="text-sm text-white">{node}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/34">
                      Phase {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </UIPanel>
      </div>
    </SceneContainer>
  )
}
