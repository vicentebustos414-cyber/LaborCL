import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ResultBox } from '@/components/ResultBox'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { fmt } from '@/lib/utils'

export function PageAviso() {
  const [sueldo, setSueldo] = useState('')
  const [tipo, setTipo] = useState('no')
  const [diasDados, setDiasDados] = useState('0')
  const [result, setResult] = useState<null | { monto: number; detalle: string }>(null)

  const calc = () => {
    const s = parseFloat(sueldo) || 0
    if (!s) return
    const diario = s / 30
    let monto = 0, detalle = ''
    if (tipo === 'no') { monto = s; detalle = '30 días de remuneración (aviso no dado)' }
    else if (tipo === 'si') { monto = 0; detalle = '✅ Se dio aviso previo de 30+ días. No hay pago adicional.' }
    else { const faltantes = 30 - (parseInt(diasDados) || 0); monto = diario * faltantes; detalle = `Días faltantes: ${faltantes} × ${fmt(diario)}/día` }
    setResult({ monto, detalle })
  }

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Calculadora"
        title="Aviso"
        titleEm="Previo"
        desc="Art. 161 CT: el empleador debe dar 30 días de aviso por escrito o pagar una mensualidad adicional."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-7 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Sueldo mensual *</label>
            <Input type="number" placeholder="ej. 700000" value={sueldo} onChange={e => setSueldo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Tipo de aviso</label>
            <Select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="no">No se dio aviso previo</option>
              <option value="si">Se dio aviso previo completo (30+ días)</option>
              <option value="parcial">Aviso parcial (menos de 30 días)</option>
            </Select>
          </div>
          {tipo === 'parcial' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Días de aviso dados</label>
              <Input type="number" min="0" max="29" value={diasDados} onChange={e => setDiasDados(e.target.value)} />
            </div>
          )}
          <Button className="w-full" onClick={calc}>Calcular aviso previo</Button>
          {result && <ResultBox value={result.monto > 0 ? fmt(result.monto) : '$0'} sub={result.detalle} />}
        </Card>

        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Art. 161 Código del Trabajo</div>
            <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>El empleador debe dar <strong className="text-[#F0EDE8]">30 días de aviso por escrito</strong> antes del despido</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>Si no da aviso, debe pagar <strong className="text-[#F0EDE8]">1 mes de remuneración</strong> adicional</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>Si el aviso fue parcial, se paga la diferencia proporcional</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>El aviso corre desde la notificación escrita al trabajador</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>No aplica en causales del Art. 160 (disciplinarias)</li>
            </ul>
          </div>
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Cómo reclamar?</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Denuncia en la Inspección del Trabajo más cercana</li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Tienes <strong className="text-[#F0EDE8]">60 días hábiles</strong> desde el despido para reclamar</li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Guarda la carta de despido como prueba</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
