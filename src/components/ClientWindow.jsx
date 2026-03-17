import {
  Bell,
  FolderInput,
  Gamepad2,
  Grid2x2,
  HelpCircle,
  ImagePlus,
  Layers3,
  Maximize2,
  Minus,
  Search,
  Settings2,
  UserRound,
  X,
} from 'lucide-react'
import BloomLogo from './BloomLogo'
import { cn } from '../utils/classNames'

const navIcons = [
  UserRound,
  Gamepad2,
  Layers3,
  FolderInput,
  Grid2x2,
  HelpCircle,
  Settings2,
]

export default function ClientWindow({
  children,
  className = '',
  compact = false,
  activeIndex = 0,
  ...props
}) {
  const iconSize = compact ? 'h-3 w-3' : 'h-4 w-4'
  const framePadding = compact ? 'p-4' : 'p-6'
  const contentPadding = compact ? 'px-4 py-4' : 'px-6 py-5'
  const profileWrap = compact
    ? 'gap-1 rounded-xl px-2 py-1'
    : 'gap-2 rounded-2xl px-3 py-1.5'
  const profileAvatar = compact ? 'h-6 w-6' : 'h-8 w-8'
  const profileName = compact ? 'text-[0.68rem] font-semibold' : 'text-sm font-semibold'
  const chipWrap = compact ? 'px-2 py-1 text-[0.54rem]' : 'px-3 py-1.5 text-[0.64rem]'
  const bellWrap = compact ? 'rounded-lg p-1.5' : 'rounded-2xl p-2'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[32px] border border-white/10 bg-[#060607]/95 shadow-[0_28px_80px_rgba(0,0,0,0.6),0_10px_34px_rgba(0,0,0,0.42),0_0_36px_rgba(242,108,182,0.08)]',
        compact ? 'min-h-[340px]' : 'min-h-[580px]',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_8%,rgba(242,108,182,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />

      <div className={cn('relative border-b border-white/8', compact ? 'px-3 py-2.5' : 'px-4 py-3')}>
        <div className="flex items-center justify-between gap-3">
          <div
            className={cn(
              'flex items-center gap-3 rounded-2xl border border-white/12 bg-black/40',
              compact ? 'min-w-[10.75rem] px-2.5 py-1.5' : 'min-w-[18rem] px-4 py-2.5',
            )}
          >
            <Search className={cn(iconSize, 'text-white/48')} strokeWidth={1.7} />
            <span className={cn(compact ? 'text-[0.68rem]' : 'text-xs', 'text-white/38')}>
              Search pages, actions, settings...
            </span>
            <span
              className={cn(
                'ml-auto rounded-lg border border-white/10 uppercase tracking-[0.22em] text-white/32',
                compact ? 'px-1.5 py-1 text-[0.54rem]' : 'px-2 py-1 text-[0.62rem]',
              )}
            >
              Ctrl K
            </span>
          </div>

          <div className={cn('flex items-center', compact ? 'gap-1.5' : 'gap-2')}>
            <div className={cn('border border-white/12 text-white/70', bellWrap)}>
              <Bell className={cn(iconSize)} strokeWidth={1.7} />
            </div>
            <div
              className={cn(
                'rounded-xl border border-white/12 uppercase tracking-[0.24em] text-white/52',
                chipWrap,
              )}
            >
              v0.2.17
            </div>
            <div
              className={cn(
                'flex items-center border border-white/12 bg-white/[0.02]',
                profileWrap,
              )}
            >
              <div
                className={cn(
                  'overflow-hidden rounded-full border border-bloom-300/18 bg-bloom-400/10',
                  profileAvatar,
                )}
              >
                <BloomLogo className="h-full w-full scale-[0.78]" />
              </div>
              <span className={cn('text-white/84', profileName)}>ParksAE</span>
            </div>
            <div className="hidden items-center gap-1 lg:flex">
              {[Minus, Maximize2, X].map((Icon) => (
                <div
                  key={Icon.displayName || Icon.name}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-2 text-white/48"
                >
                  <Icon className={cn(iconSize)} strokeWidth={1.7} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid min-h-[inherit] grid-cols-[64px_1fr]">
        <div className={cn('border-r border-white/8', framePadding)}>
          <div className="flex h-full flex-col items-center gap-3">
            <div className="rounded-[22px] border border-white/12 bg-white/[0.03] p-2.5 text-white">
              <BloomLogo className="h-8 w-8" monochrome />
            </div>

            {navIcons.map((Icon, index) => (
              <div
                key={Icon.displayName || Icon.name}
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-[18px] border transition-colors',
                  index === activeIndex
                    ? 'border-bloom-300/35 bg-bloom-400/12 text-bloom-100 shadow-[0_0_24px_rgba(242,108,182,0.18)]'
                    : 'border-white/10 bg-white/[0.02] text-white/34',
                )}
              >
                <Icon className={cn(iconSize)} strokeWidth={1.7} />
              </div>
            ))}

            <div className="mt-auto rounded-[18px] border border-white/10 bg-white/[0.02] p-3 text-white/42">
              <ImagePlus className={cn(iconSize)} strokeWidth={1.7} />
            </div>
          </div>
        </div>

        <div className={cn('relative', contentPadding)}>{children}</div>
      </div>
    </div>
  )
}
