import { useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResultItem { label: string; value: string }

interface ResultBoxProps {
  label?: string
  value: string
  sub?: string
  items?: ResultItem[]
  note?: string
  className?: string
  shareTitle?: string
}

export function ResultBox({ label = 'Resultado', value, sub, items, note, className, shareTitle }: ResultBoxProps) {
  const [copied, setCopied] = useState(false)

  const buildText = () => {
    const lines = [`🔵 LaborCL — ${shareTitle || label}`, `Resultado: ${value}`]
    if (items?.length) items.forEach(i => lines.push(`• ${i.label}: ${i.value}`))
    if (note) lines.push(`ℹ️ ${note}`)
    lines.push('\nlaborcl.onrender.com')
    return lines.join('\n')
  }

  const copy = async () => {
    await navigator.clipboard.writeText(buildText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsapp = () => {
    const text = encodeURIComponent(buildText())
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

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

      {/* Share buttons */}
      <div className="flex gap-2 mt-5 pt-4 border-t border-white/[0.07]">
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#A09A93] hover:text-[#F0EDE8] hover:bg-[#1F1F1F] transition-all"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
        <button
          onClick={whatsapp}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-[#A09A93] hover:text-[#25D366] hover:bg-[#1F1F1F] transition-all"
        >
          <Share2 size={13} />
          WhatsApp
        </button>
      </div>
    </div>
  )
}
