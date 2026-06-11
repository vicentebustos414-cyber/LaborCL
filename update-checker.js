// update-checker.js — Sistema de auto-actualización para LaborCL
// Funciona tanto en Electron (portable .exe) como en la web/APK (PWA).
//
// Estrategia:
//   1. Al iniciar, consulta un JSON remoto con la última versión.
//   2. Compara con la versión local (version.json empaquetado).
//   3. Si hay actualización → notifica al usuario con un link de descarga.
//
// Para que funcione, publica "update-remote.json" en un hosting estático:
//   GitHub Pages, Netlify, S3, etc.
//   URL configurable abajo.

const https = require('https');
const { app, dialog, shell, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

// ══════════════════════════════════════
// CONFIGURA ESTA URL con tu hosting real
// ══════════════════════════════════════
const UPDATE_URL = 'https://raw.githubusercontent.com/laborcl/laborcl-app/main/update-remote.json';

// Estructura esperada de update-remote.json:
// {
//   "version": "1.1.0",
//   "releaseDate": "2026-06-15",
//   "notes": "Nuevas calculadoras...",
//   "downloads": {
//     "exe": "https://github.com/laborcl/laborcl-app/releases/download/v1.1.0/LaborCL-Portable-1.1.0.exe",
//     "apk": "https://github.com/laborcl/laborcl-app/releases/download/v1.1.0/LaborCL-1.1.0.apk",
//     "web": "https://laborcl.github.io"
//   }
// }

function getLocalVersion() {
  try {
    // En modo empaquetado, buscar en resources
    const paths = [
      path.join(process.resourcesPath || '', 'version.json'),
      path.join(__dirname, 'version.json'),
      path.join(app.getAppPath(), 'version.json')
    ];
    for (const p of paths) {
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, 'utf-8'));
      }
    }
  } catch (e) {
    console.error('Error leyendo version.json local:', e.message);
  }
  return { version: '0.0.0' };
}

function fetchRemoteVersion() {
  return new Promise((resolve, reject) => {
    https.get(UPDATE_URL, { timeout: 10000 }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        res.resume();
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function compareVersions(local, remote) {
  const toNum = v => v.split('.').map(Number);
  const l = toNum(local);
  const r = toNum(remote);
  for (let i = 0; i < 3; i++) {
    if ((r[i] || 0) > (l[i] || 0)) return true;  // remote is newer
    if ((r[i] || 0) < (l[i] || 0)) return false;
  }
  return false; // same version
}

async function checkForUpdates(silent = false) {
  try {
    const local = getLocalVersion();
    const remote = await fetchRemoteVersion();

    if (compareVersions(local.version, remote.version)) {
      const mainWin = BrowserWindow.getAllWindows()[0];
      const result = await dialog.showMessageBox(mainWin, {
        type: 'info',
        title: '🔄 Actualización Disponible',
        message: `LaborCL ${remote.version} disponible`,
        detail: [
          `Tu versión: ${local.version}`,
          `Nueva versión: ${remote.version}`,
          `Fecha: ${remote.releaseDate || 'N/A'}`,
          '',
          remote.notes || '',
          '',
          '¿Deseas descargar la actualización?'
        ].join('\n'),
        buttons: ['Descargar ahora', 'Más tarde'],
        defaultId: 0,
        cancelId: 1
      });

      if (result.response === 0) {
        const downloadUrl = remote.downloads?.exe || `https://github.com/laborcl/laborcl-app/releases/latest`;
        shell.openExternal(downloadUrl);
      }

      return { hasUpdate: true, remote };
    } else {
      if (!silent) {
        const mainWin = BrowserWindow.getAllWindows()[0];
        dialog.showMessageBox(mainWin, {
          type: 'info',
          title: 'Sin actualizaciones',
          message: `Estás al día — LaborCL v${local.version}`,
          buttons: ['OK']
        });
      }
      return { hasUpdate: false };
    }
  } catch (err) {
    console.log('Auto-update check failed (offline?):', err.message);
    if (!silent) {
      const mainWin = BrowserWindow.getAllWindows()[0];
      dialog.showMessageBox(mainWin, {
        type: 'warning',
        title: 'Error de actualización',
        message: 'No se pudo verificar actualizaciones',
        detail: 'Revisa tu conexión a internet e intenta de nuevo.\n\n' + err.message,
        buttons: ['OK']
      });
    }
    return { hasUpdate: false, error: err.message };
  }
}

module.exports = { checkForUpdates, getLocalVersion };
