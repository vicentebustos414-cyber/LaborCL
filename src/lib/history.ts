export type CalcEntry = {
  id: string
  tipo: string
  fecha: string
  resumen: string
  detalle: Record<string, string>
}

const KEY = 'laborcl_history'
const MAX = 5

export function saveCalc(entry: Omit<CalcEntry, 'id' | 'fecha'>) {
  const hist = getHistory()
  const nuevo: CalcEntry = {
    ...entry,
    id: Date.now().toString(),
    fecha: new Date().toLocaleDateString('es-CL'),
  }
  localStorage.setItem(KEY, JSON.stringify([nuevo, ...hist].slice(0, MAX)))
}

export function getHistory(): CalcEntry[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function clearHistory() {
  localStorage.removeItem(KEY)
}
