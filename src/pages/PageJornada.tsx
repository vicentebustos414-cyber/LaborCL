import { PageHeader } from '@/components/PageHeader'

const InfoCard = ({ title, sub, items, color = 'border-[#C8102E]' }: { title: string; sub?: string; items: string[]; color?: string }) => (
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

export function PageJornada() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Ley 21.561 — Reducción gradual a 40 horas"
        title="Jornada de"
        titleEm="Trabajo"
        desc="La Ley 21.561 reduce la jornada laboral máxima de 45 a 40 horas semanales de forma gradual. Conoce el calendario, horas extra y tus derechos."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <InfoCard
            title="Reducción gradual de horas (Ley 21.561)"
            sub="Calendario de implementación"
            items={[
              '2024: máximo 44 horas semanales (ya vigente)',
              '2026: máximo 42 horas semanales',
              '2028: máximo 40 horas semanales (meta final)',
              'La reducción aplica a todos los contratos indefinidos y a plazo fijo',
              'Los empleadores no pueden rebajar el sueldo base por la reducción de horas',
            ]}
            color="border-emerald-500"
          />
          <InfoCard
            title="Jornada ordinaria — reglas generales"
            sub="Art. 22 y siguientes del Código del Trabajo"
            items={[
              'Máximo 10 horas diarias (jornada ordinaria)',
              'Mínimo 30 minutos de colación (no se cuenta como jornada)',
              'Máximo 6 días seguidos de trabajo — el 7° debe ser descanso',
              'El descanso semanal preferentemente debe ser domingo',
              'Trabajadores excluidos de jornada: gerentes, directores, trabajadores sin fiscalización superior',
            ]}
          />
          <InfoCard
            title="Jornada bisemanal y modalidades especiales"
            items={[
              'Jornada bisemanal: hasta 10 días continuos con descanso compensatorio (minería, faenas alejadas)',
              'Jornada excepcional: hasta 12 horas con autorización de la DT',
              'Trabajo por turno: rotativo, con descanso mínimo entre turnos de 8 horas',
              'Trabajo a distancia/teletrabajo: se rige por la Ley 21.220 (ver sección Teletrabajo)',
            ]}
            color="border-[#C9922A]"
          />
        </div>

        <div className="space-y-5">
          <InfoCard
            title="Horas extraordinarias"
            sub="Art. 30–32 CT"
            items={[
              'Solo en faenas que no perjudiquen la salud del trabajador',
              'Máximo 2 horas extra por día',
              'Máximo 12 horas extra por semana',
              'Deben pactarse por escrito (acuerdo de horas extra)',
              'Recargo mínimo del 50% sobre el sueldo ordinario por hora',
              'No pueden compensarse con descanso — deben pagarse en dinero',
              'Las horas extra no pactadas también deben pagarse si el empleador las ordenó',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="Derecho a desconexión digital"
            sub="Art. 12 bis CT — incorporado por Ley 21.220"
            items={[
              'Fuera de la jornada laboral, el trabajador no está obligado a responder comunicaciones',
              'El empleador no puede sancionar al trabajador por no contestar fuera de horario',
              'Aplica especialmente en teletrabajo, pero también en trabajo presencial',
              'Excepción: emergencias o fuerza mayor debidamente justificadas',
            ]}
          />
          <InfoCard
            title="Registro de asistencia"
            sub="Obligación del empleador"
            items={[
              'Todo empleador debe llevar registro de asistencia y horas trabajadas',
              'Puede ser libro físico, reloj control, sistema electrónico u otro medio',
              'El trabajador tiene derecho a acceder a su registro',
              'La DT puede fiscalizar en cualquier momento',
              'Si no hay registro, se presume que el trabajador trabajó la jornada ordinaria máxima',
            ]}
            color="border-[#C8102E]"
          />
        </div>
      </div>
    </div>
  )
}
