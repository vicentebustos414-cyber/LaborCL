import { Warp } from "@paper-design/shaders-react"
import FeatureShaderCards from "@/components/ui/feature-shader-cards"
import type { PageId } from "@/App"
import {
  Scale, BookOpen, Users, Building, Wrench,
  Shield, AlertTriangle, Calculator, Umbrella, Bell
} from "lucide-react"

interface PageInicioProps {
  onNavigate?: (id: PageId) => void
}

export function PageInicio({ onNavigate }: PageInicioProps) {
  return (
    <div className="space-y-10">

      {/* ── Hero con Warp shader ── */}
      <div className="relative h-[380px] rounded-2xl overflow-hidden">
        {/* Shader background */}
        <div className="absolute inset-0">
          <Warp
            style={{ height: "100%", width: "100%" }}
            proportion={0.4}
            softness={1.1}
            distortion={0.22}
            swirl={0.85}
            swirlIterations={14}
            shape="dots"
            shapeScale={0.07}
            scale={1}
            rotation={0}
            speed={0.5}
            colors={[
              "hsl(350, 85%, 18%)",
              "hsl(350, 80%, 35%)",
              "hsl(30, 85%, 28%)",
              "hsl(350, 60%, 8%)",
            ]}
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14">
          <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9922A] mb-3">
            Código del Trabajo · DFL N°1 · Chile
          </div>

          <h1 className="font-serif font-semibold leading-tight text-[#F0EDE8] mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Tu guía de<br />
            <em className="not-italic text-[#C9922A]">Derecho Laboral</em>
          </h1>

          <p className="text-[#A09A93] text-sm leading-relaxed max-w-lg mb-6">
            Calculadoras precisas, guías claras y análisis con IA para trabajadores y empleadores de Chile.
          </p>

          <div className="flex gap-8 flex-wrap">
            {[
              { num: "14+", desc: "Módulos legales" },
              { num: "DFL 1",  desc: "Código del Trabajo" },
              { num: "2024",   desc: "Normativa vigente" },
            ].map(s => (
              <div key={s.num}>
                <div className="font-serif text-2xl font-bold text-[#C8102E] leading-none">{s.num}</div>
                <div className="text-[11px] text-[#6B6560] mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Shader feature cards — módulos principales ── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl font-semibold text-[#F0EDE8]">
            Módulos principales
          </h2>
          <span className="text-xs text-[#6B6560]">Haz clic para abrir</span>
        </div>

        <FeatureShaderCards onNavigate={onNavigate} />
      </div>

      {/* ── Módulos adicionales (sin shader) ── */}
      <div>
        <h2 className="font-serif text-xl font-semibold text-[#F0EDE8] mb-4">
          Más información
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { id: "vacaciones"  as PageId, icon: <Umbrella size={16}/>,      label: "Vacaciones" },
            { id: "aviso"       as PageId, icon: <Bell size={16}/>,           label: "Aviso Previo" },
            { id: "descuentos"  as PageId, icon: <Calculator size={16}/>,     label: "Descuentos AFP" },
            { id: "afp-salud"   as PageId, icon: <Shield size={16}/>,         label: "AFP & Salud" },
            { id: "accidente"   as PageId, icon: <AlertTriangle size={16}/>,  label: "Accidente Laboral" },
            { id: "contratos"   as PageId, icon: <BookOpen size={16}/>,       label: "Contratos" },
            { id: "derechos"    as PageId, icon: <Users size={16}/>,          label: "Derechos" },
            { id: "condiciones" as PageId, icon: <Building size={16}/>,       label: "Condiciones" },
            { id: "materiales"  as PageId, icon: <Wrench size={16}/>,         label: "Materiales" },
            { id: "despidos"    as PageId, icon: <Scale size={16}/>,          label: "Despidos" },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => onNavigate?.(m.id)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#161616] border border-white/[0.07] text-sm text-[#A09A93] hover:border-[#C8102E]/40 hover:text-[#F0EDE8] transition-all text-left"
            >
              <span className="text-[#C8102E] flex-shrink-0">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="flex gap-3 p-4 rounded-xl bg-[#C9922A]/5 border border-[#C9922A]/20 text-[#C9922A] text-xs leading-relaxed">
        <span className="text-base mt-0.5 flex-shrink-0">⚖️</span>
        <p>
          <strong>Solo referencia informativa.</strong> Los resultados de los cálculos son aproximados y no reemplazan la asesoría de un abogado laboral. Siempre consulta con la Inspección del Trabajo ante dudas.
        </p>
      </div>

    </div>
  )
}
