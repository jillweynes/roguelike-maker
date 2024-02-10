var loop = -1;
var enemies = [];
var items = [];
var mrd = { x: 0, y: 1 };
var attacks = [];

var playerx;
var playery;
var playerhealth = 100;
var playerparam1 = 0;
var playerparam2 = 0;
var playerparam3 = 0;
var maxhealth = 100;
var gameid;
function teardown() {
    if (loop != -1) {
        clearInterval(loop);
        loop = -1
    }
    for (var i = 0; i < enemies.length; i++) {
        clearInterval(enemies[i].pid);
    }
    enemies = [];
}

var input = null;
function start_game() {
    teardown();

    document.getElementById("game").innerHTML = "";
    document.getElementById("block").style.display = "none";
    document.getElementById("gameout").style.display = "block";
    document.getElementById("items").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("list").innerHTML = "";
    document.getElementById("end").style.display = "none"
    document.getElementById("maxhealth").style.display = "none"
    document.getElementById("list").style.display = "none"
    playerhealth = 100;
    items = [];
    gameid = Math.random();

    document.getElementById("starttext").innerText = get_text("sttitle")
    document.getElementById("startdesc").innerText = get_text("stdesc")
    Promise.resolve(get("stimg")).then((res) => {
        document.getElementById("startwidth").setAttribute("src", res);
    })


    input = document.createElement("input");
    input.style.opacity = "0";
    input.style.position = "fixed"
    input.style.top = "0"
    document.getElementById("gameout").appendChild(input)
    input.focus();
    var pidd = setInterval(() => {
        input.focus();
    }, 100);

    var wer = input.addEventListener("keydown", function abc(event) {
        document.getElementById("start").style.display = "none";
        input.removeEventListener("keydown", abc);
        //console.log("qwe")
        clearInterval(pidd);
        create_game();
    });
}


