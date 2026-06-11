import { cn } from '@/lib/utils'

interface ResultItem { label: string; value: string }

interface ResultBoxProps {
  label?: string
  value: string
  sub?: string
  items?: ResultItem[]
  note?: string
  className?: string
}

export function ResultBox({ label = 'Resultado', value, sub, items, note, className }: ResultBoxProps) {
  return (
    <div className={cn(
      'mt-6 p-6 rounded-xl border border-[#C8102E]/35 bg-[#0D0D0D] animate-[fade-in_0.3s_ease_forwards]',
      className
    )}>
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[#C8102E] mb-2">{label}</div>
      <div className="font-serif text-4xl font-bold text-[#C9922A] leading-none">{value}</div>
      {sub && <div className="text-xs text-[#A09A93] mt-3 leading-relaxed">{sub}</div>}
      {items && items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-5">
          {items.map((it) => (
            <div key={it.label} className="bg-[#161616] rounded-lg p-3.5">
              <div className="text-[11px] text-[#6B6560] mb-1">{it.label}</div>
              <div className="text-sm font-semibold text-[#F0EDE8]">{it.value}</div>
            </div>
          ))}
        </div>
      )}
      {note && <div className="mt-4 text-xs text-[#A09A93] italic leading-relaxed">{note}</div>}
    </div>
  )
}
