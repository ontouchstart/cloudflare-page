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
    const section_02 = [
        0x02, // import section
        0x0b, // 11 (0x0b) bytes
        0x01, // number of imports
        0x02, // memtype
        0x6a, // j
        0x73, // s
        0x03, // .
        0x6d, // m
        0x65, // e
        0x6d, // m
        0x02, // 2 bytes
        0x00, // min
        0x01  // max
    ];
    const section_03 = [
        0x03, // func section
        0x02, // 2 bytes
        0x01, // number of functions 
        0x00  // type of the function
    ];
    const section_0a = [
        0x0a, // code section 
        0x04, // 4 bytes
        0x01, // number of function bodies.
        0x02, // 2 bytes
        0x00, // number of local variables
        0x0b  // opcode for 𝖾𝗇𝖽
    ];
    const wasm = new Uint8Array(magic
        .concat(version)
        .concat(section_01)
        .concat(section_02)
        .concat(section_03)
        .concat(section_0a));

    const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 });
    const importObject = { js: { mem } };
    const module = await WebAssembly.compile(wasm.buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    console.log({ module, instance });
    document.getElementById('import_mem_func').innerHTML = `
WASM

hexdump({ data: wasm })
${hexdump({ data: wasm })}

${JSON.stringify({ module, instance }, null, 2)}
`
})();
