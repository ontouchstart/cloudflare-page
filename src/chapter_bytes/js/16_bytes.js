{
    const buffer = new ArrayBuffer(0x10);
    const u8 = new Uint8Array(buffer);
    const data = u8.map((d, i) => i);
    const hex = (data) => {
        return data.reduce((x, y) => (
            y < 0x10 ? (`${x}0${y.toString(16)} `) : (`${x}${y.toString(16)} `)), ''
        );
    };

    document.getElementById('16_bytes').innerHTML = `
Data:
${hex(data)}
`;
}