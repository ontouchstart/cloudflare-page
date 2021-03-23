# WASM filters

This page and all the code it runs are in one page. You can view [the source code](https://github.com/ontouchstart/cloudflare-page/blob/master/src/wasm_filters.md).

## Output
<canvas id="canvas"></canvas>
<pre id="hex"></pre>

## Code

### Set up canvas

```javascript
const canvas = document.getElementById('canvas');
const hex_output = document.getElementById('hex');
const width = 128;
const height = 128;
canvas.width = width;
canvas.height = height;
canvas.style.border = '1px solid black';
const ctx = canvas.getContext('2d');
```

### Load avatar image to the canvas

```javascript
const avatar = new Image();
avatar.src = 'avatar.png';
await avatar.decode();
ctx.drawImage(avatar, 0, 0, 0x80, 0x80);
```

### Global variables and fucntions

```javascript
let imageData = ctx.getImageData(0, 0, width, height);
let x = 0;
let y = 0;
let offset = 0;
```

### Heap and imageData

```javascript
const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 });
let heap = new Uint8ClampedArray(mem.buffer);

for (let index = 0; index < 0x100000; index++) {
    heap[index] = imageData.data[index];
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
    check_boundary();
    hexdump();
};

canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('touchmove', move, false);

const hexdump = () => {
    const { data } = imageData;
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
    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = heap[i];
    }
    ctx.putImageData(imageData, 0, 0);
}
```

### WASM alpha_filter

```javascript
const magic = [0x00, 0x61, 0x73, 0x6d];
const version = [0x01, 0x00, 0x00, 0x00];

const alpha_filter = {
    section_01: [
        0x01, // type section
        0x04, // 4 bytes
        0x01, // number of functions
        0x60, // filter
        0x00, // no input
        0x00, // no output 
    ],
    section_02: [
        0x02, // import section
        0x08, // 8 bytes
        0x01, // 1 import
        0x01, // 1 byte
        0x6a, // j
        0x01, // 1 byte
        0x6d, // m
        0x02, // mem import
        0x00, // min pages
        0x01, // max pages
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
        0x30, // 48 bytes
        0x01, // number of function bodies
        0x2e, // 46 bytes
        0x01, 0x02, 0x7f,
        0x41, 0x00, // i32.const address = 0 
        0x21, 0x00, // save the address
        0x03, // loop
        0x40, // block
        0x20, 0x00, // get the address
        0x20, 0x00, // get the address
        0x28, 0x02, 0x00, // i32.load the value
        0x41, 0x80, 0x80, 0x80, 0xf8, 0x07, // i32.const 0x7f000000
        0x6b, // 0xff****** - 0x7f****** = 0x80******
        0x36, 0x02, 0x00, // store (paint the same value back, nothing changed)
        0x20, 0x00, // local.get address
        0x41, 0xff, 0xff, 0x01,
        0x4b, // i32.gt_u compare
        0x0d, 0x01, // br_if
        0x20, 0x00, // get address
        0x41, 0x04, // i32.const = 4
        0x6a, // i32.add 
        0x21, 0x00, // set new address
        0x0c, 
        0x00, // br 0 
        0x0b, // end block
        0x0b  // opcode for end
    ]
};

alpha_filter.wasm = new Uint8Array(
    magic.concat(version)
        .concat(alpha_filter.section_01)
        .concat(alpha_filter.section_02)
        .concat(alpha_filter.section_03)
        .concat(alpha_filter.section_07)
        .concat(alpha_filter.section_0a)
    );

```
### Instantiate WASM modules

```javascript
alpha_filter.module = await WebAssembly.compile(alpha_filter.wasm.buffer);
alpha_filter.importObject = { j: { m: mem } };

alpha_filter.instance = await WebAssembly.instantiate(alpha_filter.module, alpha_filter.importObject);
alpha_filter.instance.exports.filter();
canvas_render();
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
