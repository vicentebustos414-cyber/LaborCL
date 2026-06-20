import { useState, useRef } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Loader2, FileText, Copy, Check } from 'lucide-react'
type Estado = 'idle' | 'loading' | 'done' | 'error'

// Ambas librerías se cargan desde CDN para evitar problemas de bundling con workers
declare global {
  interface Window {
    Tesseract?: { recognize(src: unknown, lang: string, opts?: unknown): Promise<{ data: { text: string } }> }
    pdfjsLib?: {
      version: string
      GlobalWorkerOptions: { workerSrc: string }
      getDocument(src: unknown): { promise: Promise<{ numPages: number; getPage(n: number): Promise<unknown> }> }
    }
  }
}

async function cargarTesseract() {
  if (window.Tesseract) return window.Tesseract
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
    s.onload = () => resolve(); s.onerror = reject
    document.head.appendChild(s)
  })
  return window.Tesseract!
}

async function cargarPdfjs() {
  if (window.pdfjsLib) return window.pdfjsLib
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    s.onload = () => resolve(); s.onerror = reject
    document.head.appendChild(s)
  })
  window.pdfjsLib!.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
  return window.pdfjsLib!
}

export function PageOCR() {
  const [file, setFile] = useState<File | null>(null)
  const [estado, setEstado] = useState<Estado>('idle')
  const [loadingSub, setLoadingSub] = useState('')
  const [textoExtraido, setTextoExtraido] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [copiado, setCopiado] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const clearFile = () => setFile(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f && (f.type.startsWith('image/') || f.type === 'application/pdf')) {
      setFile(f)
      setErrorMsg('')
    } else {
      setErrorMsg('Solo se aceptan imágenes (JPG, PNG) y PDFs')
    }
  }

  const extraerDelPDF = async (file: File): Promise<string> => {
    const [Tesseract, pdfjs] = await Promise.all([cargarTesseract(), cargarPdfjs()])
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
    let texto = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      setLoadingSub(`Procesando página ${i}/${pdf.numPages}...`)
      const page = await (pdf as unknown as { getPage(n: number): Promise<{
        getViewport(o: { scale: number }): { width: number; height: number }
        render(o: unknown): { promise: Promise<void> }
      }> }).getPage(i)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const viewport = page.getViewport({ scale: 2 })
      canvas.width = viewport.width
      canvas.height = viewport.height
      await page.render({ canvasContext: ctx, viewport }).promise
      const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'))
      const result = await Tesseract.recognize(blob, 'spa')
      texto += result.data.text + '\n\n'
    }
    return texto
  }

  const extraerDelImagen = async (file: File): Promise<string> => {
    const Tesseract = await cargarTesseract()
    setLoadingSub('Extrayendo texto de imagen...')
    const result = await Tesseract.recognize(file, 'spa')
    return result.data.text
  }

  const procesarArchivo = async () => {
    if (!file) return
    setEstado('loading')
    setTextoExtraido('')
    setErrorMsg('')

    try {
      let texto = ''
      if (file.type === 'application/pdf') {
        texto = await extraerDelPDF(file)
      } else if (file.type.startsWith('image/')) {
        texto = await extraerDelImagen(file)
      }

      setTextoExtraido(texto)
      setEstado('done')
    } catch (e) {
      setErrorMsg(`Error: ${(e as Error).message}`)
      setEstado('error')
    } finally {
      setLoadingSub('')
    }
  }

  const copiarTexto = () => {
    navigator.clipboard.writeText(textoExtraido)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#F0EDE8] p-4 md:p-8">
      <PageHeader
        title="Extractor OCR"
        subtitle="Extrae texto de imágenes y PDFs con IA"
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Upload Zone */}
        <Card className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border border-[#C9922A]/20 p-8">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-[#C9922A]/40 rounded-lg p-8 text-center cursor-pointer hover:border-[#C9922A]/60 transition"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-[#C9922A]" />
            <p className="text-lg font-semibold mb-2">Sube tu archivo</p>
            <p className="text-sm text-[#A09A93]">
              Arrastra una imagen o PDF aquí, o haz clic para seleccionar
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) setFile(f)
              }}
              className="hidden"
            />
          </div>

          {file && (
            <div className="mt-6 flex items-center justify-between p-4 bg-[#2d2d2d] rounded-lg border border-[#C9922A]/20">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#C9922A]" />
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-xs text-[#A09A93]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                onClick={clearFile}
                variant="outline"
                size="sm"
                className="text-red-400 border-red-400/30 hover:bg-red-400/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>

        {/* Process Button */}
        {file && (
          <Button
            onClick={procesarArchivo}
            disabled={estado === 'loading'}
            className="w-full bg-[#C9922A] hover:bg-[#D4A13B] text-black font-semibold h-12"
          >
            {estado === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Procesando...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Extraer Texto OCR
              </>
            )}
          </Button>
        )}

        {/* Loading Sub */}
        {loadingSub && (
          <Card className="bg-[#2d2d2d] border border-[#C9922A]/20 p-4">
            <p className="text-sm text-[#A09A93]">{loadingSub}</p>
          </Card>
        )}

        {/* Error */}
        {errorMsg && (
          <Card className="bg-red-950/20 border border-red-400/30 p-4">
            <p className="text-red-200">{errorMsg}</p>
          </Card>
        )}

        {/* Result */}
        {estado === 'done' && textoExtraido && (
          <Card className="bg-[#2d2d2d] border border-[#C9922A]/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                ✓ Texto extraído
              </Badge>
              <Button
                onClick={copiarTexto}
                variant="outline"
                size="sm"
                className="border-[#C9922A]/30 text-[#C9922A]"
              >
                {copiado ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </>
                )}
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto bg-[#1a1a1a] p-4 rounded border border-[#C9922A]/10">
              <p className="whitespace-pre-wrap text-[#A09A93] text-sm leading-relaxed">
                {textoExtraido}
              </p>
            </div>

            <div className="text-xs text-[#A09A93] space-y-1">
              <p>📊 {textoExtraido.split('\n').length} líneas</p>
              <p>📝 {textoExtraido.length} caracteres</p>
            </div>

            <Button
              onClick={clearFile}
              variant="outline"
              className="w-full border-[#C9922A]/30 text-[#C9922A]"
            >
              Procesar otro archivo
            </Button>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-[#2d2d2d]/50 border border-[#C9922A]/10 p-4">
          <p className="text-xs text-[#A09A93] space-y-2">
            <span className="block">✨ Usa Tesseract.js (OCR de código abierto)</span>
            <span className="block">📄 Soporta: PNG, JPG, GIF, BMP, PDF</span>
            <span className="block">🌐 Procesa localmente en tu navegador</span>
          </p>
        </Card>
      </div>
    </div>
  )
}
