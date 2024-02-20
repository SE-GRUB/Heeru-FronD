var dataNama = document.getElementById("databaseName");
var dataLike = document.getElementById("databaseJumlahLike")
var datareply = document.getElementById("databaseJumlahReply")

var names = 'Felicia_hua';
var sumlike = 100;
var sumreply = 10;


dataNama.innerHTML = names;
dataLike.innerHTML = sumlike;
datareply.innerHTML = sumreply;


// Looping Komen
var container = document.getElementById("badanpost");
var box = document.getElementById("kotakpost");

for (var i = 0; i < 3; i++) {
    container.appendChild(box.cloneNode(true));
}

