(async () => {
    var importObject = {};
    const response = await fetch('chapter_wat/wasm/return_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM Module', {response, bytes, instance, exports});
    var u8 = new Uint8Array(bytes);
    var u16 = new Uint16Array(bytes);
    var u32 = new Uint32Array(bytes);
    const byteLength = bytes.byteLength;
    const input = 42;
    window.memory = {bytes, byteLength, u8, u16, u32};
    console.log({memory});
    document.getElementById('return_module').innerHTML = `FROM WASM:
${JSON.stringify({memory}, null, 2)}
return(${input}) = ${exports.return(input)}
`;
})();
