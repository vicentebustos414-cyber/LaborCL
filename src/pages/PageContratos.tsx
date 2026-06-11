import { PageHeader } from '@/components/PageHeader'

const Block = ({ title, sub, items, color = 'border-[#C8102E]' }: { title: string; sub?: string; items: string[]; color?: string }) => (
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

export function PageContratos() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Código del Trabajo"
        title="Contratos"
        titleEm="Laborales"
        desc="Tipos de contrato, menciones obligatorias y derechos esenciales. Art. 7–11 del Código del Trabajo."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Block
            title="Tipos de contrato"
            items={[
              'Indefinido: sin fecha de término, más protección legal',
              'A plazo fijo: máximo 1 año (2 años para gerentes). Si se renueva por 2ª vez o el trabajador trabaja más de 1 año, se convierte en indefinido',
              'Por obra o faena: dura lo que dure la obra específica',
            ]}
          />
          <Block
            title="Menciones obligatorias"
            sub="Art. 10 Código del Trabajo"
            items={[
              'Lugar y fecha de celebración',
              'Individualización de las partes (RUT)',
              'Función o cargo y lugar de trabajo',
              'Remuneración y forma de pago',
              'Duración y distribución de la jornada',
              'Fecha de inicio (y término si es a plazo)',
              'Firma de ambas partes',
            ]}
            color="border-[#C9922A]"
          />
        </div>

        <div className="space-y-5">
          <Block
            title="Modificaciones al contrato"
            items={[
              'Deben hacerse por escrito y firmadas por ambas partes',
              'El empleador no puede modificar unilateralmente funciones, lugar o sueldo (ius variandi tiene límites: Art. 12 CT)',
              'Los anexos de contrato son parte del contrato y tienen igual valor legal',
            ]}
            color="border-emerald-500"
          />
          <Block
            title="Derechos básicos"
            items={[
              'Copia del contrato firmada al trabajador dentro de 15 días',
              'Jornada máxima: 40 horas semanales (desde 2024)',
              'Sueldo mínimo legal garantizado',
              'Colación y movilización según lo pactado',
              'No puede haber cláusulas ilegales (aunque estén firmadas, son nulas)',
            ]}
          />
          <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed">
            <span className="flex-shrink-0">💡</span>
            <p>¿Tienes dudas sobre tu contrato? Usa el módulo <strong>Analizar Contrato IA</strong> para que la IA te explique cada cláusula en lenguaje simple.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
