const express = require('express')
const path = require('path')
const app = express()

app.use(express.json({ limit: '2mb' }))
app.use(express.static(path.join(__dirname)))

// Rate limiting simple por IP
const hits = {}
function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const now = Date.now()
  if (!hits[ip]) hits[ip] = []
  hits[ip] = hits[ip].filter(t => now - t < 60 * 60 * 1000) // última hora
  if (hits[ip].length >= 10) {
    return res.status(429).json({ error: 'Límite de 10 análisis por hora alcanzado. Inténtalo más tarde.' })
  }
  hits[ip].push(now)
  next()
}

app.post('/api/analizar', rateLimit, async (req, res) => {
  const { texto, pregunta } = req.body
  const key = process.env.GROQ_API_KEY
  if (!key) return res.status(500).json({ error: 'Servicio no configurado.' })
  if (!texto && !req.body.imagen) return res.status(400).json({ error: 'Falta el contenido del contrato.' })

  const mensajeUsuario = pregunta
    ? `${texto}\n\nPregunta específica: ${pregunta}`
    : texto

  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 2048,
        messages: [
          {
            role: 'system',
            content: `Eres un experto en Derecho Laboral Chileno. Analiza el contrato de trabajo proporcionado y explícalo en lenguaje simple para trabajadores chilenos. Para cada cláusula importante: explica qué significa en términos cotidianos, indica si es legal según el Código del Trabajo (DFL N°1), señala el artículo relevante si aplica, y advierte si hay algo sospechoso o potencialmente ilegal. Responde en español, con un tono cercano y educativo. Usa encabezados para organizar tu análisis. Si hay una pregunta específica del trabajador, respóndela al inicio con énfasis.`
          },
          {
            role: 'user',
            content: mensajeUsuario
          }
        ]
      })
    })

    if (!resp.ok) {
      const err = await resp.json()
      return res.status(resp.status).json({ error: err.error?.message || 'Error al consultar IA.' })
    }

    const data = await resp.json()
    res.json({ resultado: data.choices[0].message.content })
  } catch (e) {
    res.status(500).json({ error: 'Error interno del servidor.' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`LaborCL server en puerto ${PORT}`))
