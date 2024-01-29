var workspace = null;
function create_blockly() {
    teardown();
    
    document.getElementById("game").innerHTML = "";
    document.getElementById("gameout").style.display = "none";

    document.getElementById("block").style.display = "block";
    document.getElementById("items").style.display = "none";


    if (workspace == null) {
        Blockly.setLocale("En");
        workspace = Blockly.inject(
            
            document.getElementById('block'), { toolbox });
    }

       
}
function run_blockly() {
    javascript.javascriptGenerator.addReservedWords('code');
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    eval(code);
}