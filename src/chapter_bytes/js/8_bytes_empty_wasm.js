(async () => {
    const buffer = new ArrayBuffer(0x08);
    const u8 = new Uint8Array(buffer);
    const wasm_bytes = [0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00];
    const data = u8.map((d, i) => wasm_bytes[i]);

    const importObject = {};

    const wasm = await WebAssembly.instantiate(data.buffer, importObject);
    console.log({ wasm });
    const { instance } = wasm;
    const hex = (data) => {
        return data.reduce((x, y) => (
            y < 0x10 ? (`${x}0${y.toString(16)} `) : (`${x}${y.toString(16)} `)), ''
        );
    };

    document.getElementById('8_bytes_empty_wasm').innerHTML = `
Data:
${hex(data)}
wasm:
${JSON.stringify(wasm, null, 2)}
`;
})();