document.addEventListener("DOMContentLoaded", function() {
    var workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: true,
        trashcan: true
    });
    workspace.createVariable('variable');

    if (/^Mozilla\/5\.0 .*?(iPhone|iPad|iPod|Android)/i.test(navigator.userAgent)) {
        window.alert('PC推奨です');
    }

    workspace.addChangeListener(() => {
        generateCode();
    });
});

function generateCode() {
    let language = document.getElementById('languageSelect').value;
    let code;
    let workspace = Blockly.getMainWorkspace();

    if (language === 'Python') {
        code = Blockly.Python.workspaceToCode(workspace);
    } else {
        code = Blockly.JavaScript.workspaceToCode(workspace);
    }

    document.getElementById('output').textContent = `// ${language}コード\n` + code;
}

function executeCode() {
    try {
        let workspace = Blockly.getMainWorkspace();
        let code = Blockly.JavaScript.workspaceToCode(workspace);
        new Function(code)(); // eval() より安全
    } catch (e) {
        console.error(e);
        alert("エラーが発生しました: " + e.message);
    }
}
