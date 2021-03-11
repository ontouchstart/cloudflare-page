(async () => {
    var importObject = {
        dom : {
            show_add: function (x, y, result) {
                console.log('Call from WASM', {x, y, result});
                document.getElementById(`add_module_output`).innerHTML += `
${x} + ${y} = ${result}`;
            }
        }
    };
    const response = await fetch('chapter_wat/wasm/add_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM Module', {response, bytes, instance, exports});
    exports.add(1, 1); 
    exports.add(3, 4);
    const i32max = (0xffffffff - 1)/2;
    exports.add(i32max, 1); 
})();
