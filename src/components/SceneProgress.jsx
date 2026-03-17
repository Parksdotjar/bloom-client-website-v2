function clamp01(value) {
  return Math.max(0, Math.min(1, value))
}

function buildTicks(sceneCount, minorTicksPerGap = 5) {
  if (sceneCount <= 1) {
    return [{ progress: 0, major: true, key: 'tick-0' }]
  }

  const gap = minorTicksPerGap + 1
  const totalSteps = (sceneCount - 1) * gap
  const ticks = []

  for (let index = 0; index <= totalSteps; index += 1) {
    ticks.push({
      key: `tick-${index}`,
      progress: index / totalSteps,
      major: index % gap === 0,
    })
  }

  return ticks
}

export default function SceneProgress({ scenes, activeScene, overallProgress }) {
  const ticks = buildTicks(scenes.length, 5)
  const majorGap = scenes.length > 1 ? 1 / (scenes.length - 1) : 1

  return (
    <div className="pointer-events-none absolute left-1/2 top-5 hidden -translate-x-1/2 lg:block">
      <div className="rounded-[18px] border border-white/8 bg-black/30 px-5 py-4 backdrop-blur-xl">
        <div className="relative flex items-center gap-6">
          <div className="flex items-center gap-3">
            <p className="font-display text-[0.62rem] uppercase tracking-scene text-white/52">
              {String(activeScene + 1).padStart(2, '0')}
            </p>
            <span className="h-5 w-px bg-white/12" />
          </div>

          <div
            className="flex items-center gap-[5px]"
            style={{
              maskImage:
                'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.75) 10%, black 18%, black 82%, rgba(0,0,0,0.75) 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.75) 10%, black 18%, black 82%, rgba(0,0,0,0.75) 90%, transparent 100%)',
            }}
          >
            {ticks.map((tick) => {
              const distance = Math.abs(overallProgress - tick.progress)
              const radius = tick.major ? majorGap * 0.9 : majorGap * 0.38
              const intensity = clamp01(1 - distance / radius)
              const activeSceneTick =
                tick.major &&
                Math.round(tick.progress * Math.max(scenes.length - 1, 1)) === activeScene

              return (
                <span
                  key={tick.key}
                  className={`block rounded-full ${
                    tick.major
                      ? 'bg-bloom-300 shadow-[0_0_12px_rgba(242,108,182,0.45)]'
                      : 'bg-white/75'
                  }`}
                  style={{
                    width: tick.major ? '2px' : '1px',
                    height: tick.major ? (activeSceneTick ? '22px' : '15px') : '9px',
                    opacity: tick.major
                      ? 0.22 + intensity * 0.78
                      : 0.06 + intensity * 0.52,
                    transform: `scaleY(${tick.major ? 0.92 + intensity * 0.18 : 0.9 + intensity * 0.24})`,
                  }}
                />
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="h-5 w-px bg-white/12" />
            <p className="text-[0.58rem] uppercase tracking-[0.32em] text-white/28">
              Scroll
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
