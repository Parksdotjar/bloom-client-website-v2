import { cn } from '../utils/classNames'

export default function UIPanel({
  children,
  className = '',
  accent = false,
  compact = false,
  ...props
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[30px] border bg-[var(--panel)] backdrop-blur-[22px] shadow-[0_28px_80px_rgba(0,0,0,0.58),0_8px_24px_rgba(0,0,0,0.34),0_0_36px_rgba(242,108,182,0.08)]',
        accent ? 'border-bloom-300/20' : 'border-white/10',
        compact ? 'p-4' : 'p-6',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[inherit]',
          accent
            ? 'bg-[linear-gradient(180deg,rgba(242,108,182,0.12),transparent_55%)]'
            : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_45%)]',
        )}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
