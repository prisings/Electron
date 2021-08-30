// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var $ = require("jquery");
const {ipcRenderer} = require('electron')


    var kakao 
    var itunes
    var android
    var account
 
    $(".copyPath").click(function(){
        kakao = $("input:checkbox[id='kakao']:checked").val();
        itunes = $("input:checkbox[id='itunes']:checked").val();
        android = $("input:checkbox[id='android']:checked").val();
        account = $("input:checkbox[id='account']:checked").val();
    })


document.getElementById("btnEd").addEventListener("click", copyTest);

function copyTest(){
    if(kakao != null){
        ipcRenderer.send('mkdir' , kakao)
    }
    if(itunes != null){
        ipcRenderer.send('mkdir' , itunes)
    }
    if(android != null){
        ipcRenderer.send('mkdir' , android)
    }
    if(account != null){
        ipcRenderer.send('mkdir' , account)
    }
}