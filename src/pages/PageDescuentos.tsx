import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ResultBox } from '@/components/ResultBox'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { fmt } from '@/lib/utils'

export function PageDescuentos() {
  const [sueldo, setSueldo] = useState('')
  const [afpCom, setAfpCom] = useState('1.44')
  const [saludPct, setSaludPct] = useState('7')
  const [result, setResult] = useState<null | { liquido: number; afp10: number; afpCom2: number; salud: number; total: number }>(null)

  const calc = () => {
    const s = parseFloat(sueldo) || 0
    if (!s) return
    const afp10 = s * 0.10
    const com = s * (parseFloat(afpCom) / 100)
    const sal = s * (parseFloat(saludPct) / 100)
    const total = afp10 + com + sal
    setResult({ liquido: s - total, afp10, afpCom2: com, salud: sal, total })
  }

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Calculadora"
        title="Descuentos"
        titleEm="AFP & Salud"
        desc="Calcula tu sueldo líquido estimado después de los descuentos previsionales obligatorios."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-7 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Sueldo bruto mensual *</label>
            <Input type="number" placeholder="ej. 900000" value={sueldo} onChange={e => setSueldo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">AFP — selecciona tu administradora</label>
            <Select value={afpCom} onChange={e => setAfpCom(e.target.value)}>
              <option value="0.58">AFP Modelo — comisión 0.58%</option>
              <option value="0.77">AFP Uno — comisión 0.77%</option>
              <option value="1.16">AFP Capital — comisión 1.16%</option>
              <option value="1.27">AFP Cuprum — comisión 1.27%</option>
              <option value="1.44">AFP Habitat — comisión 1.44%</option>
              <option value="1.45">AFP PlanVital — comisión 1.45%</option>
              <option value="1.49">AFP Provida — comisión 1.49%</option>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Salud (% del sueldo)</label>
            <Select value={saludPct} onChange={e => setSaludPct(e.target.value)}>
              <option value="7">7% — Fonasa (mínimo legal)</option>
              <option value="7.14">7.14% — Isapre promedio base</option>
              <option value="8">8% — Isapre ejemplo</option>
              <option value="10">10% — Isapre plan superior</option>
            </Select>
          </div>
          <Button className="w-full" onClick={calc}>Calcular sueldo líquido</Button>
          {result && (
            <ResultBox
              label="Sueldo líquido estimado"
              value={fmt(result.liquido)}
              items={[
                { label: 'Cotización AFP (10%)', value: fmt(result.afp10) },
                { label: `Comisión AFP (${afpCom}%)`, value: fmt(result.afpCom2) },
                { label: `Salud (${saludPct}%)`, value: fmt(result.salud) },
                { label: 'Total descuentos', value: fmt(result.total) },
              ]}
            />
          )}
        </Card>

        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Qué descuentos son obligatorios?</div>
            <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">10% AFP:</strong> va a tu cuenta individual de capitalización</span></li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">Comisión AFP:</strong> costo del administrador (varía por AFP)</span></li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span><span><strong className="text-[#F0EDE8]">7% Salud:</strong> mínimo legal — Fonasa o Isapre</span></li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>SIS: Seguro de Invalidez y Sobrevivencia (lo paga el empleador)</li>
              <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Accidentes: lo paga el empleador (Mutual/IST/ACHS)</li>
            </ul>
          </div>
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#A09A93]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Liquidación de sueldo</div>
            <p className="text-sm text-[#A09A93] leading-relaxed">El empleador debe entregar una <strong className="text-[#F0EDE8]">liquidación de sueldo mensual</strong> con todos los descuentos detallados. Guárdalas siempre como respaldo.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
