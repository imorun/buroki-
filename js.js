    document.addEventListener("DOMContentLoaded", function() {
        var workspace = Blockly.inject('blocklyDiv', {
            toolbox: document.getElementById('toolbox'),
            scrollbars: true,
            trashcan: true
        });
        
        workspace.addChangeListener(() => {
            generateCode();
        });
    });
    
    function generateCode() {
        let language = document.getElementById('languageSelect').value;
        let code;
        if (language === 'Python') {
            code = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
        } else {
            code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
        }
        document.getElementById('output').textContent = `// ${language}コード\n` + code;
    }

    function executeCode() {

            try {
                code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
                eval(code);
            } catch (e) {
                console.error(e);
                alert("エラーが発生しました: " + e.message);
            }
    }
