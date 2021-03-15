(async () => {
    var importObject = {};
    const response = await fetch('introduction/wasm/simple.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM Answer', {response, bytes, instance, exports});
    document.getElementById('wasm_answer').innerHTML = `From WASM Answer
${instance.exports.answer()}
Also see console log.
    `
})();
