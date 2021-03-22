# Memory I/O

This page and all the code it runs are in one page. You can view [the source code](https://github.com/ontouchstart/cloudflare-page/blob/master/src/memory_io.md).

This page is to demonstrate using memory for I/O.

<canvas id="canvas"></canvas>
<pre id="hex"></pre>

```javascript
(async () => {
    const canvas = document.getElementById('canvas');
    const hex_output = document.getElementById('hex');
    const width = 128;
    const height = 128;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '1px solid black';
    const ctx = canvas.getContext('2d');
    
    const avatar = new Image();
    avatar.src = 'avatar.png';
    await avatar.decode();
    ctx.drawImage(avatar, 0, 0, 0x80, 0x80);

    let imageData = ctx.getImageData(0, 0, width, height);
    let x = 0;
    let y = 0;
    let offset = 0;

    let paint;

    const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 });
    let heap = new Uint8ClampedArray(mem.buffer);
  
    for(let index = 0; index < 0x100000; index++) {
        heap[index] = imageData.data[index];
    };

    const filter = () => {
        // following computation is done in JavaScript, we can (and should) implement it in WASM for performance
        // but the JS version is easy to write as a prototype.
     
        // turn the middle third of the image half transparent
        for(let i = Math.floor(0x80 * 0x80 / 3); i < Math.floor(2 * 0x80 * 0x80 / 3); i++) {
            const r = heap[i * 4];
            const g = heap[i * 4 + 1];
            const b = heap[i * 4 + 2];
            const a = heap[i * 4 + 3];
            const data = 
                  0x80 * 0x1000000
                + b * 0x10000
                + g * 0x100
                + r
            paint(i, data); 
        }

        // turn the bottom 1/3 of the image into grayscale
        for(let i = Math.floor(2 * 0x80 * 0x80 / 3); i < 0x80 * 0x80; i++) {
            const r = heap[i * 4];
            const g = heap[i * 4 + 1];
            const b = heap[i * 4 + 2];
            const a = heap[i * 4 + 3];
            const intensity = Math.floor(0.2989 * r + 0.5870 * g + 0.1140 * b);
            const data = 
                  0xFF * 0x1000000
                + intensity * 0x10000
                + intensity * 0x100
                + intensity
            paint(i, data); 
        }
        canvas_render();
    }

    const importObject = {
        j: {
            m: mem,
            f: filter
        }
    };

    const check_boundary = () => {
        if (x < 0) { x = 0 }
        if (x > width - 1) { x = 0 }
        if (y < 0) { y = 0 }
        if (y > height - 1) { y = 0 }
        offset = 4 * (y * width + x);
    }

    const move = (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();

        const { changedTouches } = e;
        if (changedTouches && changedTouches[0]) {
            x = Math.floor(changedTouches[0].pageX - canvas.offsetLeft);
            y = Math.floor(changedTouches[0].pageY - canvas.offsetTop);
        }
        else {
            x = Math.floor(e.clientX - rect.left);
            y = Math.floor(e.clientY - rect.top);
        }
        hexdump();
    };

    canvas.addEventListener('mousemove', move, false);
    canvas.addEventListener('touchmove', move, false);

    const hexdump = () => {
        const { data } = imageData;
        check_boundary();
        let output = '';
        for (let i = offset; i < offset + 0x100; i += 4) {            
            if (i < data.length - 4 ) {
                for(let j = 3; j > -1 ; j--) {
                    if(data[i+j] < 0x10) {
                        output += `0${data[i+j].toString(16)}`;
                    } else {
                        output += `${data[i+j].toString(16)}`;
                    }
                }
                if (((i - offset)% 0x20) === 0x1c) {
                    output += '\n';
                }
                else {
                    output += ' ';
                }
            }
        }
        hex_output.innerHTML = `
x: 0x${parseInt(x).toString(16)}
y: 0x${parseInt(y).toString(16)}
offset: 0x${offset.toString(16)} 
(mouse point = upper left corner of hexdump)        

(8 x 8) i32 = 256 bytes (1/256 of the total memory of a 64K page)
(0x${0x10000.toString(16)} = 0x${0x100.toString(16)} * 0x${0x100.toString(16)} = ${0x100 * 0x100} )


${output}
`;
    };

    const canvas_render = () => {
        for (let i = 0; i < imageData.data.length; i++) {
            imageData.data[i] = heap[i];
        }
        ctx.putImageData(imageData, 0, 0);
    }

    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const section_01 = [
        0x01, // type section
        0x09, // 9 bytes
        0x02, // number of functions
        0x60, // j.f
        0x00, // no input
        0x00, // no output
        0x60, // func type (paint)
        0x02, // takes two params 
        0x7f, // param i32
        0x7f, // param i32
        0x00  // no output 
    ];

    const section_02 = [
        0x02, // import section
        0x0e, // 14 bytes
        0x02, // 2 imports
        0x01, // 1 byte
        0x6a, // j
        0x01, // 1 byte
        0x6d, // m
        0x02, // mem import
        0x00, // min pages
        0x01, // max pages
        0x01, // 1 byte
        0x6a, // j
        0x01, // 1 byte
        0x66, // f
        0x00, // func import
        0x00  // first func
    ]

    const section_03 = [
        0x03, // func section
        0x02, // 3 bytes
        0x01, // number of functions
        0x01  // paint
    ];

    const section_07 = [
        0x07, // export section
        0x12, // 18 bytes
        0x02, // number of exports
        0x06, // 6 byte name
        0x66, // f
        0x69, // i
        0x6c, // l
        0x74, // t
        0x65, // e
        0x72, // r
        0x00, // function
        0x00,  // export j.f
        0x05, // 5 byte name
        0x70, // p
        0x61, // a
        0x69, // i
        0x6e, // n
        0x74, // t
        0x00, // function
        0x01  // export paint
    ];

    const section_0a_header = [
        0x0a, // code section 
        0x0e, // 14 bytes
        0x01  // number of function bodies
    ]

    const section_0a_i = [ // input function i(address, value)
        0x0c, // 12 bytes 
        0x00, // number of local variables
        0x20, // local.get
        0x00, // 0 (address)
        0x41, // i32.const
        0x02, // 2 (left shift value)
        0x74, // i32.shl address 2 = address * 4
        0x20, // local.get
        0x01, // 1 (i32 value, takes 4 bytes of memory)
        0x36, // i32.store 
        0x02, // align
        0x00, // offset
        0x0b  // opcode for 𝖾𝗇𝖽
    ]

    const section_0a = section_0a_header
        .concat(section_0a_i);

    const wasm = new Uint8Array(
        magic.concat(version)
            .concat(section_01)
            .concat(section_02)
            .concat(section_03)
            .concat(section_07)
            .concat(section_0a)
    );

    console.log({ wasm });
   
    const module = await WebAssembly.compile(wasm.buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    const { exports } = instance;
    paint = exports.paint;
    canvas_render();

    setTimeout(exports.filter, 1000);
    
    hexdump();

})();

```

<script>
  const code = document.getElementsByClassName('language-javascript')[0].innerText;
  eval(code);
</script>
