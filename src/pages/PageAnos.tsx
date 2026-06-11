import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ResultBox } from '@/components/ResultBox'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { diffFechas, fmtNum, today } from '@/lib/utils'

export function PageAnos() {
  const [inicio, setInicio] = useState('')
  const [termino, setTermino] = useState('')
  const [result, setResult] = useState<null | ReturnType<typeof diffFechas>>(null)

  const calc = () => {
    if (!inicio) return
    const fin = termino || today()
    setResult(diffFechas(inicio, fin))
  }

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Calculadora"
        title="Años de"
        titleEm="Servicio"
        desc="Calcula tu antigüedad exacta para fines de indemnización, vacaciones progresivas y otros beneficios."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-7 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Fecha de ingreso *</label>
            <Input type="date" value={inicio} onChange={e => setInicio(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Fecha de término <span className="text-[#6B6560]">(vacío = hoy)</span></label>
            <Input type="date" value={termino} onChange={e => setTermino(e.target.value)} />
          </div>
          <Button className="w-full" onClick={calc}>Calcular antigüedad</Button>

          {result && (
            <ResultBox
              value={`${result.years} años, ${result.months} meses, ${result.days} días`}
              items={[
                { label: 'Años completos', value: String(result.years) },
                { label: 'Meses restantes', value: String(result.months) },
                { label: 'Días restantes', value: String(result.days) },
                { label: 'Total días', value: fmtNum(result.totalDias) + ' días' },
              ]}
              note={result.months >= 6
                ? '⚡ Fracción mayor a 6 meses: cuenta como año completo para indemnización.'
                : 'ℹ️ Fracción menor a 6 meses no se cuenta como año adicional para indemnización.'}
            />
          )}
        </Card>

        <div className="space-y-5">
          {[
            {
              title: '¿Para qué sirve?',
              items: [
                'Calcular indemnización por años de servicio (Art. 163 CT)',
                'Determinar vacaciones progresivas (Art. 68 CT)',
                'Verificar período de prueba (Art. 7 CT)',
                'Cumplimiento de requisitos legales',
              ],
              color: 'border-[#C8102E]',
            },
            {
              title: 'Fracción de años',
              items: [
                'Fracción ≥ 6 meses → se cuenta como 1 año adicional (solo para indemnización)',
                'Fracción < 6 meses → no se cuenta',
                'El tope máximo de indemnización es 11 años (Art. 163 CT)',
              ],
              color: 'border-[#C9922A]',
            },
          ].map(c => (
            <div key={c.title} className={`bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] ${c.color}`}>
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">{c.title}</div>
              <ul className="space-y-2">
                {c.items.map(i => (
                  <li key={i} className="text-sm text-[#A09A93] leading-relaxed flex gap-2">
                    <span className="text-[#C8102E] mt-0.5 flex-shrink-0">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
