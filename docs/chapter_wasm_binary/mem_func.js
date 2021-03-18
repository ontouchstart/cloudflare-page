(async () => {
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const section_01 = [
        0x01, // type section 
        0x04, // 4 bytes
        0x01, // 1 type
        0x60, // func type
        0x00, // no input
        0x00  // no output
    ];
    const section_03 = [
        0x03, // func section
        0x02, // 2 bytes
        0x01, // number of functions 
        0x00  // type of the function
    ];
    const section_05 = [
        0x05, // memory section
        0x03, // 3 bytes
        0x01, //
        0x00, // min
        0x01  // max
    ];
    const section_0a = [
        0x0a, // code section 
        0x04, // 4 bytes
        0x01, // number of function bodies.
        0x02, // 2 bytes
        0x00, // number of local variables
        0x0b  // opcode for 𝖾𝗇𝖽
    ];
    const wasm = new Uint8Array(
        magic.concat(version)
            .concat(section_01)
            .concat(section_03)
            .concat(section_05)
            .concat(section_0a)
    );

    const importObject = {};
    const module = await WebAssembly.compile(wasm.buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    console.log({ module, instance });
    document.getElementById('mem_func').innerHTML = `
WASM:

hexdump({ data: wasm })
${hexdump({ data: wasm })}

${JSON.stringify({ module, instance }, null, 2)}
`
})();
