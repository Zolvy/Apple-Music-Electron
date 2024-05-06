/* eslint-disable @typescript-eslint/no-unused-vars */
import { app, BrowserWindow, dialog, session, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import './proxy.js';
import './utils/rpc.js';

const platform = process.platform || os.platform();
const currentDir = fileURLToPath(new URL('.', import.meta.url));

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // Options common to all platforms
  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    icon: path.resolve(currentDir, 'icons/icon.png'),
    width: 1244,
    height: 600,
    frame: true,
    x: undefined,
    y: undefined,
    minWidth: 900,
    minHeight: 390,
    title: 'Apple Music Electron',
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      experimentalFeatures: true,
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
          'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ),
    },
  };

  // macOS-specific options
  if (platform === 'darwin') {
    windowOptions.titleBarStyle = 'hidden';
    windowOptions.trafficLightPosition = { x: 15, y: 13 };
  }

  mainWindow = new BrowserWindow(windowOptions);

  if (process.env.DEV) {
    mainWindow.loadURL(process.env.APP_URL);
  } else {
    mainWindow.loadFile('index.html');
  }

  if (!process.env.DEBUGGING) {
    mainWindow.webContents.on('devtools-opened', () => {});
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createLoginWindow() {
  let loginWindow: BrowserWindow | null = new BrowserWindow({
    width: 500,
    height: 700,
    titleBarOverlay: true,
    resizable: false,
    fullscreen: false,
    webPreferences: {
      experimentalFeatures: true,
    },
  });

  loginWindow.loadURL('https://music.apple.com/login');

  loginWindow.webContents.on('did-finish-load', async () => {
    const cookies = await session.defaultSession.cookies.get({
      url: 'https://music.apple.com',
    });
    console.log('Cookies:', cookies);
    storeCookiesSeparately(cookies);
    storeCookieProperties(cookies);
  });

  const urlCheckInterval = setInterval(async () => {
    if (loginWindow) {
      const url = loginWindow.webContents.getURL();
      console.log('Checking URL:', url);
      if (url.startsWith('https://music.apple.com/browse')) {
        console.log('Matched URL:', url);
        clearInterval(urlCheckInterval);
        if (loginWindow) {
          dialog
            .showMessageBox(loginWindow, {
              type: 'info',
              title: 'Login Complete',
              message:
                'You have reached the browsing page. You may now close this window.',
              buttons: ['Close Window'],
            })
            .then((result) => {
              if (result.response === 0 && loginWindow) {
                loginWindow.close();
              }
            });
        }
      }
    } else {
      clearInterval(urlCheckInterval);
    }
  }, 1000);

  loginWindow.on('closed', () => {
    clearInterval(urlCheckInterval);
    loginWindow = null;
  });
}

function storeCookiesSeparately(cookies: Electron.Cookie[]) {
  cookies.forEach((cookie) => {
    const cookieKey = `${cookie.name}`;
    const cookieValue = cookie.value;
    mainWindow?.webContents.executeJavaScript(
      `localStorage.setItem('${cookieKey}', '${cookieValue}')`,
    );
  });
}

function storeCookieProperties(cookies: Electron.Cookie[]) {
  const cookiesData = cookies.reduce((acc) => {
    return acc;
  }, {});

  const serializedCookiesData = JSON.stringify(cookiesData);
  mainWindow?.webContents.executeJavaScript(
    `localStorage.setItem('cookie-data', '${serializedCookiesData}')`,
  );
}

ipcMain.on('open-login-window', () => {
  createLoginWindow();
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
