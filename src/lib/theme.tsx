import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type Theme = 'dark' | 'light'
type ThemeCtx = { theme: Theme; toggle: () => void }

const Ctx = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} })

// CSS injected at runtime — bypasses Lightning CSS optimizer
const LIGHT_CSS = `
  html.light [class*="bg-"][class*="0D0D0D"] { background-color: #F2F0EB !important; }
  html.light [class*="bg-"][class*="161616"]  { background-color: #FFFFFF !important; }
  html.light [class*="bg-"][class*="1F1F1F"]  { background-color: #EDEAE4 !important; }
  html.light [class*="bg-"][class*="2A2A2A"]  { background-color: #DDD9D2 !important; }
  html.light [class*="text-"][class*="F0EDE8"] { color: #1A1714 !important; }
  html.light [class*="text-"][class*="A09A93"] { color: #4A4540 !important; }
  html.light [class*="text-"][class*="6B6560"] { color: #7A7570 !important; }
  html.light [class*="border-white"] { border-color: rgba(0,0,0,0.09) !important; }
  html.light .rounded-lg[class*="161616"] { background-color: #F5F2EC !important; }
`

function injectLightCSS() {
  if (document.getElementById('lm-overrides')) return
  const s = document.createElement('style')
  s.id = 'lm-overrides'
  s.textContent = LIGHT_CSS
  document.head.appendChild(s)
}

function removeLightCSS() {
  document.getElementById('lm-overrides')?.remove()
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('laborcl_theme') as Theme) || 'dark'
  )

  useEffect(() => {
    const html = document.documentElement
    if (theme === 'light') {
      html.classList.add('light')
      html.classList.remove('dark')
      injectLightCSS()
    } else {
      html.classList.add('dark')
      html.classList.remove('light')
      removeLightCSS()
    }
    localStorage.setItem('laborcl_theme', theme)
  }, [theme])

  return (
    <Ctx.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)
