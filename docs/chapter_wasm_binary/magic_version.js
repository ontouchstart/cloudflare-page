(async () => {
   const magic = [0x00, 0x61, 0x73, 0x6d];
   const version = [0x01, 0x00, 0x00, 0x00];
   const wasm = new Uint8Array(magic.concat(version));
   const hex = (data) => {
      let output = '';
      for (let i = 0; i < data.length; i++) {
         if (data[i] < 0x10) {
            output += `0${data[i].toString(16)}`;
         }
         else {
            output += `${data[i].toString(16)}`;
         }
         if ((i % 0x10) === 0x0f) {
            output += '\n';
         }
         else {
            output += ' ';
         }
      }
      return output;
   };
   const importObject = {};
   const module = await WebAssembly.compile(wasm.buffer);
   const instance = await WebAssembly.instantiate(module, importObject);
   console.log({ module, instance });
   document.getElementById('magic_version').innerHTML = `
WASM
${hex(wasm)}

${JSON.stringify({ module, instance }, null, 2)}
`
})();
