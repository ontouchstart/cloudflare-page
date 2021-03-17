(async () => {
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const type = [
        0x01, // type section 
        0x04, // 4 bytes
        0x01, 0x60, 0x00, 0x00 // func type that takes no param and return nothing
    ];
    const func = [
        0x03, // func section
        0x02, // 2 bytes
        0x01, 0x00];
    const code = [
        0x0a, // code section 
        0x04, // 4 bytes
        0x01,
        0x02, // 2 bytes
        0x00, 0x0b
    ];
    const wasm = magic.concat(version).concat(type).concat(func).concat(code);
    const u8 = new Uint8Array(new ArrayBuffer(wasm.length));
    const buffer = u8.map((d, i) => wasm[i]).buffer;
    const importObject = {};
    const module = await WebAssembly.compile(buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    const nameSections = WebAssembly.Module.customSections(module, 'name');
    console.log({ module, instance });
    document.getElementById('func').innerHTML = `
 ${JSON.stringify({ module, instance }, null, 2)}
    `
})();
