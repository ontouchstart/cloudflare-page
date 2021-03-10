(async () => {
    var importObject = {};
    const response = await fetch('chapter_wat/wasm/empty_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('Empty WASM Module', {response, bytes, instance, exports});
})();
