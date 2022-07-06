// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const os = require('os')

function createStickerWindow() {
  // Create the browser window.
  const stickerWindow = new BrowserWindow({
    width: 150,
    height: 150,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false,
    titleBarStyle: "hidden",
    resizable: false,
    useContentSize: true,
    roundedCorners: false,
  })
  stickerWindow.setAlwaysOnTop(true, 'screen')
  stickerWindow.minimize()
  if (os.type() == 'Darwin') stickerWindow.setWindowButtonVisibility(true)
  // and load the index.html of the app.
  stickerWindow.loadFile('sticker/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  return stickerWindow
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    title: "H4Pay POS"
  })
  
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  return mainWindow
}

function setEvents(stickerWindow, mainWindow) {
  ipcMain.on('open-main', () => {
    stickerWindow.minimize()
    mainWindow.restore()
  })
  mainWindow.on("minimize", (param) => {
    stickerWindow.restore()
  })
  mainWindow.on("close", () => {
    app.quit()
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const stickerWindow = createStickerWindow()
  const mainWindow = createWindow()
  setEvents(stickerWindow, mainWindow)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      const stickerWindow = createStickerWindow()
      const mainWindow = createWindow()
      setEvents(stickerWindow, mainWindow)

    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
