import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Maximize2, Trash2, X, History, FileText, Search } from 'lucide-react'
import {
  getHistorial,
  eliminarAnalisis,
  formatearFecha,
  type EntradaHistorial,
} from '@/lib/historialContratos'

function renderMarkdown(text: string) {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-lg font-semibold text-[#F0EDE8] mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-xl font-semibold text-[#C9922A] mt-7 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-serif text-2xl font-semibold text-[#C9922A] mt-7 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#F0EDE8] font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-[#A09A93]">$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-[#A09A93] mb-1">• $1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-[#A09A93] text-sm leading-relaxed">')
}

interface ModalProps {
  entrada: EntradaHistorial
  onClose: () => void
}

function ModalAnalisis({ entrada, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.07] flex-shrink-0">
        <div>
          <p className="text-xs text-[#6B6560] uppercase tracking-widest mb-1">
            {formatearFecha(entrada.fecha)}
          </p>
          <h2 className="font-serif text-lg font-semibold text-[#F0EDE8] truncate max-w-2xl">
            {entrada.nombre}
          </h2>
          {entrada.pregunta && (
            <p className="text-xs text-[#C9922A] mt-1">Pregunta: {entrada.pregunta}</p>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-[#A09A93] hover:text-[#F0EDE8]">
          <X size={20} />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-8 py-8 max-w-4xl mx-auto w-full">
        <div
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: '<p class="mb-4 text-[#A09A93] text-sm leading-relaxed">' + renderMarkdown(entrada.resultado) + '</p>',
          }}
        />
      </div>
    </div>
  )
}

export function PageHistorial() {
  const [historial, setHistorial] = useState<EntradaHistorial[]>(() => getHistorial())
  const [seleccionado, setSeleccionado] = useState<EntradaHistorial | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [confirmEliminar, setConfirmEliminar] = useState<string | null>(null)

  const filtrados = historial.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.pregunta.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleEliminar = (id: string) => {
    eliminarAnalisis(id)
    setHistorial(getHistorial())
    setConfirmEliminar(null)
    if (seleccionado?.id === id) setSeleccionado(null)
  }

  return (
    <>
      {seleccionado && (
        <ModalAnalisis entrada={seleccionado} onClose={() => setSeleccionado(null)} />
      )}

      <div className="space-y-6">
        <PageHeader
          tag="Herramienta IA"
          title="Historial de"
          titleEm="Contratos"
          desc="Todos tus análisis anteriores guardados localmente en este dispositivo."
        />

        {historial.length === 0 ? (
          <Card className="p-16 text-center">
            <History size={52} className="mx-auto mb-5 opacity-20 text-[#6B6560]" />
            <p className="text-[#A09A93] text-sm">Aún no has analizado ningún contrato.</p>
            <p className="text-[#6B6560] text-xs mt-2">
              Los análisis se guardan automáticamente cada vez que uses el analizador.
            </p>
          </Card>
        ) : (
          <>
            {/* Búsqueda */}
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6560]" />
              <input
                type="text"
                placeholder="Buscar por nombre de archivo o pregunta..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full bg-[#1F1F1F] border border-white/[0.07] rounded-lg pl-10 pr-4 py-3 text-sm text-[#F0EDE8] outline-none focus:border-[#C8102E] placeholder:text-[#6B6560]"
              />
            </div>

            {/* Contador */}
            <div className="flex items-center justify-between text-xs text-[#6B6560]">
              <span>{filtrados.length} análisis{busqueda ? ' encontrados' : ' guardados'}</span>
              <span>Guardados solo en este dispositivo</span>
            </div>

            {/* Lista */}
            <div className="space-y-3">
              {filtrados.map(entrada => (
                <Card
                  key={entrada.id}
                  className="p-5 hover:border-[#C9922A]/30 transition-colors cursor-pointer group"
                  onClick={() => setSeleccionado(entrada)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#C9922A]/10 border border-[#C9922A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText size={16} className="text-[#C9922A]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#F0EDE8] truncate">{entrada.nombre}</p>
                        <p className="text-xs text-[#6B6560] mt-0.5">{formatearFecha(entrada.fecha)}</p>
                        {entrada.pregunta && (
                          <p className="text-xs text-[#A09A93] mt-1.5 line-clamp-1">
                            <span className="text-[#C9922A]">Pregunta:</span> {entrada.pregunta}
                          </p>
                        )}
                        <p className="text-xs text-[#6B6560] mt-1.5 line-clamp-2 leading-relaxed">
                          {entrada.resultado.replace(/<[^>]+>/g, '').substring(0, 120)}…
                        </p>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div
                      className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={e => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSeleccionado(entrada)}
                        title="Ver análisis completo"
                        className="text-[#A09A93] hover:text-[#F0EDE8]"
                      >
                        <Maximize2 size={14} />
                      </Button>

                      {confirmEliminar === entrada.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEliminar(entrada.id)}
                            className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-950/30"
                          >
                            Eliminar
                          </button>
                          <button
                            onClick={() => setConfirmEliminar(null)}
                            className="text-xs text-[#6B6560] hover:text-[#A09A93] px-2 py-1"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setConfirmEliminar(entrada.id)}
                          title="Eliminar"
                          className="text-[#6B6560] hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
