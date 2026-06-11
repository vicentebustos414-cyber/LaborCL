import { PageHeader } from '@/components/PageHeader'

export function PageDespidos() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Término de Contrato"
        title="Despidos y"
        titleEm="Causales"
        desc="Las causales de despido determinan si tienes derecho a indemnización. Artículos 159, 160 y 161 del Código del Trabajo."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-1">Art. 159 — Causales Objetivas</div>
            <div className="text-xs text-[#6B6560] mb-3">No dan derecho a indemnización</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              {[
                'Mutuo acuerdo de las partes',
                'Renuncia del trabajador (30 días de aviso)',
                'Muerte del trabajador',
                'Vencimiento del plazo convenido',
                'Conclusión del trabajo o servicio que dio origen al contrato',
                'Caso fortuito o fuerza mayor',
              ].map(i => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#C9922A] flex-shrink-0 mt-0.5">•</span>{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-1">Art. 160 — Causales Disciplinarias</div>
            <div className="text-xs text-[#6B6560] mb-3">No dan derecho a indemnización — despido sin pago</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              {[
                'Falta de probidad o conducta inmoral grave',
                'Acoso sexual o laboral',
                'Vías de hecho contra el empleador o compañeros',
                'Injurias o conducta inmoral',
                'Abandono de trabajo injustificado',
                'Actos u omisiones que afecten la seguridad',
                'Perjuicio material causado intencionalmente',
                'Incumplimiento grave de las obligaciones del contrato',
              ].map(i => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#C8102E] flex-shrink-0 mt-0.5">•</span>{i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-emerald-500">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-1">Art. 161 — Necesidades de la Empresa</div>
            <div className="text-xs text-emerald-500 mb-3">Da derecho a indemnización completa</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">✓</span><strong className="text-[#F0EDE8]">Da derecho a indemnización</strong> por años de servicio</li>
              <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">✓</span>Se debe pagar aviso previo (30 días) o indemnización equivalente</li>
              <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">✓</span>No necesita causa específica: es una decisión empresarial</li>
              <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">✓</span>No aplica en trabajadores con fuero laboral</li>
            </ul>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#A09A93]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Cuándo impugnar el despido?</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="flex-shrink-0 text-[#A09A93]">•</span>Tienes <strong className="text-[#F0EDE8]">60 días hábiles</strong> para demandar desde el despido</li>
              <li className="flex gap-2"><span className="flex-shrink-0 text-[#A09A93]">•</span>Si el despido fue injustificado, el juez puede ordenar pagar con recargo 20-80%</li>
              <li className="flex gap-2"><span className="flex-shrink-0 text-[#A09A93]">•</span>Si tenías fuero, el empleador debería haber pedido autorización judicial</li>
              <li className="flex gap-2"><span className="flex-shrink-0 text-[#A09A93]">•</span>Juzgado del Trabajo competente según tu domicilio o lugar de trabajo</li>
            </ul>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Fueros laborales</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>Directores sindicales</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>Trabajadoras embarazadas (desde inicio del embarazo hasta 1 año post-natal)</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>Candidatos a director sindical (15 días antes y después de la elección)</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">•</span>Trabajadores durante negociación colectiva</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
