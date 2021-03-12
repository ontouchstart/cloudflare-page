window.dom = {
    log: function (x, y, output) {
        console.log('Call from WASM', { x, y, output });
        document.getElementById(`call_js_func_module_output`).innerHTML += `
${x} + ${y} = ${output}`
    }
};