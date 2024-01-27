//Images
var tileSet = document.createElement("img");
tileSet.src = "pixilart-sprite.png";


//Setup display
var W = 50;
var H = 25;
var o = {
    layout: "tile",
    bg: "transparent",
    width: W,
    height: H,
    tileSet: tileSet,
    tileMap: {
        "p": [0, 0],
        "a": [32, 0],
        "e": [64, 0],
        "w": [96, 0],
        "f": [128, 0],
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



input.addEventListener("keydown", function (e) {
    var code = e.keyCode;

    var vk = "?"; /* find the corresponding constant */
    for (var name in ROT.KEYS) {
        if (ROT.KEYS[name] == code && name.indexOf("VK_") == 0) { vk = name; }
    }

    if (vk == "VK_DOWN") {
        playery += 1;
    }
    if (vk == "VK_UP") {
        playery -= 1;
    }
    if (vk == "VK_LEFT") {
        playerx -= 1;
    }
    if (vk == "VK_RIGHT") {
        playerx += 1;
    }


    out1.innerHTML = "Keydown: code is " + code + " (" + vk + ")";
    input.value = "";
});



document.getElementById("q").appendChild(input)
document.getElementById("q").appendChild(out1)
document.getElementById("q").appendChild(out2)
input.focus();

//Setup map
// ROT.RNG.setSeed(1234);
var map = new ROT.Map.Rogue(W, H);




var mapData = {};
var enemies = [];


function createCallback(x, y, value) {
    mapData[x + "," + y] = value;
}

map.create(createCallback);

spawn = getRandomSpawnPoint();
var playerx = spawn.x;
var playery = spawn.y;


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
        label = "f";
        if (mapData[id]) {
            label = "w"
        }
        d.draw(x, y, label, null, ROT.Color.toRGB(finalColor));
    }



    d.draw(playerx, playery, "p")

    for(var i = 0; i < enemies.length; i++) {
        d.draw(enemies[i].x,enemies[i].y,"e");
    }

   


}

function getRandomSpawnPoint() {
    const validSpawnPoints = [];
  
    // Iterate through map cells
    for (let x = 0; x < W; x++) {
      for (let y = 0; y < H; y++) {
        // Check validity criteria (you might need to adjust these conditions)
        if (!mapData[x+","+y]) {
          validSpawnPoints.push({ x, y });
        }
      }
    }
  
    // Randomly select a valid spawn point
    if (validSpawnPoints.length > 0) {
        
      const randomIndex = Math.floor(ROT.RNG.getUniform() * validSpawnPoints.length);
      return validSpawnPoints[randomIndex];
    } else {
      // Handle the case when there are no valid spawn points
      return null;
    }
  }

setInterval(work, 10);

function spawnDefaultEnemy() {
    var enemy = getRandomSpawnPoint();
    enemy.pid = setInterval(() => {enemyMove(enemy);},400 + (ROT.RNG.getUniform()*400));
    enemies.push(enemy);
}

for (var i = 0; i < 5; i++) {
    spawnDefaultEnemy();
}
function enemyMove(me) {
 //Pathfinding
    /* input callback informs about map structure */
    var passableCallback = function (x, y) {

        return (mapData[x + "," + y] === 0);
    }

    /* prepare path to given coords */
    var dijkstra = new ROT.Path.Dijkstra(playerx, playery, passableCallback);
    var moved = false;
    /* compute from given coords #1 */
    dijkstra.compute(me.x, me.y, function (x, y) {
        if ((Math.abs(me.x-x) == 1 || Math.abs(me.y-y) == 1)&&!moved) {
            var valid = true;
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].x ==x && enemies[i].y == y && enemies[i].pid != me.pid) {
                    valid = false;
                }
            }
            if(valid) {
                me.x = x;
                me.y = y;
            }
            
            moved = true;
        }
    });
}