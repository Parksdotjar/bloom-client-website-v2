import { cn } from '../utils/classNames'

export default function ClientScreenshot({
  src,
  alt,
  className = '',
  imageClassName = '',
  ...props
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[32px] border border-black/70 bg-[#050507] shadow-[0_42px_120px_rgba(0,0,0,0.82),0_18px_48px_rgba(0,0,0,0.56),0_0_44px_rgba(242,108,182,0.12)]',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_65%_4%,rgba(242,108,182,0.12),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-[12px] rounded-[24px] border border-black/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
      <div className="pointer-events-none absolute inset-[20px] rounded-[20px] border border-black/45" />
      <div className="pointer-events-none absolute left-1/2 top-3 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-bloom-200/80 to-transparent shadow-[0_0_22px_rgba(255,193,229,0.45)]" />
      <div className="pointer-events-none absolute bottom-4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-24 bg-gradient-to-t from-bloom-400/[0.08] to-transparent blur-2xl" />
      <img
        src={src}
        alt={alt}
        className={cn(
          'relative block h-full w-full object-cover rounded-[inherit]',
          imageClassName,
        )}
      />
    </div>
  )
}
