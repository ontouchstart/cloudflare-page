(async () => {
    var importObject = {};
    const response = await fetch('chapter_rust/wasm/empty_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('Empty WASM Module', {response, bytes, instance, exports});
    var u8 = new Uint8Array(bytes);
    const byteLength = bytes.byteLength;
    window.memory = {bytes, byteLength, u8};
    console.log({memory});
    document.getElementById('empty_module').innerHTML = `FROM WASM:
byteLength = ${byteLength}
`;
})();
