(async () => {
    var importObject = {
        dom : {
            log: function (input, output) {
                console.log('Display from WASM', {input, output});
                document.getElementById(`call_js_func_module_output_${input}`).innerHTML = `output = ${output}`
            }
        }
    };
    const response = await fetch('chapter_wat/wasm/call_js_func_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM Module', {response, bytes, instance, exports});
    var u8 = new Uint8Array(bytes);
    const byteLength = bytes.byteLength;
    const input = 42;
    window.memory = {bytes, byteLength, u8};
    console.log({memory});
    console.log(input);
    exports.log(input);
    exports.log(64); // input = 64 for another block
})();
