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

export function PageKarin() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Ley 21.643 — Vigente desde agosto 2024"
        title="Ley Karin"
        titleEm="Acoso Laboral y Sexual"
        desc="La Ley Karin modifica el Código del Trabajo y fortalece la protección contra el acoso laboral, acoso sexual y maltrato laboral en el lugar de trabajo."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <InfoCard
            title="¿Qué es acoso laboral?"
            sub="Art. 2 CT modificado por Ley 21.643"
            items={[
              'Agresión u hostigamiento reiterado ejercido por el empleador o uno o más trabajadores',
              'Implica maltrato de palabra, obra u omisión, con o sin jerarquía',
              'Debe atentar contra la dignidad del trabajador o crear un ambiente laboral hostil',
              'Puede ser entre pares (horizontal), de jefe a subordinado (vertical descendente) o de subordinado a jefe (vertical ascendente)',
              'No requiere reiteración si el acto singular es suficientemente grave',
            ]}
          />
          <InfoCard
            title="¿Qué es acoso sexual?"
            sub="Art. 2 CT"
            items={[
              'Requerimiento de carácter sexual no consentido, que amenace o perjudique la situación laboral',
              'Puede ser verbal, gestual o físico',
              'No requiere que sea reiterado — basta un solo acto grave',
              'Puede ocurrir entre trabajadores o de empleador a trabajador',
              'El empleador es responsable aunque no haya sido el acosador directo si no tomó medidas',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="¿Qué es maltrato laboral?"
            sub="Concepto incorporado por Ley 21.643"
            items={[
              'Acto único o reiterado que atente contra la dignidad de la persona',
              'No requiere la sistematicidad del acoso laboral',
              'Incluye insultos, humillaciones públicas, trato denigrante',
              'Puede provenir del empleador, superiores, pares o clientes',
            ]}
            color="border-emerald-500"
          />
        </div>

        <div className="space-y-5">
          <InfoCard
            title="Obligaciones del empleador (Ley 21.643)"
            sub="Toda empresa debe cumplir desde agosto 2024"
            items={[
              'Contar con un Protocolo de Prevención de Acoso y Maltrato Laboral',
              'Designar un canal de denuncia interno claro y accesible',
              'Investigar toda denuncia en un plazo máximo de 30 días hábiles',
              'Adoptar medidas de resguardo para el denunciante (separación física, cambio de turno)',
              'Informar del resultado al denunciante y al denunciado',
              'Aplicar sanciones proporcionales si se comprueba la conducta',
              'Capacitar a trabajadores en prevención de acoso (anualmente)',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="¿Cómo denunciar?"
            items={[
              '1. Denuncia interna: canal de denuncia de la empresa (obligatorio tener uno)',
              '2. Inspección del Trabajo (DT): si la empresa no tiene protocolo o no investiga',
              '3. Juzgado de Letras del Trabajo: mediante procedimiento de tutela laboral',
              'El denunciante goza de garantía de indemnidad — no puede ser despedido por denunciar',
              'Plazo para denunciar ante la DT: sin plazo fijo, pero conviene hacerlo a la brevedad',
            ]}
          />
          <div className="flex gap-3 p-5 rounded-xl bg-[#C8102E]/8 border border-[#C8102E]/20 text-[#C8102E] text-sm leading-relaxed">
            <span className="flex-shrink-0">⚠️</span>
            <p>La Ley Karin lleva el nombre de Karin Salgado, trabajadora del Hospital de Maipú que se suicidó tras sufrir acoso laboral. Su caso impulsó esta reforma al Código del Trabajo.</p>
          </div>
          <InfoCard
            title="Sanciones para el empleador"
            items={[
              'Multa de 3 a 60 UTM según tamaño de empresa',
              'Responsabilidad civil por daño moral si no previno ni actuó',
              'Posible demanda de tutela laboral con recargos de hasta 80%',
              'Si el acosador es el propio empleador: causal de despido indirecto (Art. 171 CT)',
            ]}
            color="border-[#C8102E]"
          />
        </div>
      </div>
    </div>
  )
}
