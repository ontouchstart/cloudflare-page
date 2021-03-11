(async () => {
    // scope calling add_only_module version of add(x, y)
    const importObject = {};
    const response = await fetch('chapter_wat/wasm/add_only_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    const { add } = exports;
    const i32max = (0xffffffff - 1) / 2;
    {   // scope calling import_add_module version of add(x, y)
        const importObject = {
            dom: {
                show_add: function (x, y, result) {
                    console.log('Call from WASM', { x, y, result });
                    document.getElementById(`import_add_module_output`).innerHTML += `${x} + ${y} = ${result}\n`;
                }
            },
            external: { add }
        };
        const response = await fetch('chapter_wat/wasm/import_add_module.wasm');
        const bytes = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes, importObject);
        const { exports } = instance;
        console.log('WASM Module', { response, bytes, instance, exports });
        exports.add(1, 1);
        exports.add(3, 4);
        exports.add(i32max, 1);
    }
    console.log('calling add_only_module', exports.add(1, 1))
    console.log('calling add_only_module', exports.add(3, 4))
    console.log('calling add_only_module', exports.add(i32max, 1))

})();
