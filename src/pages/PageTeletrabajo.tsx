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

export function PageTeletrabajo() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Ley 21.220 — Trabajo a Distancia y Teletrabajo"
        title="Tele"
        titleEm="trabajo"
        desc="La Ley 21.220 regula el trabajo a distancia y teletrabajo en Chile. Establece derechos sobre gastos operacionales, jornada, desconexión y reversibilidad."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <InfoCard
            title="Diferencia: trabajo a distancia vs teletrabajo"
            sub="Art. 152 quáter G CT"
            items={[
              'Trabajo a distancia: labores en lugar distinto al establecimiento del empleador (puede ser cualquier lugar)',
              'Teletrabajo: submodalidad donde el trabajo se realiza mediante tecnologías de información y comunicación',
              'Ambos pueden ser total (100% remoto) o parcial (híbrido)',
              'Deben pactarse por escrito en el contrato o anexo de contrato',
              'El trabajador puede proponer el cambio — el empleador tiene 15 días para responder',
            ]}
          />
          <InfoCard
            title="Equipos y gastos operacionales"
            sub="Art. 152 quáter J CT"
            items={[
              'El empleador debe proporcionar o costear los equipos necesarios (computador, conexión, etc.)',
              'Debe cubrir o reembolsar los gastos de operación: internet, electricidad, materiales',
              'El monto puede pactarse en el contrato o determinarse por acuerdo',
              'El reembolso de gastos no es remuneración — no tributa ni es imponible',
              'Si el empleador no proporciona equipos, el trabajador puede negarse al teletrabajo',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="Jornada en teletrabajo"
            sub="Art. 152 quáter H CT"
            items={[
              'Se aplican las mismas reglas de jornada que el trabajo presencial',
              'El trabajador puede distribuir su jornada dentro del día con cierta flexibilidad',
              'Puede acordarse que el trabajador organice libremente su horario (jornada autónoma)',
              'Si hay jornada autónoma, queda excluido del límite de horas pero igual tiene límite de trabajo',
              'Debe quedar claro en el contrato si la jornada es autónoma, parcialmente autónoma o sujeta a horario',
            ]}
            color="border-emerald-500"
          />
        </div>

        <div className="space-y-5">
          <InfoCard
            title="Derecho a desconexión digital"
            sub="Art. 152 quáter L CT"
            items={[
              'Mínimo 12 horas continuas de desconexión en cada período de 24 horas',
              'Durante la desconexión, el trabajador NO está obligado a responder llamadas, mensajes ni correos',
              'El empleador no puede sancionar al trabajador por no responder fuera de horario',
              'Los mensajes enviados fuera de horario no generan obligación de respuesta inmediata',
              'Excepción: casos de fuerza mayor o emergencia debidamente calificada',
            ]}
            color="border-[#C8102E]"
          />
          <InfoCard
            title="Reversibilidad del teletrabajo"
            sub="Art. 152 quáter I CT"
            items={[
              'Si el teletrabajo fue acordado al inicio del contrato, cualquiera puede pedir volver a la presencialidad',
              'El empleador debe responder en 30 días si el trabajador solicita volver',
              'Si el empleador propone el cambio, el trabajador puede rechazarlo sin represalias',
              'El rechazo del trabajador a teletrabajar no puede ser causal de despido',
              'La reversión siempre queda sujeta a que exista puesto de trabajo disponible en la empresa',
            ]}
          />
          <InfoCard
            title="Seguridad y salud en teletrabajo"
            sub="Art. 152 quáter K CT"
            items={[
              'El empleador debe informar por escrito los riesgos del puesto de trabajo a distancia',
              'Debe capacitar en el uso correcto de los equipos (ergonomía, pausas activas)',
              'Accidentes en el lugar de teletrabajo durante la jornada laboral son accidentes del trabajo',
              'El trabajador puede negarse a ser fiscalizado en su domicilio sin su consentimiento',
              'La DT puede inspeccionar el cumplimiento de la Ley 21.220',
            ]}
            color="border-[#C9922A]"
          />
        </div>
      </div>
    </div>
  )
}
