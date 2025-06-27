const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/assets/icons/icon.ico' // o .ico en Windows
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})