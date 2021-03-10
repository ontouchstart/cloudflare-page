(async () => {
    var importObject = {};
    const response = await fetch('chapter_wat/wasm/empty_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('Empty WASM Module', {response, bytes, instance, exports});
    var i8 = new Int8Array(bytes);
    var i16 = new Int16Array(bytes);
    var i32 = new Int32Array(bytes);
    var u8 = new Uint8Array(bytes);
    console.log({i8, i16, i32, u8});
    document.getElementById('empty_module').innerHTML = `FROM WASM:
${JSON.stringify({i8, i16, i32, u8}, null, 2)}
`;

})();
