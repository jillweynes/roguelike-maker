//Images
var tileSet = document.createElement("img");
tileSet.src = "tiles.png";


//Setup display
var W = 50;
var H = 25;
var o = {
    layout: "tile",
    width: W,
    height: H,
    tileSet: tileSet,
    tileMap: {
        "@": [0, 0],
        "#": [0, 64],
        "a": [64, 0],
        "!": [64, 64]
    },
    tileWidth: 32,
    tileHeight: 32,
}
var d = new ROT.Display(o);
document.body.appendChild(d.getContainer());



//keyboard
var input = document.createElement("input");
var out1 = document.createElement("div");
var out2 = document.createElement("div");

var up = false;
var down = false;
var left = false;
var right = false;

var playerx = 23;
var playery = 12;

input.addEventListener("keydown", function (e) {
    var code = e.keyCode;

    var vk = "?"; /* find the corresponding constant */
    for (var name in ROT.KEYS) {
        if (ROT.KEYS[name] == code && name.indexOf("VK_") == 0) { vk = name; }
    }

    if (vk == "VK_DOWN") {
        down = true;


    }
    if (vk == "VK_UP") {
        up = true;
    }
    if (vk == "VK_LEFT") {
        left = true;
    }
    if (vk == "VK_RIGHT") {
        right = true;
    }
    out1.innerHTML = "Keydown: code is " + code + " (" + vk + ")";
});
input.addEventListener("keyup", function (e) {
    var code = e.keyCode;

    var vk = "?"; /* find the corresponding constant */
    for (var name in ROT.KEYS) {
        if (ROT.KEYS[name] == code && name.indexOf("VK_") == 0) { vk = name; }
    }

    if (vk == "VK_DOWN") {
        down = false;
    }
    if (vk == "VK_UP") {
        up = false;
    }
    if (vk == "VK_LEFT") {
        left = false;
    }
    if (vk == "VK_RIGHT") {
        right = false;
    }
    out1.innerHTML = "Updown: code is " + code + " (" + vk + ")";
});

// input.addEventListener("keypress", function(e) {
//     var code = e.charCode;
//     var ch = String.fromCharCode(code);
//     out2.innerHTML = "Keypress: char is " + ch;
// });

document.getElementById("q").appendChild(input)
document.getElementById("q").appendChild(out1)
document.getElementById("q").appendChild(out2)
input.focus();

//Setup map
ROT.RNG.setSeed(1234);
var map = new ROT.Map.Rogue(W, H);

// map.create(d.DEBUG);



//Lighting


var mapData = {};



/* build a map */

function createCallback(x, y, value) {
    mapData[x + "," + y] = value;
}

map.create(createCallback);
async function work() {
    var lightData = {};

        /* prepare a FOV algorithm */
        function lightPasses(x, y) {
            return (mapData[x + "," + y] == 0);
        }
        var fov = new ROT.FOV.PreciseShadowcasting(lightPasses, { topology: 4 });

        /* prepare a lighting algorithm */
        function reflectivity(x, y) {
            return (mapData[x + "," + y] == 1 ? 0.3 : 0);
        }
        var lighting = new ROT.Lighting(reflectivity, { range: 12, passes: 2 });
        lighting.setFOV(fov);
        lighting.setLight(playerx, playery, [240, 240, 30]);
        // lighting.setLight(20, 20, [240, 60, 60]);
        // lighting.setLight(45, 25, [200, 200, 200]);

        function lightingCallback(x, y, color) {
            lightData[x + "," + y] = color;
        }
        lighting.compute(lightingCallback);

        /* draw the resulting mix of mapData and lightData */
        // var display = new ROT.Display({fontSize:8, width:W, height:H});
        // SHOW(display.getContainer());

        /* all cells are lit by ambient light; some are also lit by light sources */
        var ambientLight = [100, 100, 100];
        for (var id in mapData) {
            var parts = id.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);

            var baseColor = (mapData[id] ? [100, 100, 100] : [50, 50, 50]);

            var light = ambientLight;

            if (id in lightData) { /* add light from our computation */
                light = ROT.Color.add(light, lightData[id]);
            }

            var finalColor = ROT.Color.multiply(baseColor, light);
            d.draw(x, y, null, null, ROT.Color.toRGB(finalColor));
        }



        d.draw(playerx, playery, "!")
    
}

function myFunction() {

    if (down) {
        playery += 1;
        console.log(playery);
    }
    if (up) {
        playery -= 1;
        console.log(playery);
    }
    if (left) {
        playerx -= 1;
        console.log(playery);
    }
    if (right) {
        playerx += 1;
        console.log(playery);
    }
}

// Set up the interval to run every 100 milliseconds (1/10th of a second)
setInterval(myFunction, 100);
setInterval(work, 100);
work();