(async () => {
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
    let x = 0;
    let y = 0;
    let offset = 0;

    const check_boundary = () => {
        if (x < 0) { x = 0 }
        if (x > width - 1) { x = width - 1 }
        if (y < 0) { y = 0 }
        if (y > height - 1) { y = height - 1 }
        offset = 4 * (y * width + x);
        r = offset;
        g = offset + 1;
        b = offset + 2;
        a = offset + 3;
    }

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        x = Math.floor(e.clientX - rect.left);
        y = Math.floor(e.clientY - rect.top);
        hexdump();
    }, false)

    canvas.addEventListener('mouseout', (e) => {
        x = 0;
        y = 0;
        offset = 0;
        hexdump();
    }, false)

    const hexdump = () => {
        const { data } = imageData;
        let output = '';
        check_boundary();
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
x: ${parseInt(x)}
y: ${parseInt(y)}        
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
        0x11 // max: need 17 pages to cover 16 pages of data
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

    const section_0a_header = [
        0x0a, // code section 
        0x18, // 24 bytes
        0x02  // number of function bodies
    ]

    const section_0a_f = [
        0x0a, // the first func (f) 
        0x00, // number of local variables
        0x41,
        0x00, // address 0x00
        0x41,
        0xff, // value 0xff
        0x01,
        0x36, // store to the memory
        0x02, // align
        0x00, // offset
        0x0b  // end
    ]

    const section_0a_s = [
        0x0b, // 11 bytes the second func (s)
        0x00, // number of local variables
        0x20, // local.get 
        0x00, // 0
        0x20, // local.get
        0x01, // 1
        0x36, // i32.store 
        0x02, // align
        0x00, // offset
        0x20, // local.get
        0x01, // 1 (return the stored i32)
        0x0b  // opcode for 𝖾𝗇𝖽
    ]

    const section_0a = section_0a_header
        .concat(section_0a_f)
        .concat(section_0a_s);

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

    f(); // a transparent red dot at (0, 0)
    s(0x03, 0xff) // make it visible;

    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = memory_data[i];
    }

    output();
})();