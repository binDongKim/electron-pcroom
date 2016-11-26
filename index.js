var express = require('express');
var app = express();

// prepare server
app.use('/api', api); // redirect API calls
app.use('/', express.static(__dirname)); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// 그럼 지금 __dirname: ElectronTry/app 인가? => 위치이동한 현재는 Electron/ 이상태여야한다 그럼
