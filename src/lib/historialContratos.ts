export interface EntradaHistorial {
  id: string
  nombre: string
  fecha: string   // ISO string
  pregunta: string
  resultado: string
}

const KEY = 'laborcl_historial_contratos'

export function getHistorial(): EntradaHistorial[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function guardarAnalisis(nombre: string, pregunta: string, resultado: string): EntradaHistorial {
  const entrada: EntradaHistorial = {
    id: Date.now().toString(),
    nombre,
    fecha: new Date().toISOString(),
    pregunta,
    resultado,
  }
  const historial = getHistorial()
  historial.unshift(entrada)
  // Guardar máx 50 entradas
  localStorage.setItem(KEY, JSON.stringify(historial.slice(0, 50)))
  return entrada
}

export function eliminarAnalisis(id: string): void {
  const historial = getHistorial().filter(e => e.id !== id)
  localStorage.setItem(KEY, JSON.stringify(historial))
}

export function formatearFecha(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('es-CL', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
