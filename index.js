var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'ElectronTestDB'
});

connection.connect(function(err) {
    if(err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

connection.query('SELECT * FROM ElectronTestTable', function(err, results) {
    if(err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    //document.getElementsByTagName("h1")[0].innerHTML = rows[0].id;
    console.log("SELECT QUERY SUCCEEDED");
});

function updateTheSeat() {
    var theTag = event.srcElement;
    var seatID = theTag.dataset.seatid;
    var occupied = theTag.dataset.occupied;
    console.log(theTag);
    console.log(seatID);
    console.log(occupied);

    $query = 'UPDATE ElectronTestTable SET occupied = ' + connection.escape(occupied == 0 ? 1 : 0) + ' WHERE id = ' + connection.escape(seatID);
    connection.query($query, function(err, results) {
        if(err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        console.log("UPDATE QUERY SUCCEDED");
        theTag.setAttribute("data-occupied", occupied == 0 ? 1 : 0);
    });
}

// connection.end(function(){
//     // The connection has been closed
// });
