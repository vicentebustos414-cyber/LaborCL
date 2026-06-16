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

export function PageMaternidad() {
  return (
    <div className="space-y-2">
      <PageHeader
        tag="Art. 194–208 Código del Trabajo"
        title="Maternidad y"
        titleEm="Paternidad"
        desc="Protecciones legales para madres y padres trabajadores: pre/postnatal, fuero parental, sala cuna y permiso del padre. Art. 194–208 CT."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <InfoCard
            title="Prenatal — descanso antes del parto"
            sub="Art. 195 CT"
            items={[
              '6 semanas de descanso prenatal obligatorio (antes del parto)',
              'El empleador no puede exigir trabajo durante este período',
              'Se paga como subsidio de licencia médica (100% del sueldo base + bonos imponibles)',
              'Si el parto ocurre antes, el período no usado se agrega al postnatal',
              'Inicio: 6 semanas antes de la fecha probable de parto',
            ]}
            color="border-emerald-500"
          />
          <InfoCard
            title="Postnatal — descanso después del parto"
            sub="Art. 195 CT"
            items={[
              '12 semanas obligatorias de descanso postnatal',
              'Se paga como subsidio (100% del sueldo base + bonos imponibles)',
              'Financiado por el Seguro de Cesantía (AFC) y el Fondo de Licencias Médicas',
              'No puede renunciarse ni reducirse',
              'En caso de parto prematuro, se extiende hasta completar las semanas faltantes del prenatal',
            ]}
          />
          <InfoCard
            title="Postnatal parental — extensión opcional"
            sub="Art. 197 bis CT"
            items={[
              '12 semanas adicionales al postnatal básico (en total 24 semanas desde el parto)',
              'La madre puede tomarlo de forma completa o trabajar media jornada por 18 semanas',
              'Puede transferirse al padre (hasta 6 semanas en postnatal completo o 12 en media jornada)',
              'El subsidio durante postnatal parental es el 100% del sueldo (tope UF 66,4 mensual)',
              'La madre debe avisar al empleador con 30 días de anticipación si transfiere semanas al padre',
            ]}
            color="border-[#C9922A]"
          />
        </div>

        <div className="space-y-5">
          <InfoCard
            title="Fuero maternal y parental"
            sub="Art. 201 CT"
            items={[
              'La madre no puede ser despedida desde el inicio del embarazo hasta 1 año después del postnatal parental',
              'El fuero aplica aunque el empleador no supiera del embarazo al momento del despido',
              'Para despedir a una trabajadora con fuero, el empleador necesita autorización judicial previa',
              'El padre también goza de fuero durante las semanas de postnatal parental que le transfieran',
              'En contratos a plazo fijo: el fuero se extiende hasta el vencimiento del plazo o término del proyecto',
            ]}
            color="border-[#C8102E]"
          />
          <InfoCard
            title="Permiso del padre (postnatal masculino)"
            sub="Art. 195 inciso 2° CT"
            items={[
              '5 días hábiles pagados desde el parto (obligatorio para el empleador otorgarlos)',
              'Puede tomarse en forma continua desde el parto o distribuirse en la primera semana',
              'Financiado por la empresa (no es subsidio estatal)',
              'Aplica también en adopción',
              'Adicionalmente puede recibir hasta 6 semanas del postnatal parental transferidas por la madre',
            ]}
            color="border-[#C9922A]"
          />
          <InfoCard
            title="Sala cuna"
            sub="Art. 203 CT"
            items={[
              'Empresas con 20 o más trabajadoras tienen obligación de sala cuna',
              'Pueden cumplirla: habilitando sala propia, contratando servicio externo o pagando el costo directamente',
              'El derecho a sala cuna aplica hasta que el hijo cumpla 2 años',
              'La madre tiene derecho a 1 hora diaria para dar alimento a su hijo (en cualquier modalidad)',
              'La hora de alimento es remunerada y no puede descontarse del sueldo',
            ]}
          />
          <div className="flex gap-3 p-5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 text-sm leading-relaxed">
            <span className="flex-shrink-0">💡</span>
            <p>El subsidio del postnatal se tramita a través del empleador o directamente en la Caja de Compensación. El monto exacto depende de las remuneraciones de los últimos 3 meses previos al prenatal.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
