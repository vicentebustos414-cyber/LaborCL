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

export function PageOIRS() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Dirección del Trabajo · Tribunales Laborales"
        title="Dónde y Cómo"
        titleEm="Reclamar"
        desc="Si el empleador vulnera tus derechos, tienes vías administrativas y judiciales. Conoce los plazos, organismos y pasos para reclamar efectivamente."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <InfoCard
            title="Inspección del Trabajo (DT) — vía administrativa"
            sub="Primera instancia — gratuita y sin abogado"
            items={[
              'Denuncia por incumplimientos: no pago de sueldo, horas extra, cotizaciones, etc.',
              'Puede denunciarse presencialmente en cualquier Inspección del Trabajo del país',
              'Denuncia online en: dt.gob.cl → "Servicios en Línea" → "Presentar denuncia"',
              'Fiscalizadores pueden visitar la empresa y cursar multas al empleador',
              'Trámite gratuito — no requiere abogado',
              'Plazo para responder: la DT cita a las partes en promedio dentro de 10–20 días',
            ]}
            color="border-emerald-500"
          />
          <InfoCard
            title="Plazos para reclamar — críticos"
            sub="No dejes vencer los plazos"
            items={[
              'Despido injustificado (Art. 168 CT): 60 días hábiles desde el despido',
              'Despido con vulneración de DDFF — Tutela (Art. 489): 60 días hábiles',
              'El plazo se suspende si vas a la DT: hasta 90 días hábiles adicionales',
              'No pago de cotizaciones (Art. 162): sin plazo fijo, pero conviene actuar pronto',
              'Accidente laboral: 5 años desde el accidente (acción civil)',
              'Fuero sindical o maternal: sin plazo especial, pero actuar de inmediato',
            ]}
            color="border-[#C8102E]"
          />
          <InfoCard
            title="¿Qué hace la DT al recibir la denuncia?"
            items={[
              '1. Cita a empleador y trabajador a audiencia de conciliación',
              '2. Si hay acuerdo: se firma acta y el empleador paga lo adeudado',
              '3. Si no hay acuerdo: el fiscalizador puede cursar multas',
              '4. La DT puede derivar el caso al Juzgado de Letras del Trabajo',
              '5. En tutela laboral, la DT puede interponer la acción en representación del trabajador',
            ]}
            color="border-[#C9922A]"
          />
        </div>

        <div className="space-y-5">
          <InfoCard
            title="Juzgado de Letras del Trabajo — vía judicial"
            sub="Para casos que no se resuelven en la DT"
            items={[
              'Competente para cobro de prestaciones, despido injustificado y tutela laboral',
              'Procedimiento monitorio: causas menores a 10 ITM — rápido y sin audiencia inicial',
              'Procedimiento de aplicación general: causas mayores — requiere audiencias',
              'Se recomienda contar con abogado, pero no es obligatorio para el procedimiento monitorio',
              'Corporación de Asistencia Judicial (CAJ) ofrece asesoría y representación gratuita',
              'Sindicatos pueden asesorar y representar a sus afiliados',
            ]}
          />
          <InfoCard
            title="Corporación de Asistencia Judicial (CAJ)"
            sub="Abogado gratis para quienes no pueden pagar"
            items={[
              'Servicio gratuito de defensa legal para trabajadores de bajos ingresos',
              'Oficinas en todas las regiones del país',
              'Atiende despidos, cobros de prestaciones, tutela laboral, accidentes del trabajo',
              'También orienta sobre si conviene ir a DT o directo al tribunal',
              'Sitio: cajmetro.cl (RM) — también hay CAJ en otras regiones',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="Sindicatos — apoyo adicional"
            items={[
              'Si estás sindicalizado, el sindicato puede asesorarte y representarte',
              'Los dirigentes sindicales tienen fuero — mayor protección ante represalias',
              'La CUT (Central Unitaria de Trabajadores) orienta a trabajadores sin sindicato',
              'La negociación colectiva puede mejorar condiciones sobre el mínimo legal',
            ]}
            color="border-emerald-500"
          />
          <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed">
            <span className="flex-shrink-0">📋</span>
            <div>
              <p className="font-semibold mb-1">Documentos que debes guardar siempre:</p>
              <p>Contratos, liquidaciones de sueldo, cartas de aviso, finiquitos, comunicaciones con el empleador (WhatsApp, correos). Son tu prueba principal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
