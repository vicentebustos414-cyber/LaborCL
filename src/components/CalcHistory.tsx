import { useState } from 'react'
import { History, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { getHistory, clearHistory, type CalcEntry } from '@/lib/history'

export function CalcHistory({ onRefresh }: { onRefresh?: () => void }) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<CalcEntry[]>(() => getHistory())

  const refresh = () => {
    setItems(getHistory())
    onRefresh?.()
  }

  const handleClear = () => {
    clearHistory()
    setItems([])
  }

  if (items.length === 0) return null

  return (
    <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#161616] overflow-hidden">
      <button
        onClick={() => { setOpen(o => !o); refresh() }}
        className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-[#A09A93] hover:text-[#F0EDE8] transition-colors"
      >
        <span className="flex items-center gap-2">
          <History size={14} className="text-[#C9922A]" />
          Últimos {items.length} cálculo{items.length !== 1 ? 's' : ''}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {open && (
        <div className="border-t border-white/[0.07]">
          {items.map((e) => (
            <div key={e.id} className="px-5 py-3 border-b border-white/[0.04] last:border-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-[#C9922A] tracking-wide">{e.tipo}</span>
                <span className="text-[10px] text-[#6B6560]">{e.fecha}</span>
              </div>
              <div className="text-base font-bold text-[#F0EDE8] font-serif">{e.resumen}</div>
              {Object.entries(e.detalle).map(([k, v]) => (
                <div key={k} className="flex gap-2 text-[11px] text-[#6B6560] mt-0.5">
                  <span>{k}:</span><span className="text-[#A09A93]">{v}</span>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={handleClear}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] text-[#6B6560] hover:text-[#C8102E] transition-colors"
          >
            <Trash2 size={12} /> Borrar historial
          </button>
        </div>
      )}
    </div>
  )
}
