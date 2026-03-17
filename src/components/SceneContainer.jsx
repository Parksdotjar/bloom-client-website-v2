import { cn } from '../utils/classNames'

export default function SceneContainer({
  scene,
  state,
  interactive = false,
  className = '',
  children,
}) {
  const showSceneMeta = scene.id !== 'boot'
  const opacity = state.visibility
  const depth = 1 - state.visibility
  const translateY = depth * 18
  const scale = 0.985 + state.visibility * 0.015
  const blur = depth * 4

  return (
    <section
      className="absolute inset-0 flex items-center justify-center px-5 py-6 md:px-8 lg:px-12"
      aria-hidden={!state.isActive && state.visibility < 0.08}
      style={{
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        zIndex: (state.isActive ? 90 : 20) + Math.round(state.visibility * 20),
        pointerEvents: interactive && state.visibility > 0.72 ? 'auto' : 'none',
      }}
    >
      <div
        className={cn(
          'relative mx-auto h-full w-full max-w-[1440px]',
          className,
        )}
      >
        {showSceneMeta ? (
          <div className="pointer-events-none absolute left-0 top-0 hidden items-center gap-4 lg:flex">
            <span className="font-display text-[0.62rem] uppercase tracking-scene text-white/26">
              {scene.order}
            </span>
            <span className="h-px w-14 bg-white/10" />
            <span className="text-[0.64rem] uppercase tracking-[0.34em] text-white/20">
              {scene.title}
            </span>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}
