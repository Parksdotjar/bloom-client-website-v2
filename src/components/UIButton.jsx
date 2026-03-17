import { motion } from 'motion/react'
import { cn } from '../utils/classNames'

const MotionLink = motion.a
const MotionButton = motion.button

const variants = {
  primary:
    'border-bloom-300/30 bg-bloom-400/18 text-white shadow-glow hover:border-bloom-200/40',
  secondary:
    'border-white/10 bg-white/[0.04] text-white/88 hover:border-white/20 hover:bg-white/[0.07]',
}

export default function UIButton({
  children,
  className = '',
  href,
  icon: Icon,
  variant = 'primary',
  ...props
}) {
  const sharedClassName = cn(
    'inline-flex items-center justify-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.02em] backdrop-blur-xl transition-colors duration-300',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <MotionLink
        href={href}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        className={sharedClassName}
        {...props}
      >
        {children}
        {Icon ? <Icon className="h-4 w-4" strokeWidth={1.7} /> : null}
      </MotionLink>
    )
  }

  return (
    <MotionButton
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className={sharedClassName}
      {...props}
    >
      {children}
      {Icon ? <Icon className="h-4 w-4" strokeWidth={1.7} /> : null}
    </MotionButton>
  )
}
