var workspace = null;
function create_blockly() {
    teardown();

    document.getElementById("game").innerHTML = "";
    document.getElementById("gameout").style.display = "none";

    document.getElementById("block").style.display = "block";
    document.getElementById("items").style.display = "none";


    if (workspace == null) {
        Blockly.setLocale("En");


        

        Blockly.Blocks['clog'] = {
            init: function () {
                this.jsonInit(
                    {
                        "type": "clog",
                        "message0": "Console log %1 %2",
                        "args0": [
                          {
                            "type": "input_dummy"
                          },
                          {
                            "type": "input_value",
                            "name": "NAME"
                          }
                        ],
                        "inputsInline": true,
                        "previousStatement": null,
                        "nextStatement": null,
                        "colour": 230,
                        "tooltip": "qwe",
                        "helpUrl": "ewq"
                      }

                    
                );
            }
        };

        Blockly.Blocks['clog2'] = {
            init: function () {
                this.jsonInit(
                    {
                        "type": "clog2",
                        "message0": "Console log %1",
                        "args0": [
                          {
                            "type": "field_input",
                            "name": "NAME",
                            "text": "default"
                          }
                        ],
                        "previousStatement": null,
                        "nextStatement": null,
                        "colour": 230,
                        "tooltip": "",
                        "helpUrl": ""
                      }

                    
                );
            }
        };


        



        javascript.javascriptGenerator.forBlock['clog'] = function (block, generator) {
            // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
            const value = generator.valueToCode(block, 'NAME', javascript.Order.ATOMIC);
            return "console.log(" + value + ")";
        }


        javascript.javascriptGenerator.forBlock['clog2'] = function (block, generator) {
            // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
            const value = block.getFieldValue('NAME');
            console.log(value)
            return "console.log(\"" + value + "\")";
        }

        workspace = Blockly.inject(

            document.getElementById('block'), { toolbox });



    }


}
function run_blockly() {
    //update all item defs
    clearItemEvals();
    javascript.javascriptGenerator.addReservedWords('code');
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    eval(code);
}
function workee() {
    var items = returnAllValidItems();
    var toolboxCopy = JSON.parse(JSON.stringify(toolbox));
    for (var i = 0; i < items.length; i++) {
        addWorker(items[i], toolboxCopy);
    }

    workspace.updateToolbox(toolboxCopy);

    

}
function addWorker(item, toolboxCopy) {
    var str = item.id + "run";
        console.log(item.id)
        toolboxCopy.contents.push(
            {
                kind: 'category',
                name: item.name,
                contents: [
                  {
                    "kind": "block",
                    "type": str,
                  },
                ]
                },
        );
        

       
        console.log(str)
        
        var name = item.name + " on hit";
        Blockly.Blocks[str] = {
            init: function () {
                this.jsonInit(
                    {

                        "type": str,
                        "message0": name + " %1 %2",
                        "args0": [
                          {
                            "type": "input_dummy"
                          },
                          {
                            "type": "input_statement",
                            "name": "code"
                          }
                        ],
                        "colour": 230,
                        "tooltip": "",
                        "helpUrl": ""
                      }


                    
                );
            }
        };
        var id = item.id
        javascript.javascriptGenerator.forBlock[str] = function (block, generator) {
            const statement = generator.statementToCode(block, 'code');
            // const value = generator.valueToCode(block, 'MY_VALUE_INPUT', Order.ATOMIC);
            console.log("HERE")
            console.log(statement)
            return "setFunc("+id+",() => {" + statement + "})";
        }
}