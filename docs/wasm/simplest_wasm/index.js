(async () => {
    var importObject = {};
    const response = await fetch('wasm/simplest_wasm/simplest_wasm.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    console.log({response, bytes, instance});
    document.getElementById('answer').innerHTML = `
    <h2>The answer is ${instance.exports.answer()}.</h2>
    See details in the console log.
    `
})();