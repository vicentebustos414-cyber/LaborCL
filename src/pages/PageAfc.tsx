import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { fmt } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

type Tab = 'que' | 'req' | 'calc'

export function PageAfc() {
  const [tab, setTab] = useState<Tab>('que')
  const [f, setF] = useState({ sueldo: '', tipo: 'indefinido', causal: 'completo', meses: '', uf: '37800' })
  const [result, setResult] = useState<null | { rows: { mes: number; pct: number; monto: number }[]; total: number; titulo: string } | { error: string }>(null)

  const calc = () => {
    const sueldo = parseFloat(f.sueldo) || 0
    const meses = parseInt(f.meses) || 0
    const uf = parseFloat(f.uf) || 37800
    if (!sueldo || !meses) return
    const minMeses = f.tipo === 'indefinido' ? 12 : 6
    const maxMes = 10 * uf
    if (meses < minMeses) { setResult({ error: `Con ${meses} meses cotizados aún no cumples el mínimo de ${minMeses} meses. Te faltan ${minMeses - meses} mes(es).` }); return }
    let porcentajes: number[], titulo: string
    if (f.causal === 'completo' && f.tipo === 'indefinido') { porcentajes = [0.70, 0.55, 0.45, 0.35, 0.30]; titulo = 'Acceso Completo — Indefinido (Cuenta + Fondo Solidario)' }
    else if (f.causal === 'completo' && f.tipo === 'plazo') { porcentajes = [0.70, 0.55, 0.45]; titulo = 'Acceso Completo — Plazo Fijo (Cuenta + Fondo Solidario)' }
    else { porcentajes = [0.50, 0.50, 0.50]; titulo = 'Solo Cuenta Individual (renuncia / Art.159 / Art.160)' }
    const rows = porcentajes.map((p, i) => ({ mes: i + 1, pct: Math.round(p * 100), monto: Math.min(sueldo * p, maxMes) }))
    const total = rows.reduce((s, r) => s + r.monto, 0)
    setResult({ rows, total, titulo })
  }

  const up = (k: string, v: string) => setF(p => ({ ...p, [k]: v }))

  const tabs: { id: Tab; label: string }[] = [
    { id: 'que', label: '¿Qué es AFC?' },
    { id: 'req', label: 'Requisitos' },
    { id: 'calc', label: 'Calculadora' },
  ]

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Fondo de Cesantía"
        title="AFC"
        titleEm="Cesantía"
        desc="Administradora de Fondos de Cesantía — seguro de desempleo obligatorio desde 2002, regulado por la Ley 19.728."
      />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/[0.07] mb-8">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${tab === t.id ? 'border-[#C8102E] text-[#C8102E]' : 'border-transparent text-[#6B6560] hover:text-[#A09A93]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'que' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Qué es el AFC?</div>
              <p className="text-sm text-[#A09A93] leading-relaxed">El Seguro de Cesantía es un seguro obligatorio regulado por la <strong className="text-[#F0EDE8]">Ley 19.728</strong> para trabajadores dependientes con contrato desde octubre de 2002. Protege a los trabajadores ante la pérdida del empleo entregando beneficios económicos por un período determinado.</p>
            </div>
            <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Cómo funciona?</div>
              <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
                <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>El trabajador aporta <strong className="text-[#F0EDE8]">0.6%</strong> de su sueldo mensual</li>
                <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>El empleador aporta <strong className="text-[#F0EDE8]">2.4%</strong> (indefinido) o <strong className="text-[#F0EDE8]">3%</strong> (plazo fijo)</li>
                <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Se acumula en una Cuenta Individual del trabajador</li>
                <li className="flex gap-2"><span className="text-[#C9922A] flex-shrink-0">•</span>Existe además un Fondo Solidario para despidos Art. 161</li>
              </ul>
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-emerald-500">
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">¿Cómo verificar si estás al día?</div>
              <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
                <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">1.</span>Ingresa a <strong className="text-[#F0EDE8]">afc.cl</strong> con tu RUT y clave</li>
                <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">2.</span>Revisa tu Cuenta Individual AFC</li>
                <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">3.</span>Verifica que tu empleador haya cotizado cada mes</li>
                <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">4.</span>Si hay meses sin cotización, denuncia en la DT</li>
              </ul>
            </div>
            <a href="https://www.afc.cl" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 justify-center w-full py-4 px-4 rounded-xl bg-[#1F1F1F] border border-white/[0.07] text-sm text-[#F0EDE8] hover:border-[#C8102E]/40 transition-colors">
              <ExternalLink size={16} className="text-[#C8102E]" />
              Ir a afc.cl →
            </a>
          </div>
        </div>
      )}

      {tab === 'req' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-sm font-semibold text-[#F0EDE8]">Contrato Indefinido</div>
                <Badge>Art. 161</Badge>
              </div>
              <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
                <li className="flex gap-2"><span className="text-[#C8102E]">✓</span>Mínimo <strong className="text-[#F0EDE8]">12 meses</strong> de cotizaciones continuas</li>
                <li className="flex gap-2"><span className="text-[#C8102E]">✓</span>Despedido por necesidades de la empresa (Art. 161)</li>
                <li className="flex gap-2"><span className="text-[#C8102E]">✓</span>Accede a Cuenta Individual <strong>+ Fondo Solidario</strong></li>
                <li className="flex gap-2"><span className="text-[#C8102E]">✓</span>Hasta <strong className="text-[#F0EDE8]">5 meses</strong> de beneficio</li>
              </ul>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-sm font-semibold text-[#F0EDE8]">Contrato Plazo Fijo / Por Obra</div>
                <Badge variant="oro">Ley 19.728</Badge>
              </div>
              <ul className="space-y-2.5 text-sm text-[#A09A93] leading-relaxed">
                <li className="flex gap-2"><span className="text-[#C9922A]">✓</span>Mínimo <strong className="text-[#F0EDE8]">6 meses</strong> de cotizaciones</li>
                <li className="flex gap-2"><span className="text-[#C9922A]">✓</span>Al vencimiento del plazo o término de obra</li>
                <li className="flex gap-2"><span className="text-[#C9922A]">✓</span>Accede a Cuenta Individual <strong>+ Fondo Solidario</strong></li>
                <li className="flex gap-2"><span className="text-[#C9922A]">✓</span>Hasta <strong className="text-[#F0EDE8]">3 meses</strong> de beneficio</li>
              </ul>
            </Card>
          </div>
          <div className="space-y-5">
            <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#A09A93]">
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Solo Cuenta Individual (sin Fondo Solidario)</div>
              <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
                <li className="flex gap-2"><span className="flex-shrink-0">•</span>Renuncia voluntaria</li>
                <li className="flex gap-2"><span className="flex-shrink-0">•</span>Despido por causales Art. 159 (acuerdo mutuo, vencimiento plazo)</li>
                <li className="flex gap-2"><span className="flex-shrink-0">•</span>Despido por causales Art. 160 (falta grave)</li>
                <li className="flex gap-2"><span className="flex-shrink-0">•</span>Solo se puede retirar el saldo acumulado (hasta 3 cuotas)</li>
              </ul>
            </div>
            <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed">
              <span className="flex-shrink-0">⚠️</span>
              <p>El tope máximo de beneficio mensual es de <strong>10 UF</strong>. El beneficio decrece progresivamente cada mes.</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'calc' && (
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-7 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Remuneración promedio *</label>
              <Input type="number" placeholder="ej. 700000" value={f.sueldo} onChange={e => up('sueldo', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#A09A93]">Tipo de contrato</label>
                <Select value={f.tipo} onChange={e => up('tipo', e.target.value)}>
                  <option value="indefinido">Indefinido</option>
                  <option value="plazo">Plazo fijo / Por obra</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#A09A93]">Meses cotizados *</label>
                <Input type="number" placeholder="ej. 24" value={f.meses} onChange={e => up('meses', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#A09A93]">Causal de término</label>
              <Select value={f.causal} onChange={e => up('causal', e.target.value)}>
                <option value="completo">Art. 161 — Acceso completo (Cuenta + Fondo Solidario)</option>
                <option value="individual">Renuncia / Art.159 / Art.160 — Solo Cuenta Individual</option>
              </Select>
            </div>
            <Button className="w-full" onClick={calc}>Estimar beneficio AFC</Button>

            {'error' in (result || {}) && (
              <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm">
                <span>⚠️</span><span>{(result as {error:string}).error}</span>
              </div>
            )}

            {'rows' in (result || {}) && (() => {
              const r = result as { rows: {mes:number;pct:number;monto:number}[]; total:number; titulo:string }
              return (
                <div className="mt-4 p-5 rounded-xl border border-[#C8102E]/35 bg-[#0D0D0D]">
                  <div className="text-[10px] tracking-[2px] uppercase text-[#C8102E] mb-3">{r.titulo}</div>
                  <table className="w-full text-sm">
                    <thead><tr className="text-[#6B6560] border-b border-white/[0.07]">
                      <th className="py-2 text-left">Mes</th><th className="text-center">%</th><th className="text-right">Monto est.</th>
                    </tr></thead>
                    <tbody>
                      {r.rows.map(row => (
                        <tr key={row.mes} className="border-b border-white/[0.04]">
                          <td className="py-2 text-[#F0EDE8]">Mes {row.mes}</td>
                          <td className="text-center text-[#A09A93]">{row.pct}%</td>
                          <td className="text-right font-semibold text-[#C9922A]">{fmt(row.monto)}</td>
                        </tr>
                      ))}
                      <tr><td colSpan={2} className="pt-3 text-[#A09A93] font-medium">Total estimado</td>
                        <td className="pt-3 text-right font-bold text-[#C9922A] font-serif text-lg">{fmt(r.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            })()}
          </Card>
          <div className="space-y-5">
            <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C8102E]">
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Porcentajes de beneficio (Art. 161)</div>
              <ul className="space-y-2 text-sm text-[#A09A93]">
                {[70,55,45,35,30].map((p,i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#C8102E] flex-shrink-0">Mes {i+1}:</span>
                    <strong className="text-[#F0EDE8]">{p}%</strong>
                    <span>del promedio de remuneraciones</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#A09A93]">
              <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Nota importante</div>
              <p className="text-sm text-[#A09A93] leading-relaxed">Los montos son estimaciones. El cálculo oficial considera el promedio de los últimos 3, 6 o 12 meses y está sujeto al saldo de tu cuenta individual. Consulta directamente en <strong className="text-[#F0EDE8]">afc.cl</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
