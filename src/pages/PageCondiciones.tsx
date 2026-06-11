import { PageHeader } from '@/components/PageHeader'

const Block = ({ title, sub, items, color }: { title: string; sub?: string; items: string[]; color: string }) => (
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

export function PageCondiciones() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Jornada y Descanso"
        title="Condiciones"
        titleEm="Laborales"
        desc="Jornada, descanso, remuneraciones y protecciones especiales reguladas por el Código del Trabajo."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Block
            title="Jornada laboral"
            sub="Ley 21.561 — vigente desde 2024"
            items={[
              'Máximo 40 horas semanales (reducción progresiva desde 45h)',
              'Distribución: 4 o 5 días, con 2 días de descanso en jornada 4×3',
              'Máximo 10 horas diarias ordinarias',
              'Horas extra: máximo 2 diarias y 12 semanales, con 50% de recargo',
              'Descanso de colación: mínimo 30 minutos (no computable en jornada)',
            ]}
            color="border-[#C8102E]"
          />
          <Block
            title="Remuneraciones"
            items={[
              'Sueldo base mínimo: IMM vigente garantizado',
              'Se paga mensualmente o según lo pactado (quincenal, semanal)',
              'Descuentos solo los autorizados por ley o escritura',
              'Liquidación de sueldo: obligatoria cada mes',
              'Comisiones, bonos y horas extra forman parte de la remuneración',
              'El empleador no puede retener pagos arbitrariamente',
            ]}
            color="border-[#C9922A]"
          />
        </div>

        <div className="space-y-5">
          <Block
            title="Protección a la Maternidad"
            items={[
              'Pre-natal: 6 semanas de licencia con goce de sueldo',
              'Post-natal: 12 semanas de licencia',
              'Post-natal parental: hasta 12 semanas adicionales',
              'Permiso paternal: 5 días pagados',
              'Sala cuna: empresas con ≥20 trabajadoras',
              'Derecho a amamantamiento durante la jornada',
            ]}
            color="border-emerald-500"
          />
          <Block
            title="Teletrabajo"
            sub="Ley 21.220 — vigente desde 2020"
            items={[
              'Debe constar en el contrato o anexo firmado',
              'El trabajador puede solicitar volver a trabajo presencial',
              'Empleador debe proporcionar equipos y conectividad',
              'Derecho a desconexión digital (12 hrs continuas mínimo)',
              'Mismos derechos y beneficios que el trabajo presencial',
            ]}
            color="border-[#A09A93]"
          />
        </div>
      </div>
    </div>
  )
}
