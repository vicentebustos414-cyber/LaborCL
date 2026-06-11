import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ResultBox } from '@/components/ResultBox'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { diffFechas, fmt } from '@/lib/utils'

export function PageFiniquito() {
  const [f, setF] = useState({ sueldo: '', uf: '37800', ingreso: '', termino: '', causal: '161n1', vacP: '0', aviso: 'no' })
  const [result, setResult] = useState<null | { total: number; indem: number; avisoMonto: number; vacMonto: number; propMes: number; anosIndem: number; baseInd: number }>(null)

  const calc = () => {
    const sueldo = parseFloat(f.sueldo) || 0
    const uf = parseFloat(f.uf) || 37800
    if (!sueldo || !f.ingreso || !f.termino) return
    const r = diffFechas(f.ingreso, f.termino)
    const tope90uf = 90 * uf
    const baseInd = Math.min(sueldo, tope90uf)
    const anosIndem = Math.min(11, r.years + (r.months >= 6 ? 1 : 0))
    let indem = 0, avisoMonto = 0
    const vacMonto = (parseFloat(f.vacP) || 0) * (sueldo / 30) * 1.25
    const diasMes = new Date(f.termino).getDate()
    const propMes = (sueldo / 30) * diasMes
    if (f.causal === '161n1' || f.causal === '161n2') {
      indem = baseInd * anosIndem
      if (f.aviso === 'si') avisoMonto = sueldo
    }
    const total = indem + avisoMonto + vacMonto + propMes
    setResult({ total, indem, avisoMonto, vacMonto, propMes, anosIndem, baseInd })
  }

  const up = (k: string, v: string) => setF(p => ({ ...p, [k]: v }))

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Calculadora"
        title="Cálculo de"
        titleEm="Finiquito"
        desc="Estima el monto total del finiquito incluyendo indemnización, aviso previo y vacaciones pendientes."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Sueldo base *</label>
              <Input type="number" placeholder="ej. 800000" value={f.sueldo} onChange={e => up('sueldo', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Valor UF</label>
              <Input type="number" value={f.uf} onChange={e => up('uf', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Fecha ingreso *</label>
              <Input type="date" value={f.ingreso} onChange={e => up('ingreso', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Fecha término *</label>
              <Input type="date" value={f.termino} onChange={e => up('termino', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Causal de despido</label>
            <Select value={f.causal} onChange={e => up('causal', e.target.value)}>
              <option value="161n1">Art. 161 N°1 — Necesidades de la empresa</option>
              <option value="161n2">Art. 161 N°2 — Desahucio</option>
              <option value="159">Art. 159 — Causales objetivas (no paga indem.)</option>
              <option value="160">Art. 160 — Disciplinario (no paga indem.)</option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Vacaciones pendientes (días)</label>
              <Input type="number" min="0" value={f.vacP} onChange={e => up('vacP', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">¿Se dio aviso previo?</label>
              <Select value={f.aviso} onChange={e => up('aviso', e.target.value)}>
                <option value="no">No se dio aviso (paga)</option>
                <option value="si">Sí se dio aviso (no paga)</option>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={calc}>Calcular finiquito</Button>
          {result && (
            <ResultBox
              value={fmt(result.total)}
              items={[
                { label: 'Indem. años servicio', value: fmt(result.indem) },
                { label: 'Aviso previo', value: fmt(result.avisoMonto) },
                { label: 'Vacaciones pendientes', value: fmt(result.vacMonto) },
                { label: 'Proporcional del mes', value: fmt(result.propMes) },
              ]}
              note={`${result.anosIndem} año(s) considerados. Base de cálculo: ${fmt(result.baseInd)}/mes`}
            />
          )}
        </Card>

        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Componentes del finiquito</div>
            <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">Indemnización:</strong> 1 mes por año (tope 11 años y 90 UF/mes)</span></li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">Aviso previo:</strong> 30 días de remuneración si no se avisó</span></li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">Vacaciones:</strong> días pendientes × (sueldo/30) × 1.25</span></li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">Proporcional:</strong> días trabajados del mes en curso</span></li>
            </ul>
          </div>
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Causales sin indemnización</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Art. 159: mutuo acuerdo, vencimiento del plazo, renuncia</li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Art. 160: causales disciplinarias (abandono, falta grave, etc.)</li>
            </ul>
          </div>
          <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed">
            <span className="flex-shrink-0 mt-0.5">⚠️</span>
            <p>El finiquito debe firmarse ante notario, inspector del trabajo o dos testigos. Tienes derecho a una copia.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
