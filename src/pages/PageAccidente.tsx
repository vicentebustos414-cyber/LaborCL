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

export function PageAccidente() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Ley 16.744"
        title="Accidente"
        titleEm="Laboral"
        desc="Derechos y obligaciones ante un accidente de trabajo o enfermedad profesional. Ley 16.744."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <InfoCard
            title="¿Qué es un accidente del trabajo?"
            items={[
              'Toda lesión que sufra el trabajador por causa o con ocasión del trabajo (Art. 5 Ley 16.744)',
              'Incluye accidentes de trayecto (casa–trabajo–casa)',
              'Enfermedades profesionales causadas por el trabajo',
              'No incluye accidentes por fuerza mayor no laboral ni actos voluntarios del trabajador',
            ]}
          />
          <InfoCard
            title="Derechos del trabajador accidentado"
            items={[
              'Atención médica gratuita por la Mutualidad del empleador',
              'Subsidio por incapacidad temporal (equivale al sueldo)',
              'Indemnización global si queda con incapacidad permanente',
              'Pensión de invalidez si la incapacidad es ≥ 70%',
              'Pensión de sobrevivencia para los familiares en caso de muerte',
            ]}
            color="border-emerald-500"
          />
        </div>

        <div className="space-y-5">
          <InfoCard
            title="Obligaciones del empleador"
            items={[
              'Estar afiliado a una Mutualidad (ACHS, IST, Mutual de Seguridad) o al ISL',
              'Pagar la cotización de accidentes (aprox. 0.93% del sueldo)',
              'Denunciar el accidente a la Mutualidad dentro de 24 horas (DIAT)',
              'Tomar medidas correctivas para evitar recurrencia',
              'No puede descontar al trabajador los días de licencia por accidente laboral',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="¿Qué hacer si sufres un accidente?"
            items={[
              'Avisa de inmediato a tu empleador o supervisor',
              'Ve directamente al centro de salud de la Mutualidad (no a FONASA)',
              'Exige la DIAT (Denuncia Individual de Accidente del Trabajo)',
              'Guarda todos los documentos médicos',
              'Si el empleador no reporta, puedes denunciar directamente a la Mutualidad o a la DT',
            ]}
          />
          <div className="flex gap-3 p-5 rounded-xl bg-[#C8102E]/8 border border-[#C8102E]/20 text-[#C8102E] text-sm leading-relaxed">
            <span className="flex-shrink-0">⚠️</span>
            <p>Si el empleador no está afiliado a una Mutualidad, es el Estado (ISL) quien cubre las prestaciones y el empleador puede ser multado y responsabilizado civilmente.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
