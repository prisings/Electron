// Modules to control application life and create native browser window
const {app, BrowserWindow , ipcMain} = require('electron')
const path = require('path')
var fs = require('fs');
var fse = require('fs-extra');
var empty =  require('is-empty');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.on('mkdir', (event,path) => {
    var sourceDir = path
    var dirName = path.substring(path.lastIndexOf("\\"));
    var destDir = 'D:\\Jeong\\TestCopy' + dirName;
    // if folder doesn't exists create it
    //폴더 내부에 파일 List 넣기
    var sourceFileList = fs.readdirSync(sourceDir)
    /* var destFileList */

    //List 가 비어있으면 미실행
    if(!empty(sourceFileList)){
      if (!fs.existsSync(destDir)){
        fs.mkdirSync(destDir, { recursive: true });
      }
      //copy directory content including subfolders
      fse.copy(sourceDir, destDir, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log("success!");
          event.sender.send('mkdir','mkdir')
        }
      });  
    }else{
      console.log("No File")
    }
      
      
})
/* app.post('/mkdir',function(){
   res.redirect("/");
}) */
//IPC 통신 학습 준비


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
