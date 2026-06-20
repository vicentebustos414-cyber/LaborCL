import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { PageInicio } from './pages/PageInicio'
import { PageAnos } from './pages/PageAnos'
import { PageVacaciones } from './pages/PageVacaciones'
import { PageFiniquito } from './pages/PageFiniquito'
import { PageAviso } from './pages/PageAviso'
import { PageIndemnizacion } from './pages/PageIndemnizacion'
import { PageAfpSalud } from './pages/PageAfpSalud'
import { PageDescuentos } from './pages/PageDescuentos'
import { PageAfc } from './pages/PageAfc'
import { PageAccidente } from './pages/PageAccidente'
import { PageContratos } from './pages/PageContratos'
import { PageDespidos } from './pages/PageDespidos'
import { PageDerechos } from './pages/PageDerechos'
import { PageCondiciones } from './pages/PageCondiciones'
import { PageMateriales } from './pages/PageMateriales'
import { PageAnalizar } from './pages/PageAnalizar'
import { PageTutela } from './pages/PageTutela'
import { PageKarin } from './pages/PageKarin'
import { PageJornada } from './pages/PageJornada'
import { PageMaternidad } from './pages/PageMaternidad'
import { PageTeletrabajo } from './pages/PageTeletrabajo'
import { PageOIRS } from './pages/PageOIRS'
import { PageOCR } from './pages/PageOCR'
import { PageHistorial } from './pages/PageHistorial'
import { Menu, X } from 'lucide-react'

export type PageId =
  | 'inicio' | 'anos' | 'vacaciones' | 'finiquito' | 'aviso' | 'indemnizacion'
  | 'afp-salud' | 'descuentos' | 'afc'
  | 'accidente' | 'contratos' | 'despidos' | 'derechos' | 'condiciones' | 'materiales'
  | 'tutela' | 'karin' | 'jornada' | 'maternidad' | 'teletrabajo' | 'oirs'
  | 'analizar' | 'ocr' | 'historial-contratos'

const buildPages = (nav: (id: PageId) => void): Record<PageId, React.ReactNode> => ({
  inicio: <PageInicio onNavigate={nav} />,
  anos: <PageAnos />,
  vacaciones: <PageVacaciones />,
  finiquito: <PageFiniquito />,
  aviso: <PageAviso />,
  indemnizacion: <PageIndemnizacion />,
  'afp-salud': <PageAfpSalud />,
  descuentos: <PageDescuentos />,
  afc: <PageAfc />,
  accidente: <PageAccidente />,
  contratos: <PageContratos />,
  despidos: <PageDespidos />,
  derechos: <PageDerechos />,
  condiciones: <PageCondiciones />,
  materiales: <PageMateriales />,
  tutela: <PageTutela />,
  karin: <PageKarin />,
  jornada: <PageJornada />,
  maternidad: <PageMaternidad />,
  teletrabajo: <PageTeletrabajo />,
  oirs: <PageOIRS />,
  analizar: <PageAnalizar onNavigate={nav} />,
  ocr: <PageOCR />,
  'historial-contratos': <PageHistorial />,
})

export default function App() {
  const [page, setPage] = useState<PageId>('inicio')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (id: PageId) => {
    setPage(id)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const PAGES = buildPages(navigate)

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300
          lg:translate-x-0 lg:static lg:block
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar current={page} onNavigate={navigate} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 h-14 px-4 bg-[#161616] border-b border-white/[0.07] sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#F0EDE8] p-1"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="font-serif text-xl font-bold">
            Labor<span className="text-[#C8102E]">CL</span>
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 px-8 py-10 md:px-14 md:py-14 max-w-5xl">
          <div key={page} className="animate-[fade-in_0.3s_ease_forwards]">
            {PAGES[page]}
          </div>
        </main>
      </div>
    </div>
  )
}
