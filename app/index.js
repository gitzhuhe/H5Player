/**
 * Created by Sing <78276478@qq.com> on 2018/1/2 0002.
 */
const {app, BrowserWindow, Menu, ipcMain, Tray} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
// let logo = path.join(__dirname, 'assets/img/logo.png');
let load = null;
let win = null;
let win_about = null;

let willClose = false;
function Loading(){
    load = new BrowserWindow({
        width: 418,
        // width: 1000,
        height: 101,
        // height: 700,
        title: 'Loading',
        // y:200,
        // x:20,
        frame:false,
        center: true,
        resizable: true,
        // icon: logo,
        titleBarStyle: 'hidden',
        transparent:true,
        alwaysOnTop:true
        //backgroundColor: '#2e2c29'
    });
    load.loadURL(url.format({
        pathname: path.join(__dirname, 'app/load.html'),
        protocol: 'file:',
        slashes: true
    }));
}
function createWindow() {
    win = new BrowserWindow({
        width: 1080,
        // width: 1000,
        height: 660,
        // height: 700,
        title: '十五云音乐',
        frame:false,
        // y:200,
        // x:20,
        center: true,
        resizable: false,
        // icon: logo,
        titleBarStyle: 'hidden',
        backgroundColor: '#2e2c29',
        show: false
    });

    //win.loadURL('http://10.255.255.1:8080');
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.once('ready-to-show', () => {
        setTimeout(()=>{
            //load.destroy();
            //win.maximize();
            win.show()
        },300)
    })
    // 打开开发者工具。
    //win.webContents.openDevTools();

    // 当 window 被关闭，这个事件会被触发。
    win.on('close', (event) => {
        if (process.platform !== 'win32' && !willClose) {
            win.hide();
            event.preventDefault();
        }
    });
    win.on('closed', () => {
        win = null;
    });
}

function createMenu() {
    const template = [
        {
            label: '退出',
            role:'quit'
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

let tray = null
app.on('ready', () => {
    // let _path = path.join(__dirname, './conf/lang.json');
    // let data = fs.readFileSync(_path);
    // let language = data?JSON.parse(data):{ lang: 'zh', message: 'EN' };
    //Loading();
    createWindow();
    tray = new Tray(path.join(__dirname, 'music_player.ico'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出',
        type: 'normal',
        click:function(){
          win.destroy();
          app.quit();
        }
      }
    ])
    tray.setToolTip('十五阿达云音乐.')
    tray.setContextMenu(contextMenu)
    tray.on('click',function(event, bounds){
      console.log('show Player')
      win.show();
    });
    //createMenu();
});

app.on('activate', () => {
    if (win == null) {
        createWindow();
    } else {
        win.show();
    }
});

app.on('before-quit', function () {
    willClose = true;
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('quite', (event, arg) => {
  win.destroy();
  app.quit();
})
ipcMain.on('hide', (event, arg) => {
  win.hide();
})

