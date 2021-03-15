(async () => {
    var importObject = {};
    const response = await fetch('chapter_llvm/42/42.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('Empty WASM Module', {response, bytes, instance, exports});
    document.getElementById('llvm_output').innerHTML = `FROM WASM:
exports.answer() = ${exports.answer()}
`;
})();

