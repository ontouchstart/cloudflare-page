(async () => {
    const response = await fetch('chapter_rust/wasm/call_js_func_module_bg.wasm');
    const bytes = await response.arrayBuffer();

    const dom = {
        log: function (x, y, output) {
            console.log('Call from WASM', { x, y, output });
            document.getElementById(`call_js_func_module_output`).innerHTML += `
${x} + ${y} = ${output}`
        }
    }
    console.log({dom});
    const importObject = {};
    importObject.wbg = {};
    importObject.wbg.__wbg_log_da4acde71f32b64a = dom.log;
    console.log({ response, bytes, importObject });
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM Module', {response, bytes, instance, exports});
    const i32max = (0xffffffff - 1) / 2;

    document.getElementById(`call_js_func_module_output`).innerHTML += `
FROM chapter/js/call_js_func_modules.js
WASM ${bytes.byteLength} bytes
Memory buffer ${exports.memory.buffer.byteLength} bytes
`
    
    exports.show_add(5,6);
    exports.show_add(7,8);
    exports.show_add(i32max, 1);

})();
