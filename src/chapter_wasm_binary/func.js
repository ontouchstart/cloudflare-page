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
        0x01, // number of functions 
        0x00  // type of the function
    ];
    const code = [
        0x0a, // code section 
        0x04, // 4 bytes
        0x01, // number of function bodies.
        0x02, // 2 bytes
        0x00, // number of local variables
        0x0b // opcode for 𝖾𝗇𝖽
    ];
    const wasm = new Uint8Array(magic.concat(version).concat(type).concat(func).concat(code));
    const importObject = {};
    const module = await WebAssembly.compile(wasm.buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    console.log({ module, instance });
    document.getElementById('func').innerHTML = `
 ${JSON.stringify({ module, instance }, null, 2)}
    `
})();
