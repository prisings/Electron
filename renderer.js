// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
document.getElementById("btnEd").addEventListener("click", copyTest);

function copyTest(){
    const {ipcRenderer} = require('electron')
    console.log('실행테스트')
    ipcRenderer.send('mkdir' , 'mkdir')
}