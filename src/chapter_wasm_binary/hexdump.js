const hexdump = ({ data, length, offset = 0 }) => {
    let output = '';
    for (let i = offset; i < offset + (length ? length : data.length); i++) {
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