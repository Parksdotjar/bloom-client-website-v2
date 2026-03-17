import UIPanel from './UIPanel'

export default function MetricPill({ icon, label, value, note, className = '' }) {
  const IconComponent = icon

  return (
    <UIPanel compact className={className}>
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-bloom-200">
          <IconComponent className="h-4 w-4" strokeWidth={1.6} />
        </div>
        <div className="space-y-1">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/36">
            {label}
          </p>
          <p className="font-display text-lg text-white">{value}</p>
          <p className="max-w-[14rem] text-sm text-white/52">{note}</p>
        </div>
      </div>
    </UIPanel>
  )
}
