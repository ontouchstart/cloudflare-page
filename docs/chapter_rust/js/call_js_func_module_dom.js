// make a global dom object to be used in 
// chapter_rust/js/module/call_js_func_module.js
// which imports 
// chapter_rust/rust/call_js_func_module/pkg/call_js_func_module.js
window.dom = {
    log: function (x, y, output) {
        console.log('Call from WASM', { x, y, output });
        document.getElementById(`call_js_func_module_output`).innerHTML += `
${x} + ${y} = ${output}`
    }
};