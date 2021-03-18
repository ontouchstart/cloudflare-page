(async () => {
    let offset = 0;
    const canvas = document.getElementById('starter_canvas');
    const hex_output = document.getElementById('starter_hex');
    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '1px solid black';
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, width, height);
    let imageData = ctx.getImageData(0, 0, width, height);

    const hexdump = () => {
        const { data } = imageData;
        let output = '';
        for (let i = offset; i < offset + 0x100; i++) {
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
        hex_output.innerHTML = `
hexdump (offset: ${offset})

${output}
`;
    };

    const canvas_render = () => {
        ctx.putImageData(imageData, 0, 0);
    }

    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const section_01 = [
        0x01, // type section 
        0x0d, // 13 bytes
        0x03, // number of functions
        0x60, // first func type (output)
        0x00, // no input
        0x00, // no output
        0x60, // second func type (f)
        0x00, // no input
        0x00, // no output
        0x60, // third func type (s)
        0x02, // takes two params 
        0x7f, 0x7f, // i32
        0x01, // return 1 result 
        0x7f  // i32
    ];

    const section_02 = [
        0x02, // import section
        0x0d, // 13 bytes
        0x01, // 1 import
        0x02, // 2 bytes
        0x6a, // j
        0x73, // s
        0x06, // 6 bytes
        0x6f, // o
        0x75, // u
        0x74, // t
        0x70, // p
        0x75, // u
        0x74, // t
        0x00, // no input
        0x00  // no output
    ]
    const section_03 = [
        0x03, // func section
        0x03, // 3 bytes
        0x02, // number of functions 
        0x01, // type of the first function (f)
        0x02  // type of the second function (s)
    ];
    const section_05 = [
        0x05, // memory section
        0x03, // 3 bytes
        0x01, // number of memory
        0x00, // min
        0x11 // max: need 17 pages to cover 16 pages of data 512 * 512 * 4 = 16 * 64 * 1024
    ];
    const section_07 = [
        0x07, // export section
        0x16, // 22 bytes
        0x04, // number of exports
        0x01,
        0x6d, // "m"
        0x02,
        0x00,
        0x01,
        0x66, // "f"
        0x00,
        0x01, // func id
        0x01,
        0x73, // "s"
        0x00,
        0x02, // func id
        0x06, // 6 bytes
        0x6f, // o
        0x75, // u
        0x74, // t
        0x70, // p
        0x75, // u
        0x74, // t
        0x00,
        0x00  // func id 
    ];

    const section_0a = [
        0x0a, // code section 
        0x10, // 16 bytes
        0x02, // number of function bodies
        0x02, // the first func (f) does nothing yet
        0x00, // number of local variables
        0x0b, // end
        0x0b, // 11 bytes the second func (s)
        0x00, // number of local variables
        0x20, // local.get 
        0x00, // 0
        0x20, // local.get
        0x01, // 1
        0x36, // i32.store 
        0x02, // 2 bytes
        0x00, // number of local variables
        0x20, // local.get
        0x01, // 1 (return the stored i32)
        0x0b // opcode for 𝖾𝗇𝖽
    ];
    const wasm = new Uint8Array(
        magic.concat(version)
            .concat(section_01)
            .concat(section_02)
            .concat(section_03)
            .concat(section_05)
            .concat(section_07)
            .concat(section_0a)
    );

    const importObject = {
        js: {
            output: () => {
                canvas_render();
                hexdump();
            },
        }
    };

    const module = await WebAssembly.compile(wasm.buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    const { exports } = instance;
    const { f, s, m, output } = exports;
    console.log({ exports })
    const memory_data = new Uint8Array(m.buffer);

    f(); // does nothing yet, to be written to replace the following block 
    for (let i = 0; i < width * height; i++) {
        const r = i * 4;
        const g = i * 4 + 1;
        const b = i * 4 + 2;
        const a = i * 4 + 3;
        s(g, 0xff);
        s(a, 0xff);
    }

    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = memory_data[i];
    }

    output();
})();