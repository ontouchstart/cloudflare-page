(async () => {
    var importObject = { };
    const response = await fetch('chapter_rust/wasm/add_only_module.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM Module', {response, bytes, instance, exports});
    const i32max = (0xffffffff - 1)/2;
    document.getElementById(`add_only_module_output`).innerHTML = `FROM WASM:
byteLength = ${bytes.byteLength}
    
1 + 1 = ${exports.add(1, 1)}
3 + 4 = ${exports.add(3, 4)}
${i32max} + 1 = ${exports.add(i32max, 1)}
`;
})();
