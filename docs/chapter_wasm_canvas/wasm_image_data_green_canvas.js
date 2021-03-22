(async () => {
    const canvas = document.getElementById('wasm_image_data_green_canvas');
    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '1px solid black';
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, width, height);
    let imageData = ctx.getImageData(0, 0, width, height);

    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const section_01 = [
        0x01, // type section 
        0x07, // 7 bytes
        0x01, // number of functions
        0x60, // function type
        0x02, // takes two params 
        0x7f, 0x7f, // i32
        0x01, // return 1 result 
        0x7f  // i32
    ];
    const section_03 = [
        0x03, // func section
        0x02, // 2 bytes
        0x01, // number of functions 
        0x00  // type of the function
    ];
    const section_05 = [
        0x05, // memory section
        0x03, // 3 bytes
        0x01, // number of memory
        0x00, // min
        0x10  // max: 16 pages of data
    ];
    const section_07 = [
        0x07, // export section
        0x09, // 9 bytes
        0x02, // number of exports
        0x01,
        0x6d, // "m"
        0x02,
        0x00,
        0x01,
        0x66, // "f"
        0x00,
        0x00
    ];

    const section_0a = [
        0x0a, // code section 
        0x0d, // 13 bytes
        0x01, // number of function bodies.
        0x0b, // 11 bytes
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
        0x0b // opcode for end
    ];
    const wasm = new Uint8Array(
        magic.concat(version)
            .concat(section_01)
            .concat(section_03)
            .concat(section_05)
            .concat(section_07)
            .concat(section_0a)
    );

    const importObject = {};
    const module = await WebAssembly.compile(wasm.buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    const { exports } = instance;
    const { f, m } = exports;

    const memory_data = new Uint8Array(m.buffer);
    console.log({ imageData, memory_data })


    for (let i = 0; i < imageData.data.length / 4; i++) {
        f(i * 4, 0xff00ff00); // green AAGGBBRR
    }

    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = memory_data[i];
    }
    ctx.putImageData(imageData, 0, 0);

    const { data } = imageData;
    const canvas_data = document.getElementById('wasm_image_data_green_canvas_data');
    canvas_data.innerHTML = `

Canva data

data.length = ${data.length} = ${data.length / 64 / 1024} pages 

First ${0x200} bytes of the canvas data

hexdump({data, length: 0x200 })
${hexdump({ data, length: 0x200 })}


`
})();