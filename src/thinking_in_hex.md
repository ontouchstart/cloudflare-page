# Thinking in hex
[source code](https://github.com/ontouchstart/cloudflare-page/blob/master/src/thinking_in_hex.md)

Since we are going to do a lot of machine code programming, it is a good idea to learn to think in [hex](https://en.wikipedia.org/wiki/Hexadecimal).

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
    ctx.fillRect(0, 0, width, height);
    let imageData = ctx.getImageData(0, 0, width, height);
    let x = 0;
    let y = 0;
    let offset = 0;

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
            imageData.data[i] = memory_data[i];
        }
        ctx.putImageData(imageData, 0, 0);
    }

    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const section_01 = [
        0x01, // type section 
        0x09, // 9 bytes
        0x02, // number of functions
        0x60, // first func type (j.o)
        0x00, // no input
        0x00, // no output
        0x60, // second func type (i)
        0x02, // takes two params 
        0x7f, 0x7f, // i32
        0x00 // no return 
    ];

    const section_02 = [
        0x02, // import section
        0x07, // 7 bytes
        0x01, // 1 import
        0x01, // 1 byte
        0x6a, // j
        0x01, // 1 byte
        0x6f, // o
        0x00, // no input
        0x00  // no output
    ]
    const section_03 = [
        0x03, // func section
        0x02, // 2 bytes
        0x01, // number of functions 
        0x01, // type of the function (i)
    ];
    const section_05 = [
        0x05, // memory section
        0x03, // 3 bytes
        0x01, // number of memory
        0x00, // min
        0x01  // max one page of data
    ];
    const section_07 = [
        0x07, // export section
        0x09, // 9 bytes
        0x02, // number of exports
        0x01, // 1 byte name
        0x6d, // "m"
        0x02, // memory
        0x00, // memory id
        0x01, // 1 byte name
        0x69, // "i"
        0x00, // function
        0x01  // func id
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
        0x0b  // opcode for end
    ]

    const section_0a = section_0a_header
        .concat(section_0a_i);

    const wasm = new Uint8Array(
        magic.concat(version)
            .concat(section_01)
            .concat(section_02)
            .concat(section_03)
            .concat(section_05)
            .concat(section_07)
            .concat(section_0a)
    );

    console.log({ wasm });
    const importObject = {
        j: {
            o: () => {
                //canvas_render();
                //hexdump();
            },
        }
    };

    const module = await WebAssembly.compile(wasm.buffer);
    const instance = await WebAssembly.instantiate(module, importObject);
    const { exports } = instance;
    const { i, m } = exports;
    const memory_data = new Uint8ClampedArray(m.buffer);
    
    for(let index = 0; index < 128 * 128; index++) {
        i(index, Math.floor(Math.random() * 0xffffffff)); // AABBGGRR
    }
    canvas_render();
    hexdump();

})();

```

<script>
  const code = document.getElementsByClassName('language-javascript')[0].innerText;
  eval(code);
</script>
