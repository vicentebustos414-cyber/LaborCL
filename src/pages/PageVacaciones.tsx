import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ResultBox } from '@/components/ResultBox'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { diffFechas, today } from '@/lib/utils'

export function PageVacaciones() {
  const [ingreso, setIngreso] = useState('')
  const [hoy, setHoy] = useState('')
  const [previos, setPrevios] = useState('0')
  const [tomadas, setTomadas] = useState('0')
  const [result, setResult] = useState<null | { pendientes: number; diasAnuales: number; progresivo: number; proporcional: number }>(null)

  const calc = () => {
    if (!ingreso) return
    const fin = hoy || today()
    const r = diffFechas(ingreso, fin)
    const fraccYear = (r.months * 30 + r.days) / 365
    const diasProp = Math.floor(15 * fraccYear)
    const totalAnos = r.years + (parseInt(previos) || 0)
    let progresivo = 0
    if (totalAnos >= 10) progresivo = Math.floor((totalAnos - 10) / 3)
    const diasAnuales = 15 + progresivo
    const proporcional = r.years === 0 ? diasProp : diasAnuales
    const pendientes = Math.max(0, proporcional - (parseInt(tomadas) || 0))
    setResult({ pendientes, diasAnuales, progresivo, proporcional })
  }

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Calculadora"
        title="Vacaciones"
        titleEm="Legales"
        desc="Calcula tus días de vacaciones pendientes considerando el progresivo por años de servicio."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-7 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Fecha de ingreso *</label>
            <Input type="date" value={ingreso} onChange={e => setIngreso(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#A09A93]">Fecha de cálculo <span className="text-[#6B6560]">(vacío = hoy)</span></label>
            <Input type="date" value={hoy} onChange={e => setHoy(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Años previos</label>
              <Input type="number" min="0" value={previos} onChange={e => setPrevios(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Días tomados</label>
              <Input type="number" min="0" value={tomadas} onChange={e => setTomadas(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calc}>Calcular vacaciones</Button>
          {result && (
            <ResultBox
              value={`${result.pendientes} días hábiles`}
              items={[
                { label: 'Base legal', value: '15 días' },
                { label: 'Días progresivo', value: `+${result.progresivo} días` },
                { label: 'Total anual', value: `${result.diasAnuales} días` },
                { label: 'Pendientes', value: `${result.pendientes} días` },
              ]}
            />
          )}
        </Card>

        <div className="space-y-5">
          {[
            {
              title: 'Base legal — Art. 67 CT',
              body: '15 días hábiles de vacaciones anuales después de 1 año de trabajo continuo. El sábado no se cuenta como día hábil.',
              color: 'border-[#C8102E]',
            },
            {
              title: 'Vacaciones progresivas — Art. 68 CT',
              body: 'Después de 10 años de trabajo (en el mismo empleador u otros), se agrega 1 día adicional por cada 3 años adicionales.',
              color: 'border-[#C9922A]',
            },
            {
              title: 'Importante',
              body: 'Las vacaciones no pueden ser compensadas en dinero salvo al término de la relación laboral. El empleador tiene la obligación de otorgarlas.',
              color: 'border-[#A09A93]',
            },
          ].map(c => (
            <div key={c.title} className={`bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] ${c.color}`}>
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">{c.title}</div>
              <p className="text-sm text-[#A09A93] leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
