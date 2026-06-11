import { PageHeader } from '@/components/PageHeader'

const Section = ({ title, sub, items, color }: { title: string; sub?: string; items: string[]; color: string }) => (
  <div className={`bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] ${color}`}>
    <div className="text-sm font-semibold text-[#F0EDE8] mb-1">{title}</div>
    {sub && <div className="text-xs text-[#6B6560] mb-3">{sub}</div>}
    {!sub && <div className="mb-3" />}
    <ul className="space-y-2">
      {items.map(i => (
        <li key={i} className="flex gap-2 text-sm text-[#A09A93] leading-relaxed">
          <span className="flex-shrink-0 mt-0.5">•</span>{i}
        </li>
      ))}
    </ul>
  </div>
)

export function PageDerechos() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Código del Trabajo"
        title="Derechos y"
        titleEm="Obligaciones"
        desc="Los derechos fundamentales del trabajador y las obligaciones recíprocas de la relación laboral."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Section
            title="Derechos del trabajador"
            items={[
              'Remuneración mínima legal mensual garantizada',
              'Jornada máxima de 40 horas semanales (Ley 21.561)',
              'Descanso semanal (al menos 1 día, normalmente domingo)',
              'Vacaciones legales: 15 días hábiles/año',
              'Licencias médicas pagadas (FONASA/Isapre)',
              'No discriminación arbitraria en el trabajo',
              'Protección de la maternidad y paternidad',
              'Libertad sindical y negociación colectiva',
              'Indemnización al término según causal',
            ]}
            color="border-emerald-500"
          />
          <Section
            title="Derechos fundamentales"
            sub="Art. 5 Código del Trabajo"
            items={[
              'Respeto a la vida y salud física y psíquica',
              'Intimidad y honra del trabajador',
              'No intromisión en vida privada',
              'Libertad de conciencia y de expresión (con límites)',
              'Inviolabilidad de las comunicaciones',
              'Acceso a la justicia laboral (acción de tutela)',
            ]}
            color="border-[#C8102E]"
          />
        </div>

        <div className="space-y-5">
          <Section
            title="Obligaciones del trabajador"
            items={[
              'Prestar los servicios convenidos con diligencia y esmero',
              'Cumplir el reglamento interno de la empresa',
              'Dar aviso oportuno de ausencias y licencias',
              'Cuidar los bienes del empleador',
              'Guardar secreto de los asuntos confidenciales del negocio',
              'No realizar trabajos para la competencia (si está pactado)',
              'Llegar puntual y cumplir la jornada acordada',
            ]}
            color="border-[#C9922A]"
          />
          <Section
            title="Obligaciones del empleador"
            items={[
              'Pagar la remuneración pactada en fecha',
              'Respetar la jornada máxima legal',
              'Proporcionar los materiales y herramientas necesarias',
              'Proteger la seguridad y salud del trabajador (Art. 184)',
              'No sancionar económicamente fuera de los límites legales',
              'Entregar liquidación de sueldo mensual',
              'Cotizar AFP, Salud, AFC y Accidentes mensualmente',
            ]}
            color="border-[#A09A93]"
          />
        </div>
      </div>
    </div>
  )
}
