const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

//create the default Window
const createWindow = () => {
  win = new BrowserWindow({
    width: 500,
    height: 500,
    icon: path.join(__dirname, "/assets/icon/alarm.png"),
    //add the preload script
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

//create menu
const template = [
  {
    label: "Datei",
    submenu: [
      { type: "separator" },
      {
        label: "Beenden",
        click: () => {
          app.quit();
        },
      },
    ],
  },
];

//set menu
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("minimize-window", () => {
    const win = BrowserWindow.getAllWindows();
    win[0].minimize();
  });
});
