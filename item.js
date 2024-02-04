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

    var div = document.createElement("div")
    var name = document.createElement("input")
    name.setAttribute("id", allItems.length + "name")
    name.setAttribute("value", "My great item")
    var description = document.createElement("input")
    description.setAttribute("id", allItems.length + "desc")
    description.setAttribute("value", "...")
    var image = document.createElement("input")
    image.setAttribute("id", allItems.length + "img")
    image.setAttribute("type", "file")

    div.appendChild(name);
    div.appendChild(description);
    div.appendChild(image);
    div.style.backgroundColor = "white";

    el.appendChild(div);

    item = { name, description, image }
    allItems.push(item);
}

function returnAllItems() {
    var temp = [];
    for (var i = 0; i < allItems.length; i++) {
        temp.push({ id: i, name: allItems[i].name.value, description: allItems[i].name.value })
    }
    if (temp.length == 0) {
        temp.push({id:-1, name:"No items", description: "..."})
    }
    return temp;
}
function returnAllValidItems() {
    var temp = [];
    for (var i = 0; i < allItems.length; i++) {
        temp.push({ id: i, name: allItems[i].name.value, description: allItems[i].name.value })
    }
    return temp;
}


async function get(el)  {
    return new Promise((resolve) => {
        const fileInput = document.getElementById(el);
        if (fileInput != null) {
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function (e) {
                    // const previewImage = document.getElementById('previewImage');
                    // previewImage.src = e.target.result;
                    // console.log(e.target.result);
                    resolve(e.target.result);
                };
        
                reader.readAsDataURL(fileInput.files[0]);
            }
            else {
                resolve("tiles.png")
            }
        }
        else {
            resolve("tiles.png")
        }
        
    })
   
}
function get_text(el) {
    const fileInput = document.getElementById(el);

    return fileInput.value;
}

function imgWorker() {


    var all = ["playerimg", "enemyimg", "atkimg", "gdimg", "wimg", "cimg"]

    const fileInputs = all.map((el) => document.getElementById(el))
    const numImages = fileInputs.length;
    
    if (numImages > 1) {
        const readers = Array.from(fileInputs).map((fileInput) => {
            console.log(fileInput)
            if (fileInput.files[0] != null) {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        console.log(e.target.result);
                        const img = document.createElement("img");
                        //img.onload = function () {
                        //    resolve(img);
                        //};
                        img.setAttribute("src",e.target.result);
                        resolve(img)
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                });
            }
            else {
                return new Promise((resolve) => {
                    const img = document.createElement("img");
                        //img.onload = function () {
                        //    resolve(img);
                        //};
                        img.setAttribute("src","tiles.png");
                        resolve(img)
                })
            }

        });
    
        Promise.all(readers).then((base64Images) => {

            const combinedCanvas = document.getElementById('combinedCanvas');
            const combinedImage = document.getElementById('combinedImage');
    
            const context = combinedCanvas.getContext('2d');
            combinedCanvas.width = all.length * 32
            combinedCanvas.height =  32
    
            let offsetY = 0;
            base64Images.forEach((img) => {
                console.log(img)
                if (img != null) {
                    context.drawImage(img, offsetY, 0);
                    offsetY += img.height;
                }
                
            });
    
            // Display the combined image
            combinedImage.src = combinedCanvas.toDataURL();
            combinedCanvas.style.display = 'block';
            fin =  combinedCanvas.toDataURL();
        });
    }
}
var fin = null;
function getImages() {
    return fin;
}


function setFunc(id, e) {
    console.log(id)
    allItems[id].eval = e
}
function runAll() {
    for (var i = 0; i < allItems.length; i++) {
  
            allItems[i].eval();
        
    }
}
function clearItemEvals() {
    for (var i = 0; i < items.length; i++) {
        allItems[i].eval
    }
}