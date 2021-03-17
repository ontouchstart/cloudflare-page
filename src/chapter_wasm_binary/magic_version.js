(async () => {
   const magic = [0x00, 0x61, 0x73, 0x6d];
   const version = [0x01, 0x00, 0x00, 0x00];
   const wasm = new Uint8Array(magic.concat(version));
   const importObject = {};
   const module = await WebAssembly.compile(wasm.buffer);
   const instance = await WebAssembly.instantiate(module, importObject);
   console.log({ module, instance });
   document.getElementById('magic_version').innerHTML = `
${JSON.stringify({ module, instance }, null, 2)}
   `
})();
