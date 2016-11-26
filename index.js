var express = require('express');
var app = express();
var mysql = require('mysql');

// prepare server
//app.use('/api', api); // redirect API calls
app.use('/', express.static(__dirname)); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// 그럼 지금 __dirname: ElectronTry/app 인가? => 위치이동한 현재는 Electron/ 이상태여야한다 그럼

// Add the credentials to access my database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'ElectronTestDB'
});

// connect to mysql
connection.connect(function(err) {
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

// Perform a query
$query = 'SELECT * FROM ElectronTestTable';

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    console.log("Query succesfully executed", rows[0].id);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});
