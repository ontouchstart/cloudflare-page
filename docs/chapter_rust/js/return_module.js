(async () => {
    var importObject = {};
    const response = await fetch('chapter_rust/wasm/return_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM Module', {response, bytes, instance, exports});
    const input = 42;
    document.getElementById('return_module').innerHTML = `FROM WASM:
byteLength = ${bytes.byteLength}

return_input(${input}) = ${exports.return_input(input)}
`;
})();
