//Setup display
var o = {
	width: 110,
	height: 50
}
var d = new ROT.Display(o);
document.body.appendChild(d.getContainer());

//keyboard
var input = document.createElement("input");
var out1 = document.createElement("div");
var out2 = document.createElement("div");

input.addEventListener("keydown", function(e) {
    var code = e.keyCode;
    console.log("here")

    var vk = "?"; /* find the corresponding constant */
    for (var name in ROT.KEYS) {
        if (ROT.KEYS[name] == code && name.indexOf("VK_") == 0) { vk = name; }
    }

    out1.innerHTML = "Keydown: code is " + code + " (" + vk + ")";
});

input.addEventListener("keypress", function(e) {
    var code = e.charCode;
    var ch = String.fromCharCode(code);
    out2.innerHTML = "Keypress: char is " + ch;
});

document.getElementById("q").appendChild(input)
document.getElementById("q").appendChild(out1)
document.getElementById("q").appendChild(out2)
input.focus();

//Setup map
ROT.RNG.setSeed(1234);
var map = new ROT.Map.Digger(110,50);

map.create(d.DEBUG);

var drawDoor = function(x, y) {
    d.draw(x, y, "", "", "red");
}

var rooms = map.getRooms();
for (var i=0; i<rooms.length; i++) {
    var room = rooms[i];

    room.getDoors(drawDoor);
}
