"use client"

import { Warp } from "@paper-design/shaders-react"
import {
  Calendar, Umbrella, FileText, Bell, Scale,
  Calculator, Shield, Coins, AlertTriangle,
  BookOpen, UserX, Users, Bot
} from "lucide-react"
import type { PageId } from "@/App"

interface Feature {
  id: PageId
  title: string
  description: string
  icon: React.ReactNode
  shaderColors: string[]
  shape: "checks" | "dots"
}

const features: Feature[] = [
  {
    id: "anos",
    title: "Años de Servicio",
    description: "Calcula tu antigüedad exacta para indemnización, vacaciones progresivas y beneficios legales.",
    icon: <Calendar className="w-10 h-10 text-white" />,
    shaderColors: ["hsl(350, 85%, 25%)", "hsl(350, 85%, 50%)", "hsl(30, 90%, 40%)", "hsl(350, 70%, 60%)"],
    shape: "checks",
  },
  {
    id: "finiquito",
    title: "Finiquito",
    description: "Estima el monto total del finiquito: indemnización, aviso previo y vacaciones pendientes.",
    icon: <FileText className="w-10 h-10 text-white" />,
    shaderColors: ["hsl(200, 90%, 20%)", "hsl(200, 80%, 50%)", "hsl(180, 80%, 35%)", "hsl(200, 70%, 65%)"],
    shape: "dots",
  },
  {
    id: "indemnizacion",
    title: "Indemnización",
    description: "Calcula la indemnización por años de servicio con todos los recargos legales (Art. 168).",
    icon: <Scale className="w-10 h-10 text-white" />,
    shaderColors: ["hsl(120, 60%, 20%)", "hsl(140, 70%, 45%)", "hsl(100, 60%, 25%)", "hsl(130, 70%, 60%)"],
    shape: "checks",
  },
  {
    id: "afc",
    title: "AFC Cesantía",
    description: "Verifica tu Fondo de Cesantía, requisitos y estima los beneficios según la Ley 19.728.",
    icon: <Coins className="w-10 h-10 text-white" />,
    shaderColors: ["hsl(35, 90%, 25%)", "hsl(45, 95%, 55%)", "hsl(30, 80%, 35%)", "hsl(50, 90%, 65%)"],
    shape: "dots",
  },
  {
    id: "analizar",
    title: "Analizar Contrato IA",
    description: "Sube tu contrato y Claude IA te explica cada cláusula en lenguaje simple con referencias legales.",
    icon: <Bot className="w-10 h-10 text-white" />,
    shaderColors: ["hsl(260, 80%, 25%)", "hsl(280, 90%, 55%)", "hsl(250, 70%, 35%)", "hsl(270, 80%, 70%)"],
    shape: "checks",
  },
  {
    id: "despidos",
    title: "Causales de Despido",
    description: "Entiende los artículos 159, 160 y 161 del Código del Trabajo y cuándo impugnar tu despido.",
    icon: <UserX className="w-10 h-10 text-white" />,
    shaderColors: ["hsl(330, 80%, 25%)", "hsl(350, 85%, 55%)", "hsl(320, 70%, 35%)", "hsl(340, 80%, 70%)"],
    shape: "dots",
  },
]

interface FeatureShaderCardsProps {
  onNavigate?: (id: PageId) => void
}

export default function FeatureShaderCards({ onNavigate }: FeatureShaderCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className="relative h-72 cursor-pointer group"
          onClick={() => onNavigate?.(feature.id)}
        >
          {/* Shader background */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Warp
              style={{ height: "100%", width: "100%" }}
              proportion={0.35 + index * 0.02}
              softness={0.9 + index * 0.05}
              distortion={0.15 + index * 0.01}
              swirl={0.7 + index * 0.04}
              swirlIterations={8 + index}
              shape={feature.shape}
              shapeScale={0.09 + index * 0.005}
              scale={1}
              rotation={0}
              speed={0.6}
              colors={feature.shaderColors}
            />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 p-6 rounded-2xl h-full flex flex-col bg-black/75 border border-white/15 group-hover:bg-black/65 group-hover:border-white/30 transition-all duration-300">
            <div className="mb-4 drop-shadow-lg">{feature.icon}</div>

            <h3 className="text-xl font-bold mb-3 text-white leading-tight">
              {feature.title}
            </h3>

            <p className="text-sm leading-relaxed flex-grow text-gray-200">
              {feature.description}
            </p>

            <div className="mt-4 flex items-center text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
              <span className="mr-1.5">Abrir módulo</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
