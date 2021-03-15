(async () => {
    var importObject = {};
    const response = await fetch('chapter_emcc/42/a.out.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('Empty WASM Module', {response, bytes, instance, exports});
    document.getElementById('emcc_output').innerHTML = `FROM WASM:
exports.main() = ${exports.main()}
`;
})();

