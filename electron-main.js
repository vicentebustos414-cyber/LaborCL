// LaborCL — Electron main process (portable .exe con auto-update)
const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { checkForUpdates, getLocalVersion } = require('./update-checker');

let mainWindow;
const localVer = getLocalVersion();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 800,
    minHeight: 600,
    title: `LaborCL v${localVer.version} — Derecho Laboral Chileno`,
    backgroundColor: '#0D0D0D',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'icons', 'icon.ico'),
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, 'dist-react', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Links externos → navegador del sistema
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

// Menú con opción de actualización
const menuTemplate = [
  {
    label: 'Archivo',
    submenu: [
      { label: 'Recargar', accelerator: 'F5', click: () => mainWindow?.reload() },
      { type: 'separator' },
      { label: 'Salir', accelerator: 'Alt+F4', click: () => app.quit() }
    ]
  },
  {
    label: 'Ver',
    submenu: [
      { label: 'Ampliar', accelerator: 'CmdOrCtrl+=', click: () => mainWindow?.webContents.zoomIn() },
      { label: 'Reducir', accelerator: 'CmdOrCtrl+-', click: () => mainWindow?.webContents.zoomOut() },
      { label: 'Restablecer zoom', accelerator: 'CmdOrCtrl+0', click: () => mainWindow?.webContents.setZoomLevel(0) },
      { type: 'separator' },
      { label: 'Pantalla completa', accelerator: 'F11', click: () => mainWindow?.setFullScreen(!mainWindow.isFullScreen()) }
    ]
  },
  {
    label: 'Ayuda',
    submenu: [
      { label: '🔄 Buscar actualizaciones...', click: () => checkForUpdates(false) },
      { type: 'separator' },
      { label: 'Código del Trabajo (web)', click: () => shell.openExternal('https://www.dt.gob.cl/portal/1626/w3-channel.html') },
      { label: 'Dirección del Trabajo', click: () => shell.openExternal('https://www.dt.gob.cl') },
      { type: 'separator' },
      { label: 'Acerca de LaborCL', click: () => {
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'Acerca de LaborCL',
          message: `LaborCL v${localVer.version}`,
          detail: [
            'Calculadoras y guías de Derecho Laboral Chileno.',
            '',
            'Basado en el Código del Trabajo (DFL N°1).',
            `Versión: ${localVer.version} — ${localVer.releaseDate || 'N/A'}`,
            '',
            'Solo referencia informativa — no reemplaza asesoría legal.'
          ].join('\n'),
          buttons: ['Cerrar']
        });
      }}
    ]
  }
];

app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  createWindow();

  // Auto-check silencioso al iniciar (después de 5 segundos)
  setTimeout(() => {
    checkForUpdates(true).then(result => {
      if (result.hasUpdate) {
        console.log(`Actualización disponible: v${result.remote.version}`);
      }
    });
  }, 5000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
