(async () => {
    const wasm_bytes = [
        0x00, 0x61, 0x73, 0x6d,
        0x01, 0x00, 0x00, 0x00,
        0x02, 0x0b, 0x01, 0x02,
        0x6a, 0x73, 0x03, 0x6d,
        0x65, 0x6d, 0x02, 0x00,
        0x01
    ];

    const buffer = new ArrayBuffer(wasm_bytes.length);
    const u8 = new Uint8Array(buffer);
    const data = u8.map((d, i) => wasm_bytes[i]);
    const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 });
    const importObject = { js: { mem } };

    window.wasm = await WebAssembly.instantiate(data.buffer, importObject);
    console.log({ wasm });
    const { instance, module } = wasm;
    console.log({ instance, module })
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

    document.getElementById('single_page_memory_empty_wasm').innerHTML = `
Data:
${hex(data)}
wasm:
${JSON.stringify(wasm, null, 2)}
`;
})();