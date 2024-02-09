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


    Blockly.Blocks['noitem'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "num_items",
            "message0": "Num of that Item",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['health'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "num_items",
            "message0": "health",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['one'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "one",
            "message0": "cusotm parameter one",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['two'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "two",
            "message0": "custom parameter two",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['three'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "three",
            "message0": "custom parameter three",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['x'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "x",
            "message0": "x",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['y'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "y",
            "message0": "y",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['scaling'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "scaling",
            "message0": "scaling factor",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['eid'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "enemy id",
            "message0": "enemy id",
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
          }
        );
      }
    };

    Blockly.Blocks['sone'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "block_type",
            "message0": "Set parameter one %1",
            "args0": [
              {
                "type": "input_value",
                "name": "NAME"
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

    Blockly.Blocks['stwo'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "block_type",
            "message0": "Set parameter two %1",
            "args0": [
              {
                "type": "input_value",
                "name": "NAME"
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

    Blockly.Blocks['sthree'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "block_type",
            "message0": "Set parameter three %1",
            "args0": [
              {
                "type": "input_value",
                "name": "NAME"
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

    Blockly.Blocks['shealth'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "block_type",
            "message0": "Set health %1",
            "args0": [
              {
                "type": "input_value",
                "name": "NAME"
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


    Blockly.Blocks['idamage'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "block_type",
            "message0": "Instant damage %1 x %2 y %3 ammount %4",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "x"
              },
              {
                "type": "input_value",
                "name": "y"
              },
              {
                "type": "input_value",
                "name": "ammount"
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


    Blockly.Blocks['ndamage'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "block_type",
            "message0": "New attack %1 x %2 y %3 scaling factor (0-1) %4",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "x"
              },
              {
                "type": "input_value",
                "name": "y"
              },
              {
                "type": "input_value",
                "name": "scaling"
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

    Blockly.Blocks['w'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "w",
            "message0": "wait %1 seconds",
            "args0": [
              {
                "type": "field_input",
                "name": "NAME",
                "text": "1"
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
      const value = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
      return "console.log(" + value + ");";
    }


    javascript.javascriptGenerator.forBlock['clog2'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return "console.log(\"" + value + "\");";
    }

    javascript.javascriptGenerator.forBlock['noitem'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["number", javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['health'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["health", javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['one'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["getVar(0)", javascript.Order.NONE];
    }
    javascript.javascriptGenerator.forBlock['two'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["getVar(1)", javascript.Order.NONE];
    }
    javascript.javascriptGenerator.forBlock['three'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["getVar(2)", javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['x'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["x", javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['y'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["y", javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['scaling'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["scaling", javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['eid'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = block.getFieldValue('NAME');
       
      return ["enemyid", javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['sone'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
       
      return "setVar(0, " + value + ", id);";
    }

    javascript.javascriptGenerator.forBlock['stwo'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
       
      return "setVar(1, " + value + ", id);";
    }

    javascript.javascriptGenerator.forBlock['sthree'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const value = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
       
      return "setVar(2, " + value + ", id);";
    }

    javascript.javascriptGenerator.forBlock['shealth'] = function (block, generator) {
      const value = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
      // const value = block.getFieldValue('NAME');
       
      return "setHealth(" + value + ", id);";
    }

    javascript.javascriptGenerator.forBlock['idamage'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const x = generator.valueToCode(block, 'x', javascript.Order.NONE);
      const y = generator.valueToCode(block, 'y', javascript.Order.NONE);
      const ammount = generator.valueToCode(block, 'ammount', javascript.Order.NONE);
       
      return "doDamage("+ammount+", " + x + ", " + y + ", id);";
    }

    javascript.javascriptGenerator.forBlock['ndamage'] = function (block, generator) {
      // const statement = generator.statementToCode(block, 'MY_STATEMENT_INPUT');
      const x = generator.valueToCode(block, 'x', javascript.Order.NONE);
      const y = generator.valueToCode(block, 'y', javascript.Order.NONE);
      const scaling = generator.valueToCode(block, 'scaling', javascript.Order.NONE);
       
      return "doAttack(" +scaling+", "+ x + ", " + y + ", id);";
    }

    javascript.javascriptGenerator.forBlock['w'] = function (block, generator) {

      const value = block.getFieldValue('NAME');
      return "await new Promise((resolve) => setTimeout(resolve, "+value+"000));";
    }

    workspace = Blockly.inject(

      document.getElementById('block'), { toolbox });



  }
  workee();

}
function run_blockly() {
  //update all item defs
  // clearItemEvals();
  javascript.javascriptGenerator.addReservedWords('code');
  var code = javascript.javascriptGenerator.workspaceToCode(workspace);
  console.log(code);
  eval(code);
}
function workee() {
  var items = returnAllValidItems();
  var toolboxCopy = JSON.parse(JSON.stringify(toolbox));
  for (var i = 0; i < items.length; i++) {
    var str = items[i].id + "run"
    console.log(items[i].id)
    toolboxCopy.contents.push(
      {
        kind: 'category',
        name: items[i].name,
        contents: [
          {
            "kind": "block",
            "type": str + "on hit",
          },
          {
            "kind": "block",
            "type": str + "on miss",
          },
          {
            "kind": "block",
            "type": str + "on kill",
          },
          {
            "kind": "block",
            "type": str + "on take damage",
          },
        ]
      },
    );
    addWorker(items[i], toolboxCopy, "on hit");
    addWorker(items[i], toolboxCopy, "on miss");
    addWorker(items[i], toolboxCopy, "on kill");
    addWorker(items[i], toolboxCopy, "on take damage");
  }

  workspace.updateToolbox(toolboxCopy);



}
function addWorker(item, toolboxCopy, purpose) {
  var str = item.id + "run" + purpose


  var name = item.name + " " + purpose;
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
    return "setFunc(\"" + purpose + "\", " + id + ",async (number, health, x, y, scaling, enemyid, id) => {" + statement + "}); ";
  }
}