const { app, BrowserWindow, dialog, ipcMain } = require('electron');

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
    // win.webContents.openDevTools();

    ipcMain.on('getDownloadFilePath', async (event, data) => {
        win.webContents.send("sendDownloadFilePath", {
            fileName: data.fileName,
            filePath: (await dialog.showSaveDialog({ defaultPath: data.fileName })).filePath
        });
    });
}


app.whenReady().then(createWindow);