import { PageHeader } from '@/components/PageHeader'

export function PageMateriales() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Obligaciones del Empleador"
        title="Materiales de"
        titleEm="Trabajo"
        desc="El empleador está obligado a proporcionar los elementos necesarios para el desempeño seguro de las funciones."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-1">Obligación legal</div>
            <div className="text-xs text-[#6B6560] mb-3">Art. 184 Código del Trabajo</div>
            <p className="text-sm text-[#A09A93] leading-relaxed">El empleador debe proporcionar todos los elementos necesarios para que el trabajador pueda cumplir sus funciones con seguridad y eficiencia. El trabajador <strong className="text-[#F0EDE8]">NO puede ser obligado</strong> a usar sus propios bienes para el trabajo.</p>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Materiales que debe proveer el empleador</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              {[
                'Herramientas y equipos necesarios para las funciones',
                'EPP: casco, guantes, zapatos de seguridad, etc.',
                'Ropa de trabajo o uniforme cuando sea requerido',
                'Computadores, software y conectividad (teletrabajo)',
                'Insumos y materiales de oficina',
                'Acceso a instalaciones sanitarias adecuadas',
              ].map(i => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#C9922A] flex-shrink-0 mt-0.5">•</span>{i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#3498DB]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">EPP — Equipo de Protección Personal</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              {[
                'Identificar los riesgos del puesto de trabajo',
                'Seleccionar el EPP adecuado según la normativa técnica',
                'Proporcionar el EPP en forma gratuita y oportuna',
                'Capacitar al trabajador en el uso correcto',
                'Mantener y reponer el EPP cuando sea necesario',
              ].map(i => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#3498DB] flex-shrink-0 mt-0.5">•</span>{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#A09A93]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Qué pasa si el empleador no provee materiales?</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              {[
                'El trabajador puede negarse a trabajar sin arriesgar su puesto',
                'Denuncia ante la Inspección del Trabajo',
                'El empleador puede ser multado por la DT',
                'En accidente por falta de EPP, la responsabilidad recae sobre el empleador',
                'Posible demanda por daños y perjuicios',
              ].map(i => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#A09A93] flex-shrink-0 mt-0.5">•</span>{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed">
            <span className="flex-shrink-0">⚠️</span>
            <p>Si el trabajador usa bienes propios para el trabajo (vehículo, herramientas, teléfono), tiene derecho a una <strong>compensación</strong> por ese uso. Debe estar pactado en el contrato.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
