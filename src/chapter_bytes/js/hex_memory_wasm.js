(async () => {
    const wasm_bytes = [
        0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
        0x01, 0x0b, 0x02, 0x60, 0x01, 0x7f, 0x00, 0x60,
        0x02, 0x7f, 0x7f, 0x01, 0x7f, 0x02, 0x14, 0x02,
        0x02, 0x6a, 0x73, 0x03, 0x6d, 0x65, 0x6d, 0x02,
        0x00, 0x01, 0x02, 0x6a, 0x73, 0x03, 0x68, 0x65,
        0x78, 0x00, 0x00, 0x03, 0x02, 0x01, 0x01, 0x07,
        0x0f, 0x02, 0x05, 0x73, 0x74, 0x6f, 0x72, 0x65,
        0x00, 0x01, 0x03, 0x68, 0x65, 0x78, 0x00, 0x00,
        0x0a, 0x10, 0x01, 0x0e, 0x00, 0x20, 0x00, 0x20,
        0x01, 0x36, 0x02, 0x00, 0x20, 0x00, 0x28, 0x02,
        0x00, 0x0b
    ];

    const buffer = new ArrayBuffer(wasm_bytes.length);
    const u8 = new Uint8Array(buffer);
    const data = u8.map((d, i) => wasm_bytes[i]);
    const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 });
    const importObject = {
        js: {
            mem,
            hex: (length = 0) => {
                const data = new Uint8Array(mem.buffer);
                let output = '';
                for (let i = 0; i < length; i++) {
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
                document.getElementById('hex_memory_wasm').innerHTML += `
hex(${length}):
${output}`;
            }
        }
    };

    const wasm = await WebAssembly.instantiate(data.buffer, importObject);

    const { instance, module } = wasm;
    const { exports } = instance;
    const { store, hex } = exports;

    console.log({ wasm })
    console.log({ instance, module, exports })

    document.getElementById('hex_memory_wasm').innerHTML += `
wasm:
${JSON.stringify(wasm, null, 2)}
store: ${store}
store(0, 42) : ${store(0, 42)}
`;
    hex(0x10);
    document.getElementById('hex_memory_wasm').innerHTML += `
store(0xf, 42) : ${store(0xf, 42)}
`
    hex(0x10);

    for (let i = 0; i < 257; i++) {
        store(i, i)
        hex(i);
    }
})();