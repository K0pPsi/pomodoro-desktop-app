const { contextBridge, ipcRenderer } = require("electron");

/*Security bridge for communication between the renderer
 process and the main process. */
contextBridge.exposeInMainWorld("myAPI", {
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
});
