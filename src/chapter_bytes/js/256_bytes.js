{
    const buffer = new ArrayBuffer(0x100);
    const u8 = new Uint8Array(buffer);
    const data = u8.map((d, i) => i);
    const hex = (data) => {
        return data.reduce((x, y) => {
            if (y < 0x10) {
                return `${x}0${y.toString(16)} `;
            }
            else {
                if ((y % 16) === 0) {
                    console.log('line break');
                    return `${x}\n${y.toString(16)} `
                }
                else {
                    return `${x}${y.toString(16)} `;
                }
            }
        }, ''
        );
    };

    document.getElementById('256_bytes').innerHTML = `
Data:
${hex(data)}
`;
}
