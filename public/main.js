const { app, BrowserWindow } = require('electron');
const electronRemote = require('@electron/remote/main');
electronRemote.initialize();

function createWindow() {
	//create browser window;
	let win = new BrowserWindow({
		height: 500,
		width: 300,
		resizable: false,
		webPreferences: {
			webSecurity: false,
		},
	});
	electronRemote.enable(win.webContents);
	win.loadURL('http://localhost:3000');
	win.on('closed', function () {
		win = null;
	});
}
app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});