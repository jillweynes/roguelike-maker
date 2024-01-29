function create_items() {
    teardown();
    document.getElementById("items").style.display = "block";
    document.getElementById("game").innerHTML = "";
    document.getElementById("gameout").style.display = "none";

    document.getElementById("block").style.display = "none";

}
allItems = [];
function addItem() {
    var el = document.getElementById("items")

    var div  = document.createElement("div")
    var name = document.createElement("input")
    var description = document.createElement("input")
    var image = document.createElement("input")
    image.setAttribute("type", "file")
    
    div.appendChild(name);
    div.appendChild(description);
    div.appendChild(image);
    div.style.backgroundColor = "white";

    el.appendChild(div);

    item = {name, description, image}
    allItems.push(item);
}

function returnAllItems() {
    var temp = [];
    for (var i = 0; i < allItems.length; i++) {
        temp.push({name: allItems[i].name.value,description: allItems[i].name.value})
    }
    return temp;
}