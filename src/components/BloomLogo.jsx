import { forwardRef, useId } from 'react'

const petals = [0, 60, 120, 180, 240, 300]

const BloomLogo = forwardRef(function BloomLogo(
  { className = '', monochrome = false },
  ref,
) {
  const id = useId()
  const petalGradientId = `${id}-petal`
  const coreGradientId = `${id}-core`
  const auraGradientId = `${id}-aura`

  return (
    <svg
      ref={ref}
      viewBox="0 0 140 140"
      className={className}
      fill="none"
      role="img"
      aria-label="Bloom Client logo"
    >
      <defs>
        <radialGradient id={auraGradientId} cx="50%" cy="50%" r="60%">
          <stop stopColor={monochrome ? 'rgba(255,255,255,0.26)' : '#ff9fd8'} />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={petalGradientId} x1="70" y1="18" x2="70" y2="122">
          <stop stopColor={monochrome ? '#f5f5f7' : '#ffe1f3'} />
          <stop offset="0.45" stopColor={monochrome ? '#d4d4d8' : '#ff8ac9'} />
          <stop offset="1" stopColor={monochrome ? '#7f7f87' : '#b92d71'} />
        </linearGradient>
        <radialGradient id={coreGradientId} cx="50%" cy="45%" r="65%">
          <stop stopColor={monochrome ? '#ffffff' : '#fff4fb'} />
          <stop offset="0.7" stopColor={monochrome ? '#d6d6dc' : '#ff8bc9'} />
          <stop offset="1" stopColor={monochrome ? '#84848d' : '#c03176'} />
        </radialGradient>
      </defs>

      <circle cx="70" cy="70" r="44" fill={`url(#${auraGradientId})`} data-aura />
      <circle
        cx="70"
        cy="70"
        r="52"
        stroke={monochrome ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.12)'}
        strokeWidth="0.75"
      />

      {petals.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 70 70)`}>
          <ellipse
            data-petal
            cx="70"
            cy="38"
            rx="14"
            ry="28"
            fill={`url(#${petalGradientId})`}
            opacity="0.96"
          />
        </g>
      ))}

      <circle data-core cx="70" cy="70" r="17" fill={`url(#${coreGradientId})`} />
      <circle
        cx="70"
        cy="70"
        r="25"
        stroke={monochrome ? 'rgba(255,255,255,0.12)' : 'rgba(255, 208, 232, 0.26)'}
        strokeWidth="0.75"
      />
    </svg>
  )
})

export default BloomLogo
