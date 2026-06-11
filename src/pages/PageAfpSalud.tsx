import { PageHeader } from '@/components/PageHeader'
import { ExternalLink } from 'lucide-react'

export function PageAfpSalud() {
  const afps = [
    { name: 'AFP Modelo',   com: '0.58%' },
    { name: 'AFP Uno',      com: '0.77%' },
    { name: 'AFP Capital',  com: '1.16%' },
    { name: 'AFP Cuprum',   com: '1.27%' },
    { name: 'AFP Habitat',  com: '1.44%' },
    { name: 'AFP PlanVital',com: '1.45%' },
    { name: 'AFP Provida',  com: '1.49%' },
  ]

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Información"
        title="AFP &"
        titleEm="Salud"
        desc="Entiende tu previsión: para qué sirve, cómo verificar tus cotizaciones y qué hacer si hay problemas."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {/* AFP */}
        <div className="space-y-5">
          <h3 className="font-serif text-xl font-semibold text-[#F0EDE8] pb-2 border-b border-white/[0.07]">Sistema AFP</h3>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Para qué sirve la AFP?</div>
            <p className="text-sm text-[#A09A93] leading-relaxed">Las AFP administran tu fondo de pensiones. El objetivo es acumular capital para tu jubilación. Cada mes se descuenta el <strong className="text-[#F0EDE8]">10% de tu sueldo bruto</strong> más la comisión del administrador.</p>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Cómo verificar si estás al día?</div>
            <p className="text-sm text-[#A09A93] leading-relaxed">Entra a <strong className="text-[#F0EDE8]">previred.com</strong> o directamente al sitio de tu AFP con tu RUT. Revisa el historial de cotizaciones. Si tu empleador no cotizó, denuncia en la Dirección del Trabajo.</p>
          </div>

          <div>
            <div className="text-[10px] tracking-[2px] uppercase text-[#6B6560] mb-3">AFP activas — comisiones 2024</div>
            <div className="space-y-2">
              {afps.map(a => (
                <div key={a.name} className="flex items-center justify-between px-4 py-3 bg-[#1F1F1F] rounded-lg text-sm">
                  <span className="text-[#F0EDE8]">{a.name}</span>
                  <span className="text-[#C9922A] font-semibold">{a.com}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Superintendencia AFP', url: 'https://www.spensiones.cl' },
              { label: 'Previred', url: 'https://www.previred.com' },
            ].map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 p-3.5 rounded-xl bg-[#1F1F1F] border border-white/[0.07] text-sm text-[#F0EDE8] hover:border-[#C8102E]/40 transition-colors">
                <ExternalLink size={14} className="text-[#C8102E]" />{l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Salud */}
        <div className="space-y-5">
          <h3 className="font-serif text-xl font-semibold text-[#F0EDE8] pb-2 border-b border-white/[0.07]">Sistema de Salud</h3>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Para qué sirve la cotización de salud?</div>
            <p className="text-sm text-[#A09A93] leading-relaxed">El <strong className="text-[#F0EDE8]">7% (mínimo legal)</strong> de tu sueldo bruto va a tu sistema de salud: Fonasa (público) o Isapre (privado). Fonasa da cobertura universal; las Isapres ofrecen planes con distintos beneficios y costos.</p>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-emerald-500">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Cómo verificar si estás al día?</div>
            <p className="text-sm text-[#A09A93] leading-relaxed">En Fonasa entra a <strong className="text-[#F0EDE8]">fonasa.cl</strong> con tu ClaveÚnica. En Isapres, revisa el portal de tu Isapre. Si hay meses sin cotización, reclama en la Superintendencia de Salud o en la DT.</p>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Fonasa vs. Isapre</div>
            <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
              <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">Fonasa:</span>Cobertura universal, sin exclusiones por preexistencias, GES garantizado</li>
              <li className="flex gap-2"><span className="text-[#C8102E] flex-shrink-0">Isapre:</span>Más prestaciones privadas, pero puede rechazar por preexistencias y subir precio anualmente</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Fonasa', url: 'https://www.fonasa.cl' },
              { label: 'Superintendencia Salud', url: 'https://www.supersalud.gob.cl' },
            ].map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 p-3.5 rounded-xl bg-[#1F1F1F] border border-white/[0.07] text-sm text-[#F0EDE8] hover:border-[#C8102E]/40 transition-colors">
                <ExternalLink size={14} className="text-[#C8102E]" />{l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
