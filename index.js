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
    console.log("SELECT QUERY SUCCEEDED");

    // 받아온 results array로 div button 그려주자
    // Row 0: 0123 4567
    // Row 1: 891011 12131415
    // col-xs-6 div의 인덱스는 각 버튼의 인덱스를 4로나눈 몫과 같다.

    var containerDIV = document.getElementsByClassName('container');

    for (var i = 0; i < results.length; i++) {
        if(i%8 == 0) {
            var rowDIV = document.createElement('div');
            rowDIV.setAttribute('class', 'row');
            containerDIV[0].appendChild(rowDIV);
        }
        if(i%4 == 0) {
            var halfColDIV = document.createElement('div');
            halfColDIV.setAttribute('class', 'col-xs-6');
            document.getElementsByClassName('row')[Math.floor(i/8)].appendChild(halfColDIV);
        }
        var button = document.createElement('button');
        button.setAttribute('class', 'btn btn-default');
        button.setAttribute('type', 'button');
        // button.innerHTML = results[i];
        button.innerHTML = "좌석 " + (i+1);
        var whichGrid = Math.floor(i / 4) % 2;
        document.getElementsByClassName('col-xs-6')[Math.floor(i/4)].appendChild(button);
    }
});


function updateTheSeat() {
    var theTag = event.srcElement;
    var seatID = theTag.dataset.seatid;
    var occupied = theTag.dataset.occupied;

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
