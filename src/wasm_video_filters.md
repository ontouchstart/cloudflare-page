# WASM video filters
[source code](https://github.com/ontouchstart/cloudflare-page/blob/master/src/wasm_video_filters.md)

Now let's see if we can use the same filters on video. Our demo will be based on the MDN tutorial from [Manipulating video using canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas).

## Input
<video id="video" controls="true" src="https://mdn.github.io/dom-examples/canvas/chroma-keying/media/video.mp4" crossorigin="anonymous"></video>

## Output
<canvas id="input_canvas"></canvas>
<canvas id="output_canvas"></canvas>
<pre id="hex"></pre>

## Code

### Get video information

```javascript
const video = document.getElementById('video');
const width = 320;
const height = 192;
```

### Set up canvas

```javascript
const hex_output = document.getElementById('hex');

const input_canvas = document.getElementById('input_canvas');
input_canvas.width = width;
input_canvas.height = height;
const input_ctx = input_canvas.getContext('2d');
input_ctx.fillStyle = 'green';
input_ctx.fillRect(0, 0, width, height);
```

```javascript
const output_canvas = document.getElementById('output_canvas');
output_canvas.width = width;
output_canvas.height = height;
output_canvas.style.background = 'url(avatar.png)';
const output_ctx = output_canvas.getContext('2d');
output_ctx.fillStyle = 'blue';
output_ctx.fillRect(0, 0, width, height);

```

### Global variables and fucntions

```javascript
let input_imageData = input_ctx.getImageData(0, 0, width, height);
let output_imageData = output_ctx.getImageData(0, 0, width, height);
const length = input_imageData.data.length;
let x = 0;
let y = 0;
let offset = 0;
```

### Heap and imageData

```javascript
const mem = new WebAssembly.Memory({ initial: 4, maximum: 4 });
let heap = new Uint8ClampedArray(mem.buffer);

for (let index = 0; index < length; index++) {
    heap[index] = input_imageData.data[index];
};
```
### Canvas UI

```javascript
const check_boundary = () => {
    if (x < 0) { x = 0 }
    if (x > width - 1) { x = 0 }
    if (y < 0) { y = 0 }
    if (y > height - 1) { y = 0 }
    offset = 4 * (y * width + x);
}

const move = (e) => {
    e.preventDefault();
    const rect = output_canvas.getBoundingClientRect();

    const { changedTouches } = e;
    if (changedTouches && changedTouches[0]) {
        x = Math.floor(changedTouches[0].pageX - output_canvas.offsetLeft);
        y = Math.floor(changedTouches[0].pageY - output_canvas.offsetTop);
    }
    else {
        x = Math.floor(e.clientX - rect.left);
        y = Math.floor(e.clientY - rect.top);
    }
    check_boundary();
    hexdump();
};

output_canvas.addEventListener('mousemove', move, false);
output_canvas.addEventListener('touchmove', move, false);

const hexdump = () => {
    const { data } = output_imageData;
    let output = '';
    for (let i = offset; i < offset + 0x100; i += 4) {
        if (i < data.length - 4) {
            for (let j = 3; j > -1; j--) {
                if (data[i + j] < 0x10) {
                    output += `0${data[i + j].toString(16)}`;
                } else {
                    output += `${data[i + j].toString(16)}`;
                }
            }
            if (((i - offset) % 0x20) === 0x1c) {
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
    for (let i = 0; i < length; i++) {
        output_imageData.data[i] = heap[i];
    }
    output_ctx.putImageData(output_imageData, 0, 0);
}
```

### WASM 

[RTFM](https://webassembly.github.io/spec/core/binary/modules.html#binary-module)


```javascript
const magic = [0x00, 0x61, 0x73, 0x6d];
const version = [0x01, 0x00, 0x00, 0x00];
```

### main module

```javascript
const main = {
    section_01: [
        0x01, // type section
        0x15, // 21 bytes
        0x04, // number of functions
        0x60, // import alpha filter
        0x01, // takes 1 param ()
        0x7f, // param i32
        0x01, 
        0x7f, // result i32
        0x60, // import grayscale filter
        0x01, // takes 1 param ()
        0x7f, // param i32
        0x01, 
        0x7f, // result i32
        0x60, // export alpha
        0x02, // takes two params (range)
        0x7f, // param i32
        0x7f, // param i32
        0x00, // no output
        0x60, // export grayscale
        0x02, // takes two params (range)
        0x7f, // param i32
        0x7f, // param i32
        0x00, // no output
    ],
    section_02: [
        0x02, // import section
        0x20, // 32 bytes
        0x03, // 3 imports
        0x01, // 1 byte
        0x6a, // j
        0x01, // 1 byte
        0x6d, // m
        0x02, // mem import
        0x00, // min pages
        0x01, // max pages
        0x01, // 1 byte
        0x6a, // j
        0x05, // 5 byte name
        0x61, // a
        0x6c, // l
        0x70, // p
        0x68, // h
        0x61, // a
        0x00, // func
        0x00, // alpha filter
        0x01, // 1 byte
        0x6a, // j
        0x09, // 9 byte name
        0x67, // g
        0x72, // r
        0x61, // a
        0x79, // y
        0x73, // s
        0x63, // c
        0x61, // a
        0x6c, // l
        0x65, // e
        0x00, // func
        0x01, // grayscale filter
    ],
    section_03: [
        0x03, // func section
        0x03, // 2 bytes
        0x02, // number of functions
        0x02, // alpha
        0x03, // grayscale 
    ],
    section_07: [
        0x07, // export section
        0x15, // 21 bytes
        0x02, // number of exports
        0x05, // 5 byte name
        0x61, // a
        0x6c, // l
        0x70, // p
        0x68, // h
        0x61, // a
        0x00, // function
        0x02,  // alpha
        0x09, // 9 byte name
        0x67, // g
        0x72, // r
        0x61, // a
        0x79, // y
        0x73, // s
        0x63, // c
        0x61, // a
        0x6c, // l
        0x65, // e
        0x00, // function
        0x03  // grayscale
    ],
    section_0a: [
        0x0a, // code section 
        0x45, // 69 bytes
        0x02, // 2 function body
        0x21, // 33 bytes
        0x00, // no more local 
        0x03, // loop
        0x40, // block
        0x20, 0x00, // get address
        0x20, 0x00, // get address
        0x28, 0x02, 0x00, // i32.load the value
        0x10, 0x00, // call alpha
        0x36, 0x02, 0x00, // store 
        0x20, 0x00, // get address
        0x20, 0x01, // upper limit
        0x4b, // i32.gt_u compare
        0x0d, 0x01, // br_if
        0x20, 0x00, // get address
        0x41, 0x04, // i32.const = 4
        0x6a, // i32.add 
        0x21, 0x00, // set new address
        0x0c, 0x00, // br 0 
        0x0b, // end block
        0x0b,  // end code
        0x21, // 33 bytes
        0x00, // no more local 
        0x03, // loop
        0x40, // block
        0x20, 0x00, // get address
        0x20, 0x00, // get address
        0x28, 0x02, 0x00, // i32.load the value
        0x10, 0x01, // call grayscale
        0x36, 0x02, 0x00, // store 
        0x20, 0x00, // get address
        0x20, 0x01, // upper limit
        0x4b, // i32.gt_u compare
        0x0d, 0x01, // br_if
        0x20, 0x00, // get address
        0x41, 0x04, // i32.const = 4
        0x6a, // i32.add 
        0x21, 0x00, // set new address
        0x0c, 0x00, // br 0 
        0x0b, // end block
        0x0b  // end code
    ]
};

main.wasm = new Uint8Array(
    magic.concat(version)
        .concat(main.section_01)
        .concat(main.section_02)
        .concat(main.section_03)
        .concat(main.section_07)
        .concat(main.section_0a)
    );

```


### alpha_filter

```javascript
const alpha_filter = {
    section_01: [
        0x01, // type section
        0x06, // 6 bytes
        0x01, // number of functions
        0x60, // filter
        0x01, // takes 1 param ()
        0x7f, // param i32
        0x01, 
        0x7f // result i32
    ],
    section_03: [
        0x03, // func section
        0x02, // 2 bytes
        0x01, // number of functions
        0x00  // filter
    ],
    section_07: [
        0x07, // export section
        0x0a, // 10 bytes
        0x01, // number of exports
        0x06, // 6 byte name
        0x66, // f
        0x69, // i
        0x6c, // l
        0x74, // t
        0x65, // e
        0x72, // r
        0x00, // function
        0x00  // filter
    ],
    section_0a: [
        0x0a, // code section
        0x39, // 57 bytes
        0x01, // number of function
        0x37, // 55 bytes filter
        0x00, // no extra local var
        0x20, 0x00, // local.get
        0x41, 0xff, 0x01, // mask for r i32.const 0x000000ff
        0x71, // i32.and
        0x41, 0xe4, 0x00, //
        0x4b, // i32.gt_u 
        0x04, // r > 100
        0x40, // block
        0x20, 0x00, // local.get
        0x41, 0x80, 0xfe, 0x03, // mask for g i32.const 0x0000ff00
        0x71, // i32.and
        0x41, 0x08, 0x76, // right shift two bytes
        0x41, 0xe4, 0x00, //
        0x4b, // i32.gt_u 
        0x04, // g > 100
        0x40, // block
        0x20, 0x00, // local.get
        0x41, 0x80, 0x80, 0xfc, 0x07, // mask for b i32.const 0x00ff0000
        0x71, // i32.and
        0x41, 0x10, 0x76, // right shift four bytes
        0x41, 0x20, //
        0x49, // i32.lt_u 
        0x04, // b < 43
        0x40, // block
        0x41, 0x00,
        0x21, 0x00, // set transparent pixel
        0x0b,
        0x0b,
        0x0b,
        0x20, 0x00, // local.get
        0x0b // opcode for end
    ]
};

alpha_filter.wasm = new Uint8Array(
    magic.concat(version)
        .concat(alpha_filter.section_01)
        .concat(alpha_filter.section_03)
        .concat(alpha_filter.section_07)
        .concat(alpha_filter.section_0a)
    );

```

### grayscale_filter

```javascript
const grayscale_filter = {
    section_01: [
        0x01, // type section
        0x06, // 6 bytes
        0x01, // number of functions
        0x60, // filter
        0x01, // takes 1 param ()
        0x7f, // param i32
        0x01, 
        0x7f // result i32
    ],
    section_03: [
        0x03, // func section
        0x02, // 2 bytes
        0x01, // number of functions
        0x00  // filter
    ],
    section_07: [
        0x07, // export section
        0x0a, // 10 bytes
        0x01, // number of exports
        0x06, // 6 byte name
        0x66, // f
        0x69, // i
        0x6c, // l
        0x74, // t
        0x65, // e
        0x72, // r
        0x00, // function
        0x00  // filter
    ],
    section_0a: [
        0x0a, // code section
        0x4b, // 75 bytes
        0x01, // number of function
        0x49, // 73 bytes filter
        0x00, // no extra local var
        0x20, 0x00, // local.get
        0x41, 0xff, 0x01, // mask for r i32.const 0x000000ff
        0x71, // i32.and
        0xb3, // f32.convert_i32_u
        0x43, 0x6c, 0x09, 0x99, 0x3e, // f32.const 0.2989
        0x94, // f32.mul
        0x20, 0x00, // local.get
        0x41, 0x80, 0xfe, 0x03, // mask for g i32.const 0x0000ff00
        0x71, // i32.and
        0x41, 0x08, 0x76, // right shift two bytes
        0xb3, // f32.convert_i32_u
        0x43, 0xa2, 0x45, 0x16, 0x3f, // f32.const 0.5870
        0x94, // f32.mul
        0x92, // f32.add
        0x20, 0x00, // local.get
        0x41, 0x80, 0x80, 0xfc, 0x07, // mask for b i32.const 0x00ff0000
        0x71, // i32.and
        0x41, 0x10, 0x76, // right shift four bytes
        0xb3, // f32.convert_i32_u
        0x43, 0xd5, 0x78, 0xe9, 0x3d, // f32.const 0.1140
        0x94, // f32.mul
        0x92, // f32.add
        0xa9, // i32.trunc_f32_u
        0x22, 0x00, // local.tee (add r channel)
        0x20, 0x00, // local.get
        0x41, 0x08, 0x74, 0x6a, // add g channel
        0x20, 0x00, // local.get
        0x41, 0x10, 0x74, 0x6a, // add b channel
        0x41, 0x80, 0x80, 0x80, 0x78, // a i32.const 0xff000000
        0x6a, // add a channel 
        0x0b // opcode for end
    ]
};

grayscale_filter.wasm = new Uint8Array(
    magic.concat(version)
        .concat(grayscale_filter.section_01)
        .concat(grayscale_filter.section_03)
        .concat(grayscale_filter.section_07)
        .concat(grayscale_filter.section_0a)
    );

```

### Instantiate WASM modules

```javascript

alpha_filter.module = await WebAssembly.compile(alpha_filter.wasm.buffer);
alpha_filter.importObject = { };
alpha_filter.instance = await WebAssembly.instantiate(
    alpha_filter.module, 
    alpha_filter.importObject);

grayscale_filter.module = await WebAssembly.compile(grayscale_filter.wasm.buffer);
grayscale_filter.importObject = { };
grayscale_filter.instance = await WebAssembly.instantiate(
    grayscale_filter.module, 
    grayscale_filter.importObject);

main.module = await WebAssembly.compile(main.wasm.buffer);
main.importObject = { 
    j: {
         m: mem, 
         alpha: alpha_filter.instance.exports.filter,
         grayscale: grayscale_filter.instance.exports.filter 
    }
};

main.instance = await WebAssembly.instantiate(
    main.module, 
    main.importObject);



const play = () =>{
    if (video.paused || video.ended) {
      return;
    }

    input_ctx.drawImage(video, 0, 0, width, height);
    input_imageData = input_ctx.getImageData(0, 0, width, height);
    
    for (let index = 0; index < length; index++) {
       heap[index] = input_imageData.data[index];
    };

    main.instance.exports.alpha(
        4 * Math.floor(length / 12),
        4 * Math.floor(length / 6));
    
    main.instance.exports.grayscale(
        4 * Math.floor(length / 6), 
        4 * Math.floor(length / 4 -  2));

    canvas_render();
    setTimeout(() => { play()}, 0); // loop
};

video.addEventListener('play', play, false);

hexdump();
```

<script>
  let code = '(async () => {';
  const code_sections = document.getElementsByClassName('language-javascript');
  for(let i = 0; i < code_sections.length; i++) {
      code += code_sections[i].innerText;
  }
  code += '})()';
  eval(code);
</script>
