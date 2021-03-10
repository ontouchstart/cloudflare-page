(async () => {
    var mem = new WebAssembly.Memory({initial:10, maximum:100});

    var importObject = { js: { mem }};
    const response = await fetch('introduction/wasm/memory.wasm');
    const { instance } = await WebAssembly.instantiateStreaming(response, importObject);
    const { exports } = instance;
    const { accumulate } = exports;
    var i32 = new Uint32Array(mem.buffer);
      for (let i = 0; i < 100; i++) {
        i32[i] = i+1;
      }
    const sum = accumulate(0, 100); 
    console.log('WASM Memory', {response, instance, exports, sum});
    document.getElementById('wasm_memory').innerHTML = `From WASM Memory
sum = ${sum}
Also see console log.
`

})();
