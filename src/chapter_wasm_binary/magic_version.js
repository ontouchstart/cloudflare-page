(async () => {
   const magic = [0x00, 0x61, 0x73, 0x6d];
   const version = [0x01, 0x00, 0x00, 0x00];
   const module = magic.concat(version);
   const buffer = new ArrayBuffer(module.length);
   const u8 = new Uint8Array(buffer);
   const data = u8.map((d, i) => module[i]);
   const importObject = {};
   const wasm = await WebAssembly.instantiate(data.buffer, importObject);
   console.log({ wasm })
   document.getElementById('magic_version').innerHTML = `
${JSON.stringify({ wasm }, null, 2)}
   `
})();
