/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bloom: {
          50: '#fff1f8',
          100: '#ffe0f1',
          200: '#ffc1e3',
          300: '#ff96cf',
          400: '#f26cb6',
          500: '#dc458f',
          600: '#b92d71',
          700: '#8f2057',
          800: '#61163d',
          900: '#381028',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['"Manrope Variable"', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        panel:
          '0 32px 80px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        glow: '0 0 80px rgba(242, 108, 182, 0.18)',
      },
      letterSpacing: {
        scene: '0.34em',
      },
      backgroundImage: {
        'bloom-radial':
          'radial-gradient(circle at center, rgba(242, 108, 182, 0.22), transparent 60%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.45, transform: 'scale(0.96)' },
          '50%': { opacity: 0.85, transform: 'scale(1.04)' },
        },
      },
      animation: {
        drift: 'drift 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
