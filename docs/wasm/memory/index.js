function copyMemory(data, instance) {
    var ptr = instance.exports.alloc(data.length);
    var mem = new Uint8Array(instance.exports.memory.buffer, ptr, data.length);
    mem.set(new Uint8Array(data));
    return ptr;
}

function arraySum(array, instance) {
    var ptr = copyMemory(array, instance);
    var res = instance.exports.array_sum(ptr, array.length);
    return res;
}

(async () => {
    var importObject = {};
    const response = await fetch('wasm/memory/memory.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    console.log({ response, bytes, instance });
    document.getElementById('answer').innerHTML = `
      <h2>arraySum([1, 2, 3, 4, 5], instance) = ${arraySum([1, 2, 3, 4, 5], instance)}</h2>
      See details in the console log.
      `
})();