// Genera íconos PNG para la app usando Canvas nativo (Node 24+)
// Ejecutar: node generate-icons.js

const { createCanvas } = (() => {
  try { return require('canvas'); } catch {
    console.log('Generando ícono SVG placeholder...');
    return null;
  }
})() || {};

const fs = require('fs');
const path = require('path');

// SVG icon que se puede convertir después
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0D0D0D"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="80" fill="url(#bg)"/>
  <text x="256" y="200" text-anchor="middle" fill="#C8102E" font-family="Georgia,serif" font-size="160" font-weight="bold">L</text>
  <text x="256" y="340" text-anchor="middle" fill="#F0EDE8" font-family="Arial,sans-serif" font-size="72" font-weight="600">CL</text>
  <rect x="100" y="370" width="312" height="3" rx="1.5" fill="#C8102E" opacity="0.6"/>
  <text x="256" y="420" text-anchor="middle" fill="#A09A93" font-family="Arial,sans-serif" font-size="32">Derecho Laboral</text>
</svg>`;

const iconsDir = path.join(__dirname, 'icons');

// Guardar SVG
fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svgIcon);
console.log('✅ icons/icon.svg creado');

// Para Electron en Windows necesitamos .ico
// Creamos un .ico minimal de 256x256 (BMP-based ICO)
// Por ahora usamos el SVG y un placeholder PNG

// Crear un PNG simple usando raw bytes (1x1 pixel rojo como placeholder)
// El usuario puede reemplazar estos con íconos reales después
function createMinimalPng(size) {
  // Generamos un HTML que se puede abrir en el navegador para capturar
  return null; // Placeholder
}

// Instrucciones para el usuario
const instructions = `
╔══════════════════════════════════════════════╗
║  ÍCONOS GENERADOS                            ║
╠══════════════════════════════════════════════╣
║                                              ║
║  ✅ icons/icon.svg creado                    ║
║                                              ║
║  Para convertir a los formatos necesarios:   ║
║                                              ║
║  Opción 1 (Online - Recomendado):            ║
║  → Abre https://icoconvert.com              ║
║  → Sube el SVG y descarga como .ico          ║
║  → Renombra a icon.ico en /icons             ║
║                                              ║
║  Opción 2 (npm):                             ║
║  → npm install -g png-to-ico                 ║
║  → Convierte SVG→PNG con cualquier editor    ║
║  → png-to-ico icon.png > icon.ico            ║
║                                              ║
║  Electron Builder puede usar .png directo    ║
║  si no hay .ico disponible.                  ║
║                                              ║
╚══════════════════════════════════════════════╝
`;
console.log(instructions);
