(async () => {
    var importObject = {};
    const response = await fetch('wasm/double/double.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    console.log({ response, bytes, instance});
    const x = 42;
    document.getElementById('answer').innerHTML = `
    <h2>The double of ${x} is ${instance.exports.double(x)}.</h2>
    See details in the console log.
    `
})();
