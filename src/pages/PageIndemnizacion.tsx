import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ResultBox } from '@/components/ResultBox'
import { CalcHistory } from '@/components/CalcHistory'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { diffFechas, fmt } from '@/lib/utils'
import { saveCalc } from '@/lib/history'

export function PageIndemnizacion() {
  const [f, setF] = useState({ sueldo: '', uf: '37800', ingreso: '', termino: '', recargo: '1' })
  const [result, setResult] = useState<null | { total: number; anos: number; base: number; tope: boolean; recargoPct: number }>(null)
  const [histKey, setHistKey] = useState(0)

  const calc = () => {
    const sueldo = parseFloat(f.sueldo) || 0
    const uf = parseFloat(f.uf) || 37800
    if (!sueldo || !f.ingreso || !f.termino) return
    if (f.termino < f.ingreso) return
    const r = diffFechas(f.ingreso, f.termino)
    const tope90uf = 90 * uf
    const tope = sueldo > tope90uf
    const base = Math.min(sueldo, tope90uf)
    const anos = Math.min(11, r.years + (r.months >= 6 ? 1 : 0))
    const recargo = parseFloat(f.recargo) || 1
    const total = base * anos * recargo
    const res = { total, anos, base, tope, recargoPct: recargo * 100 }
    setResult(res)
    saveCalc({
      tipo: 'Indemnización',
      resumen: fmt(total),
      detalle: {
        'Años': res.anos + ' año(s)',
        'Base': fmt(res.base) + '/mes',
        'Recargo': res.recargoPct + '%',
      },
    })
    setHistKey(k => k + 1)
  }

  const up = (k: string, v: string) => setF(p => ({ ...p, [k]: v }))

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Calculadora"
        title="Indemnización por"
        titleEm="Años de Servicio"
        desc="Calcula la indemnización con recargos legales según la causal de despido. Art. 163 CT."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Sueldo base *</label>
              <Input type="number" value={f.sueldo} onChange={e => up('sueldo', e.target.value)} />
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
            <label className="text-xs font-medium text-[#A09A93]">Recargo legal</label>
            <Select value={f.recargo} onChange={e => up('recargo', e.target.value)}>
              <option value="1">100% — Normal (Art. 163)</option>
              <option value="1.2">120% — Despido injustificado (Art. 168)</option>
              <option value="1.5">150% — Despido indebido (Art. 168)</option>
              <option value="1.8">180% — Despido improcedente (Art. 168)</option>
            </Select>
          </div>
          <Button className="w-full" onClick={calc}>Calcular indemnización</Button>
          {result && (
            <ResultBox
              shareTitle="Indemnización por Años de Servicio"
              value={fmt(result.total)}
              items={[
                { label: 'Años considerados', value: result.anos + ' año(s)' },
                { label: 'Base de cálculo', value: fmt(result.base) + '/mes' },
                { label: 'Tope 90 UF', value: result.tope ? 'Sí aplicó' : 'No aplica' },
                { label: 'Recargo', value: result.recargoPct + '%' },
              ]}
              note={result.anos === 11 ? '⚠️ Se aplicó el tope de 11 años máximo (Art. 163 CT).' : undefined}
            />
          )}
          <CalcHistory key={histKey} />
        </Card>

        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Recargos Art. 168 CT</div>
            <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">20%:</strong> despido injustificado (Art. 161 sin causa real)</span></li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">50%:</strong> despido indebido (causales Art. 159 aplicadas mal)</span></li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">80%:</strong> despido improcedente (fuero o acoso laboral)</span></li>
            </ul>
          </div>
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Topes legales</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Tope por mes: <strong className="text-[#F0EDE8]">90 UF</strong></li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Tope de años: <strong className="text-[#F0EDE8]">11 años</strong></li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Fracción ≥ 6 meses cuenta como año completo</li>
            </ul>
          </div>
          <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed">
            <span className="flex-shrink-0 mt-0.5">⚠️</span>
            <p>La indemnización pactada en el contrato no puede ser menor a la legal. Si hay pacto superior, prevalece el mayor.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
