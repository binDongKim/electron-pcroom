var req = new XMLHttpRequest();
var url = "http://pcbanghelp.dothome.co.kr/seat.php";
var params = "name=제논";
req.open("POST", url, true);

req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

req.onreadystatechange = function() {
    if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        console.log(req.response);
    }
}
req.send(params);
