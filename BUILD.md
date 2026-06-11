# LaborCL — Instrucciones de Compilación

## Estructura del Proyecto
```
LaborCL/
├── index.html          ← App principal (PWA + web)
├── manifest.json       ← Configuración PWA
├── electron-main.js    ← Entry point para .exe
├── package.json        ← Config Electron Builder
├── capacitor.config.json ← Config para .apk Android
└── icons/              ← Íconos (crear esta carpeta)
    ├── icon.ico        ← Windows (.exe)
    ├── icon.icns       ← macOS
    ├── icon.png        ← Linux / Android
    ├── icon-192.png    ← PWA
    └── icon-512.png    ← PWA
```

---

## 1. Compilar .EXE (Windows) con Electron

### Requisitos
- Node.js 18+
- Windows 10/11

### Pasos
```powershell
cd LaborCL
npm install
npm run build-win
```
El instalador `.exe` se genera en `dist-electron/`.

---

## 2. Compilar .APK (Android) con Capacitor

### Requisitos
- Node.js 18+
- Android Studio instalado
- Java JDK 17+

### Pasos
```bash
# Instalar Capacitor CLI
npm install @capacitor/core @capacitor/cli @capacitor/android

# Inicializar y agregar plataforma Android
npx cap init LaborCL cl.laborcl.app --web-dir .
npx cap add android

# Sincronizar archivos web
npx cap sync android

# Abrir en Android Studio para firmar y exportar APK
npx cap open android
```
En Android Studio: **Build → Generate Signed Bundle/APK → APK**

---

## 3. Usar como PWA (web / instalar desde Chrome)

Sirve `index.html` desde cualquier servidor HTTPS:

```bash
# Opción rápida con Python
python -m http.server 8080
# Luego abre http://localhost:8080 en Chrome
# Chrome mostrará botón "Instalar app"
```

O despliega en **GitHub Pages**, **Netlify**, **Vercel** (gratis).

---

## Módulos incluidos

| Módulo | Descripción | Artículo CT |
|--------|-------------|-------------|
| Años de Servicio | Calcula antigüedad exacta | Art. 163 |
| Vacaciones | Días legales + feriado progresivo | Art. 67-68 |
| Finiquito | Desglose completo | Art. 159-163 |
| Aviso Previo | Indemnización sustitutiva | Art. 161 |
| Indemnización | Por años de servicio con topes | Art. 163, 172 |
| AFP & Salud | Comparativa AFP + descuentos | DL 3.500 |
| Accidente Laboral | Ley 16.744 completa | Ley 16.744 |
| Seguro Cesantía | Ley 19.728 | Ley 19.728 |
| Contratos | Tipos y menciones obligatorias | Art. 7-11 |
| Despidos | Causales 159, 160, 161 | Art. 159-162 |
| Derechos y Obligaciones | Trabajador y empleador | Art. 2, 184 |
| Condiciones Laborales | Jornada, horas extra, maternidad | Art. 22-40 |
| Materiales de Trabajo | Obligación empleador | Art. 184 |
