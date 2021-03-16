(async () => {
    const wasm_bytes = [
        0x00, 0x61, 0x73, 0x6d,
        0x01, 0x00, 0x00, 0x00,
        0x01, 0x05, 0x01, 0x60,
        0x00, 0x01, 0x7f, 0x03,
        0x02, 0x01, 0x00, 0x07,
        0x06, 0x01, 0x02, 0x34,
        0x32, 0x00, 0x00, 0x0a,
        0x06, 0x01, 0x04, 0x00,
        0x41, 0x2a, 0x0b
    ];

    const buffer = new ArrayBuffer(wasm_bytes.length);
    const u8 = new Uint8Array(buffer);
    const data = u8.map((d, i) => wasm_bytes[i]);

    const importObject = {};

    const wasm = await WebAssembly.instantiate(data.buffer, importObject);
    console.log({ wasm });
    const { instance, module } = wasm;
    const { exports } = instance;
    const answer = exports["42"];
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
    document.getElementById('42_wasm').innerHTML = `
Data:
${hex(data)}

wasm:
${JSON.stringify(wasm, null, 2)}

answer: 
${answer}

answer(): 
${answer()}
`;
})();