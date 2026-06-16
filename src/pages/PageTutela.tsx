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

export function PageTutela() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Art. 485–495 Código del Trabajo"
        title="Tutela"
        titleEm="Laboral"
        desc="El procedimiento de tutela protege derechos fundamentales del trabajador vulnerados por el empleador. Es el recurso más poderoso disponible."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <InfoCard
            title="¿Qué protege la Tutela Laboral?"
            sub="Art. 485 CT — Derechos Fundamentales"
            items={[
              'Derecho a la vida e integridad física y psíquica',
              'Respeto a la vida privada y honra del trabajador y su familia',
              'Inviolabilidad de toda forma de comunicación privada',
              'Libertad de conciencia, religión y culto',
              'Libertad de emitir opinión y de informar',
              'Libertad sindical y negociación colectiva',
              'Garantía de indemnidad (represalia por ejercer derechos laborales)',
            ]}
          />
          <InfoCard
            title="¿Cuándo se puede interponer?"
            items={[
              'Cuando el empleador vulnera un derecho fundamental durante la relación laboral',
              'En caso de despido que vulnere derechos fundamentales (despido vulneratorio)',
              'Cuando hay represalia por denunciar o ejercer acciones legales (garantía de indemnidad)',
              'Si hay acoso laboral o sexual que afecte derechos fundamentales',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="Plazo para interponer"
            items={[
              'Durante la relación laboral: mientras persista la vulneración',
              'Por despido vulneratorio: 60 días hábiles desde el despido',
              'El plazo se suspende si se interpone reclamo ante la Inspección del Trabajo',
              'Suspensión máxima de 90 días hábiles durante la mediación en la DT',
            ]}
            color="border-emerald-500"
          />
        </div>

        <div className="space-y-5">
          <InfoCard
            title="¿Dónde y cómo se interpone?"
            sub="Procedimiento Art. 486 CT"
            items={[
              'Ante el Juzgado de Letras del Trabajo competente',
              'También puede denunciarse ante la Inspección del Trabajo (DT) como paso previo',
              'La DT puede interponer la denuncia en representación del trabajador si constata vulneración',
              'El procedimiento es oral, concentrado y de tramitación preferente',
              'No requiere abogado para la denuncia inicial ante la DT',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="¿Qué puede obtener el trabajador?"
            sub="Sanciones y reparaciones Art. 489-492 CT"
            items={[
              'Cese inmediato de la conducta vulneratoria',
              'Reintegro al puesto de trabajo (si fue despedido)',
              'Indemnización del daño moral causado',
              'Indemnización sustitutiva del reintegro si el trabajador prefiere no volver',
              'Recargo de hasta 80% sobre indemnización por años de servicio en despido vulneratorio',
              'Multa al empleador de 6 a 60 UTM (dependiendo del tamaño de la empresa)',
            ]}
          />
          <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed">
            <span className="flex-shrink-0">⚖️</span>
            <p>En el procedimiento de tutela, corresponde al empleador probar que su conducta tuvo un motivo legítimo y proporcional. La carga de la prueba se invierte a su favor.</p>
          </div>
          <InfoCard
            title="Diferencia con despido injustificado"
            items={[
              'Despido injustificado (Art. 168): recargo de 30–50% sobre indemnización',
              'Despido vulneratorio (Art. 489): recargo de hasta 80% + daño moral + multa',
              'Tutela puede acumularse con acción de despido injustificado',
              'Plazos distintos: 60 días hábiles para tutela vs. 60 días corridos para despido injustificado',
            ]}
            color="border-[#C8102E]"
          />
        </div>
      </div>
    </div>
  )
}
