var workspace;
function create_blockly() {
    teardown();
    Blockly.setLocale("En");
    document.getElementById("q").innerHTML = "";


      

    workspace = Blockly.inject(
        document.getElementById('q'), { toolbox });   
}
function run_blockly() {
    javascript.javascriptGenerator.addReservedWords('code');
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    eval(code);
}