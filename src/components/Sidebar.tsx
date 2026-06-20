import { PageId } from '../App'
import {
  Home, Calendar, Umbrella, FileText, Bell, Scale,
  Shield, Calculator, Coins, AlertTriangle, BookOpen,
  UserX, Users, Building, Wrench, Bot,
  Gavel, HeartHandshake, Clock, Baby, Laptop, MapPin,
  Sun, Moon, Scan
} from 'lucide-react'
import { useTheme } from '../lib/theme'

type NavItem = { id: PageId; label: string; icon: React.ReactNode }
type NavGroup = { title: string; items: NavItem[] }

const NAV: NavGroup[] = [
  {
    title: 'Calculadoras',
    items: [
      { id: 'anos',          label: 'Años de Servicio',   icon: <Calendar size={16} /> },
      { id: 'vacaciones',    label: 'Vacaciones',         icon: <Umbrella size={16} /> },
      { id: 'finiquito',     label: 'Finiquito',          icon: <FileText size={16} /> },
      { id: 'aviso',         label: 'Aviso Previo',       icon: <Bell size={16} /> },
      { id: 'indemnizacion', label: 'Indemnización',      icon: <Scale size={16} /> },
      { id: 'descuentos',    label: 'Descuentos AFP',     icon: <Calculator size={16} /> },
    ],
  },
  {
    title: 'Información',
    items: [
      { id: 'afp-salud',   label: 'AFP & Salud',          icon: <Shield size={16} /> },
      { id: 'afc',         label: 'AFC Cesantía',         icon: <Coins size={16} /> },
      { id: 'accidente',   label: 'Accidente Laboral',    icon: <AlertTriangle size={16} /> },
      { id: 'contratos',   label: 'Contratos',            icon: <BookOpen size={16} /> },
      { id: 'despidos',    label: 'Despidos',             icon: <UserX size={16} /> },
      { id: 'derechos',    label: 'Derechos y Obligaciones', icon: <Users size={16} /> },
      { id: 'condiciones', label: 'Condiciones Laborales',icon: <Building size={16} /> },
      { id: 'materiales',  label: 'Materiales de Trabajo',icon: <Wrench size={16} /> },
    ],
  },
  {
    title: 'Leyes Recientes',
    items: [
      { id: 'tutela',     label: 'Tutela Laboral',       icon: <Gavel size={16} /> },
      { id: 'karin',      label: 'Ley Karin (Acoso)',    icon: <HeartHandshake size={16} /> },
      { id: 'jornada',    label: 'Jornada 40 Horas',     icon: <Clock size={16} /> },
      { id: 'maternidad', label: 'Maternidad/Paternidad',icon: <Baby size={16} /> },
      { id: 'teletrabajo',label: 'Teletrabajo',          icon: <Laptop size={16} /> },
      { id: 'oirs',       label: 'Dónde Reclamar',       icon: <MapPin size={16} /> },
    ],
  },
  {
    title: 'Herramientas IA',
    items: [
      { id: 'analizar', label: 'Analizar Contrato', icon: <Bot size={16} /> },
      { id: 'ocr', label: 'Extractor OCR', icon: <Scan size={16} /> },
    ],
  },
]

interface SidebarProps {
  current: PageId
  onNavigate: (id: PageId) => void
}

export function Sidebar({ current, onNavigate }: SidebarProps) {
  const { theme, toggle } = useTheme()
  return (
    <nav className="h-full min-h-screen flex flex-col bg-[#161616] border-r border-white/[0.07] overflow-y-auto">
      {/* Logo */}
      <div
        className="px-6 py-7 border-b border-white/[0.07] cursor-pointer"
        onClick={() => onNavigate('inicio')}
      >
        <div className="font-serif text-[26px] font-bold leading-none text-[#F0EDE8]">
          Labor<span className="text-[#C8102E]">CL</span>
        </div>
        <div className="text-[10px] font-medium tracking-[3px] uppercase text-[#6B6560] mt-1">
          Derecho Laboral
        </div>
      </div>

      {/* Nav groups */}
      <div className="flex-1 py-3">
        {NAV.map((group) => (
          <div key={group.title} className="mb-1">
            <div className="px-5 py-2 text-[9px] font-semibold tracking-[2.5px] uppercase text-[#6B6560]">
              {group.title}
            </div>
            {group.items.map((item) => {
              const active = item.id === current
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-2.5 px-4 py-2.5 mx-2 rounded-lg text-sm
                    transition-all duration-150 text-left
                    ${active
                      ? 'bg-[#C8102E]/10 text-[#C8102E] font-medium'
                      : 'text-[#A09A93] hover:bg-[#1F1F1F] hover:text-[#F0EDE8]'
                    }
                  `}
                  style={{ width: 'calc(100% - 16px)' }}
                >
                  <span className="flex-shrink-0 opacity-80">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/[0.07] text-[11px] text-[#6B6560] leading-relaxed">
        <button
          onClick={toggle}
          className="flex items-center gap-2 mb-3 px-3 py-2 w-full rounded-lg text-xs text-[#A09A93] hover:text-[#F0EDE8] hover:bg-[#1F1F1F] transition-all"
        >
          {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        </button>
        <p>Solo referencia informativa.</p>
        <p>No reemplaza asesoría legal.</p>
        <p className="mt-1 text-[#3a3a3a]">Código del Trabajo DFL N°1</p>
      </div>
    </nav>
  )
}
