import { useState, useRef } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Bot, Scale, Loader2 } from 'lucide-react'

type Estado = 'idle' | 'loading' | 'done' | 'error'

declare global { interface Window { pdfjsLib: any } }

export function PageAnalizar() {
  const [file, setFile] = useState<File | null>(null)
  const [question, setQuestion] = useState('')
  const [estado, setEstado] = useState<Estado>('idle')
  const [loadingSub, setLoadingSub] = useState('')
  const [resultado, setResultado] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const clearFile = () => setFile(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.+)$/gm, '<h3 class="font-serif text-lg font-semibold text-[#F0EDE8] mt-6 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="font-serif text-xl font-semibold text-[#C9922A] mt-7 mb-3">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="font-serif text-2xl font-semibold text-[#C9922A] mt-7 mb-3">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#F0EDE8] font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="text-[#A09A93]">$1</em>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 text-[#A09A93] mb-1">• $1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-[#A09A93] text-sm leading-relaxed">')
  }

  const extraerTextoPDF = async (file: File): Promise<string> => {
    const arr = await file.arrayBuffer()
    const pdfjsLib = (window as any).pdfjsLib
    if (!pdfjsLib) throw new Error('pdf.js no disponible')
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    const pdf = await pdfjsLib.getDocument({ data: arr }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const tc = await page.getTextContent()
      text += tc.items.map((it: any) => it.str).join(' ') + '\n'
    }
    return text
  }

  const analizar = async () => {
    if (!file) { setErrorMsg('Sube un contrato primero.'); setEstado('error'); return }
    setEstado('loading')
    setResultado('')
    setErrorMsg('')

    try {
      let texto = ''

      if (file.type === 'application/pdf') {
        setLoadingSub('Extrayendo texto del PDF...')
        texto = await extraerTextoPDF(file)
      } else {
        // Imagen: convertir a base64 y enviar como texto placeholder
        setLoadingSub('Procesando imagen...')
        texto = `[Imagen de contrato adjunta: ${file.name}]`
      }

      setLoadingSub('Analizando con IA...')

      const resp = await fetch('/api/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, pregunta: question || undefined }),
      })

      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || `Error ${resp.status}`)

      setResultado(data.resultado)
      setEstado('done')
    } catch (e: any) {
      setErrorMsg(e.message || 'Error al analizar el contrato.')
      setEstado('error')
    } finally {
      setLoadingSub('')
    }
  }

  return (
    <div className="space-y-2">
      <PageHeader
        tag="Herramienta IA"
        title="Analizar tu"
        titleEm="Contrato"
        desc="Sube tu contrato laboral y la IA te lo explicará en lenguaje simple, cláusula por cláusula, referenciando el Código del Trabajo chileno."
      />

      <div className="flex gap-3 p-5 rounded-xl bg-[#C9922A]/8 border border-[#C9922A]/20 text-[#C9922A] text-sm leading-relaxed mb-6">
        <span className="flex-shrink-0">⚠️</span>
        <p>
          <strong>Privacidad:</strong> Tu contrato se envía directamente a la API de IA para el análisis.
          No almacenamos ningún archivo ni dato personal. El análisis es solo de referencia y{' '}
          <strong>no reemplaza asesoría legal profesional</strong>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-5">
          {/* Upload */}
          <Card className="p-7 space-y-4">
            <div className="text-sm font-semibold font-serif text-[#F0EDE8]">1. Sube tu Contrato</div>
            <div
              className="border-2 border-dashed border-white/[0.07] rounded-xl p-10 text-center cursor-pointer transition-all hover:border-[#C8102E]/50 hover:bg-[#C8102E]/5"
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Upload size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm text-[#F0EDE8] font-medium mb-1">Arrastra tu contrato aquí</p>
              <p className="text-xs text-[#6B6560]">o haz clic para seleccionar — PDF o imagen (JPG, PNG)</p>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={e => e.target.files?.[0] && setFile(e.target.files[0])}
              />
            </div>
            {file && (
              <div className="flex items-center justify-between px-4 py-3 bg-[#1F1F1F] rounded-lg">
                <div>
                  <div className="text-sm font-medium text-[#F0EDE8]">{file.name}</div>
                  <div className="text-xs text-[#6B6560]">{(file.size / 1024).toFixed(0)} KB</div>
                </div>
                <Button variant="ghost" size="icon" onClick={clearFile}><X size={14} /></Button>
              </div>
            )}
          </Card>

          {/* Question */}
          <Card className="p-7 space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold font-serif text-[#F0EDE8]">2. ¿Tienes una duda específica?</div>
              <Badge variant="muted">Opcional</Badge>
            </div>
            <textarea
              rows={4}
              placeholder="Ej: ¿Pueden obligarme a trabajar los domingos? ¿Mi cláusula de no competencia es legal? ¿Me pueden despedir estando con licencia?"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className="w-full bg-[#1F1F1F] border border-white/[0.07] rounded-lg px-4 py-3 text-sm font-sans text-[#F0EDE8] outline-none transition-colors focus:border-[#C8102E] resize-y placeholder:text-[#6B6560]"
            />
          </Card>

          <Button
            className="w-full py-4 text-base"
            onClick={analizar}
            disabled={estado === 'loading'}
          >
            {estado === 'loading'
              ? <><Loader2 size={18} className="animate-spin" /> Analizando...</>
              : <><Bot size={18} /> Analizar Contrato</>
            }
          </Button>
        </div>

        {/* Right */}
        <div className="space-y-5">
          <Card className="p-7 min-h-[340px]">
            <div className="text-sm font-semibold font-serif text-[#F0EDE8] mb-5">Análisis del Contrato</div>

            {estado === 'idle' && (
              <div className="text-center py-14 text-[#6B6560]">
                <Scale size={52} className="mx-auto mb-5 opacity-20" />
                <p className="text-sm">Sube tu contrato y presiona analizar.<br />La IA te explicará cada cláusula.</p>
              </div>
            )}

            {estado === 'loading' && (
              <div className="text-center py-14">
                <div className="w-10 h-10 border-2 border-[#2A2A2A] border-t-[#C8102E] rounded-full animate-spin mx-auto mb-5" />
                <p className="text-sm text-[#A09A93] font-medium">Analizando contrato...</p>
                <p className="text-xs text-[#6B6560] mt-2">{loadingSub}</p>
              </div>
            )}

            {estado === 'done' && (
              <div
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: '<p class="mb-4 text-[#A09A93] text-sm leading-relaxed">' + renderMarkdown(resultado) + '</p>',
                }}
              />
            )}

            {estado === 'error' && (
              <div className="flex gap-3 p-5 rounded-xl bg-red-950/20 border border-red-400/20 text-red-300 text-sm">
                <span>✕</span><span>{errorMsg}</span>
              </div>
            )}
          </Card>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-emerald-500">
            <div className="text-sm font-semibold text-[#F0EDE8] mb-3">Ejemplos de preguntas que puedes hacer</div>
            <ul className="space-y-2 text-sm text-[#A09A93] leading-relaxed">
              {[
                '"¿Mi jornada laboral es legal según el Código del Trabajo?"',
                '"¿Esta cláusula de exclusividad es válida?"',
                '"¿Tengo derecho a indemnización si me despiden?"',
                '"¿Qué significa esta cláusula sobre confidencialidad?"',
                '"¿Mi contrato a plazo fijo se puede renovar indefinidamente?"',
                '"¿Los descuentos que me hacen son legales?"',
              ].map(q => (
                <li key={q} className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">•</span>{q}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1F1F1F] rounded-xl p-6 border-l-[3px] border-[#C9922A]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">✅</span>
              <div className="text-sm font-semibold text-[#F0EDE8]">Completamente gratuito</div>
            </div>
            <p className="text-sm text-[#A09A93] leading-relaxed">
              No necesitas cuenta ni API Key. El análisis es <strong className="text-[#F0EDE8]">gratis para todos</strong> — solo sube tu contrato y presiona Analizar.
            </p>
          </div>
        </div>
      </div>

      {/* Load pdf.js */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" />
    </div>
  )
}
