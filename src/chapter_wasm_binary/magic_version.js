(async () => {
   const magic = [0x00, 0x61, 0x73, 0x6d];
   const version = [0x01, 0x00, 0x00, 0x00];
   const wasm = magic.concat(version);
   const u8 = new Uint8Array(new ArrayBuffer(wasm.length));
   const buffer = u8.map((d, i) => wasm[i]).buffer;
   const importObject = {};
   const module = await WebAssembly.compile(buffer);
   const instance = await WebAssembly.instantiate(module, importObject);
   const nameSections = WebAssembly.Module.customSections(module, 'name');
   console.log({ module, instance });
   document.getElementById('magic_version').innerHTML = `
${JSON.stringify({ module, instance }, null, 2)}
   `
})();
