/*
  특정 pc방(ex. 제논)의 좌석리스트를 받아오는 부분
*/
function showSeats() {
  document.getElementById('seatTrigger').remove();

  var req = new XMLHttpRequest();
  var url = "http://pcbanghelp.dothome.co.kr/seat.php";
  var params = "name=제논";
  req.open("POST", url, true);

  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.onreadystatechange = function() {
      if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
          var data = JSON.parse(req.response);
          // 받아온 data에서 사용할 property는 empty, id(seatid)

          // 받아온 data(Object) array로 div button 그려주자
          // Row 0: 0123 4567
          // Row 1: 891011 12131415
          // col-xs-6 div의 인덱스는 각 버튼의 인덱스를 4로나눈 몫과 같다.

          var containerDIV = document.getElementsByClassName('container');
          var pcroomName = document.createElement('h1');
          pcroomName.innerHTML ='제논 PC방';
          containerDIV[0].appendChild(pcroomName);

          for (var i = 0; i < data.length; i++) {
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
              button.setAttribute('type', 'button');
              button.setAttribute('class', data[i]['empty'] == 0 ? 'btn btn-default btn-lg seat' : 'btn btn-primary btn-lg seat');
              button.setAttribute('data-seatid', data[i]['id']);
              button.setAttribute('data-occupied', data[i]['empty']);
              button.addEventListener('click', updateTheSeat);
              button.innerHTML = "좌석 " + (i+1);
              var whichGrid = Math.floor(i / 4) % 2;
              document.getElementsByClassName('col-xs-6')[Math.floor(i/4)].appendChild(button);
          }
      }
  }
  req.send(params);
}
/*
  해당 좌석의 empty여부가 클릭할때마다 수정되는 부분
*/
function updateTheSeat() {
    var theTag = event.srcElement;
    var seatID = theTag.dataset.seatid;
    var occupied = theTag.dataset.occupied;

    var req = new XMLHttpRequest();
    var url = "http://pcbanghelp.dothome.co.kr/seatUpdate.php";
    var params = "name=제논&id=" + seatID + "&empty=" + (occupied == 0 ? 1 : 0);
    req.open("POST", url, true);

    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.onreadystatechange = function() {
      if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
          if(req.response == 1) {
              theTag.setAttribute('data-occupied', occupied == 0 ? 1 : 0);
              theTag.setAttribute('class', theTag.getAttribute('data-occupied') == 0 ? 'btn btn-default btn-lg seat' : 'btn btn-primary btn-lg seat');
          }
      }
    }
    req.send(params);
}
