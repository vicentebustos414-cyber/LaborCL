import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Formatters ──────────────────────────────────────────────────────────────
export const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')
export const fmtNum = (n: number) => n.toLocaleString('es-CL')

// ── Date diff ────────────────────────────────────────────────────────────────
// Parsea "YYYY-MM-DD" como fecha local evitando el bug de timezone donde
// new Date("2024-01-15") crea UTC midnight y en Chile retorna el día anterior.
function parseLocalDate(s: string) {
  const [y, mo, d] = s.split('-').map(Number)
  return new Date(y, mo - 1, d)
}

export function diffFechas(inicio: string, fin: string) {
  const d1 = parseLocalDate(inicio)
  const d2 = parseLocalDate(fin)
  let y = d2.getFullYear() - d1.getFullYear()
  let m = d2.getMonth() - d1.getMonth()
  let d = d2.getDate() - d1.getDate()
  if (d < 0) { m--; d += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate() }
  if (m < 0) { y--; m += 12 }
  const totalDias = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
  return { years: y, months: m, days: d, totalDias }
}

export const today = () => new Date().toISOString().split('T')[0]
