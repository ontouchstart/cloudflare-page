(async () => {
    var importObject = {};
    const response = await fetch('introduction/wasm/simple.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    const { exports } = instance;
    console.log('WASM', {response, bytes, instance, exports});
    document.getElementById('wasm-answer').innerHTML = `The answer is ${instance.exports.answer()}.
Also see console log.
    `
})();