function create_game() {
    teardown();
    document.getElementById("game").innerHTML = "";
    document.getElementById("block").style.display = "none";
    document.getElementById("gameout").style.display = "block";
    document.getElementById("items").style.display = "none";
    document.getElementById("maxhealth").style.display = "block"
    document.getElementById("list").style.display = "block"



    //Images
    var tileSet = document.createElement("img");
    var result = getImages();
    if (result == null) {
        tileSet.src = "pixilart-sprite.png"
    }
    else {
        tileSet.src = result;
    }

    run_blockly();
    var allItems = returnAllItems();

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
            "c": [160, 0],
        },
        tileWidth: 32,
        tileHeight: 32,

    }
    var d = new ROT.Display(o);
    document.getElementById("game").appendChild(d.getContainer());



    //keyboard
    // var input = document.createElement("input");
    // var out1 = document.createElement("div");
    // var out2 = document.createElement("div");


    function collide() {
        return mapData[playerx + "," + playery] == 1
    }


    input.addEventListener("keydown", function (e) {
        var code = e.keyCode;

        var vk = "?"; /* find the corresponding constant */
        for (var name in ROT.KEYS) {
            if (ROT.KEYS[name] == code && name.indexOf("VK_") == 0) { vk = name; }
        }
        if (!waitSel) {
            if (vk == "VK_DOWN") {
                playery += 1;
                mrd = { x: 0, y: 1 };
                if (collide()) {
                    playery -= 1;
                }
            }
            if (vk == "VK_UP") {
                playery -= 1;
                mrd = { x: 0, y: -1 };
                if (collide()) {
                    playery += 1;
                }
            }
            if (vk == "VK_LEFT") {
                playerx -= 1;
                mrd = { x: -1, y: 0 };
                if (collide()) {
                    playerx += 1;
                }
            }
            if (vk == "VK_RIGHT") {
                playerx += 1;
                mrd = { x: 1, y: 0 };
                if (collide()) {
                    playerx -= 1;
                }
            }

            if (vk == "VK_SPACE") {
                attack();
            }

            for (var i = 0; i < chests.length; i++) {
                if (playerx == chests[i].x && playery == chests[i].y) {
                    handleChest();
                }
            }
        }
        else {
            if (vk == "VK_1") {
                waitSel = false;
                items.push(item1)
            }
            else if (vk == "VK_2") {
                waitSel = false;
                items.push(item2)
            }
            else if (vk == "VK_3") {
                waitSel = false;
                items.push(item3)
            }
            if (waitSel == false) {
                document.getElementById("itemPicker").style.display = "none";
                chests = chests.filter(item => (item.x != playerx || item.y != playery))

                item = items[items.length - 1];
                var im = document.createElement("img")
                Promise.resolve(get(item.id + "img")).then((res) => {
                    im.src = res;
                })
                im.width = 50
                im.height = 50
                document.getElementById("list").appendChild(im)

                for (var i = 0; i < 5; i++) {
                    spawnDefaultEnemy();
                }
            }
            //console.log(items);
        }




        // out1.innerHTML = "Keydown: code is " + code + " (" + vk + ")";
        input.value = "";
    });

    var waitSel = false;
    var item1 = null;
    var item2 = null;
    var item3 = null;

    function handleChest() {
        document.getElementById("itemPicker").style.display = "block";
        //console.log(allItems)
        item1 = allItems[Math.floor(ROT.RNG.getUniform() * allItems.length)]
        item2 = allItems[Math.floor(ROT.RNG.getUniform() * allItems.length)]
        item3 = allItems[Math.floor(ROT.RNG.getUniform() * allItems.length)]

        document.getElementById("name1").innerText = item1.name
        document.getElementById("desc1").innerText = item1.description
        Promise.resolve(get(item1.id + "img")).then((res) => {
            document.getElementById("img1").setAttribute("src", res)
        })

        document.getElementById("name2").innerText = item2.name
        document.getElementById("desc2").innerText = item2.description
        Promise.resolve(get(item2.id + "img")).then((res) => {
            document.getElementById("img2").setAttribute("src", res)
        })

        document.getElementById("name3").innerText = item3.name
        document.getElementById("desc3").innerText = item3.description
        Promise.resolve(get(item1.id + "img")).then((res) => {
            document.getElementById("img3").setAttribute("src", res)
        })


        waitSel = true;
    }

    //input.style.position = "fixed"
    //input.style.top = "0"
    //document.getElementById("game").appendChild(input)
    // document.getElementById("game").appendChild(out1)
    // document.getElementById("game").appendChild(out2)
    //input.focus();

    //Setup map
    // ROT.RNG.setSeed(1234);
    var map = new ROT.Map.Rogue(W, H);




    var mapData = {};
    // var enemies = [];

    var chests = [];

    function createCallback(x, y, value) {
        mapData[x + "," + y] = value;
    }

    map.create(createCallback);

    var spawn = getRandomSpawnPoint();
    playerx = spawn.x;
    playery = spawn.y;

    updateUI();

    function remakeMap() {
        map = new ROT.Map.Rogue(W, H);
        map.create(createCallback);
        var spawn = getRandomSpawnPoint();
        playerx = spawn.x;
        playery = spawn.y;
        for (var i = 0; i < 5; i++) {
            spawnDefaultEnemy();
        }
        for (var i = 0; i < 5; i++) {
            spawnChest();
        }
    }
    async function work() {
        if (chests.length == 0) {
            remakeMap();
        }


        var lightData = {};
        input.focus();

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




        for (var i = 0; i < enemies.length; i++) {
            d.drawOver(enemies[i].x, enemies[i].y, "e");
        }

        for (var i = 0; i < chests.length; i++) {
            d.drawOver(chests[i].x, chests[i].y, "c");
        }

        for (var i = 0; i < attacks.length; i++) {
            d.drawOver(attacks[i].x, attacks[i].y, "a");
        }


        d.drawOver(playerx, playery, "p")


    }

    function getRandomSpawnPoint() {
        const validSpawnPoints = [];

        // Iterate through map cells
        for (let x = 0; x < W; x++) {
            for (let y = 0; y < H; y++) {
                // Check validity criteria (you might need to adjust these conditions)
                if (!mapData[x + "," + y]) {
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

    loop = setInterval(work, 10);

    function spawnDefaultEnemy() {
        var enemy = getRandomSpawnPoint();
        enemy.pid = setInterval(() => { enemyMove(enemy); }, 400 + (ROT.RNG.getUniform() * 400));
        enemy.health = 100;
        enemy.id = Math.random();
        var len = items.length;
        if (len > 10) {
            enemy.health = 100 + (len - 10) * 20
        }
        enemies.push(enemy);
    }

    for (var i = 0; i < 7; i++) {
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
            if ((Math.abs(me.x - x) == 1 || Math.abs(me.y - y) == 1) && !moved) {
                var valid = true;
                for (var i = 0; i < enemies.length; i++) {
                    if (enemies[i].x == x && enemies[i].y == y && enemies[i].pid != me.pid) {
                        valid = false;
                    }

                }
                if (playerx == x && playery == y) {
                    //player hit
                    valid = false;
                    doPlayerDmg();
                }
                if (valid) {
                    me.x = x;
                    me.y = y;
                }

                moved = true;
            }
        });
    }
    function doPlayerDmg() {
        playerhealth -= 10;
        if (items.length > 6) {
            playerhealth -= 5;
        }
        updateUI();
        runAll("on take damage", playerhealth, playerx, playery, -1, -1)
        updateUI();
    }

    function spawnChest() {
        chest = getRandomSpawnPoint();
        chests.push(chest);
    }
    for (var i = 0; i < 5; i++) {
        spawnChest();
    }



}
function attack() {
    var newx = playerx + mrd.x;
    var newy = playery + mrd.y;
    doAttack(1, newx, newy, gameid)
}
function getRepeatedElements(inputList) {

    const counts = new Map();

    inputList.forEach(item => {

        if (!counts.has(item)) {
            counts.set(item, 1);
        } else {

            counts.set(item, counts.get(item) + 1);
        }
    });

    const result = [];


    counts.forEach((count, item) => {
        result.push({ item, count });
    });

    return result;
}


//bomb instant damage on die
//crit change w checking a random number depedning on how may of that itm

function updateUI() {
    if (playerhealth < 0) {
        document.getElementById("end").style.display = "block"
        document.getElementById("maxhealth").style.display = "none"
        document.getElementById("list").style.display = "none"
    }
    document.getElementById("currhealth").style.width = (playerhealth / maxhealth) * 100 + "%"
    document.getElementById("maxhealth").style.width = maxhealth + "%"
}

function setHealth(health, id) {
    if (gameid == id) {
        playerhealth = health;
        updateUI();
    }


}

function doDamage(dmg, x, y, id) {
    if (gameid == id) {
        var hit = -1;
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].x == x && enemies[i].y == y) {
                hit = enemies[i]
            }

        }

        hit.health -= dmg;

        if (hit.health < 0) {
            clearInterval(hit.pid);
            hit.x = 100
            hit.y = 100
            runAll("on kill", playerhealth, x, y, -1, -1)
        }
    }
}
function doAttack(scaling, x, y, id) {
    console.log(gameid)
    console.log(id)
    if (gameid == id) {
        if (scaling > 0) {
            var id = Math.random()
            attacks.push({ x, y, id });

            setTimeout(() => {
                attacks = attacks.filter((el) => { el.id != id })
            }, 300)
        }


        var hit = -1;
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].x == x && enemies[i].y == y) {
                hit = enemies[i].id;
            }

        }
        console.log(hit)

        if (hit != -1) {
            runAll("on hit", playerhealth, x, y, scaling, hit);
            if (scaling > 0) {
                doDamage(30 * scaling, x, y, gameid)
            }
        }
        else {
            runAll("on miss", playerhealth, x, y, scaling, -1)
        }
    }
}
function runAll(func, h, x, y, s, e) {
    var filtered = getRepeatedElements(items);
    promices = []
    filtered.forEach((tem) => {


        var cmd = get_cmd(tem.item, func)
        //console.log(cmd);
        promices.push(new Promise((resolve) => { cmd(tem.count, h, x, y, s, e, gameid); resolve() }));

    });
    Promise.all(promices);

}

var vars = [0, 0, 0];
function getVar(n) {
    return vars[n];
}
function setVar(n, val, id) {
    if (gameid == id) {
        vars[n] = val;
    }

}
