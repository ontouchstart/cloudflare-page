# Code from Data

This page and all the code it runs are in one page. You can view [the source code](https://github.com/ontouchstart/cloudflare-page/blob/master/src/code_from_data.md).

[WASM bytecode](https://webassembly.github.io/spec/core/binary/modules.html#binary-module) is just a byte array that can be [validated](https://webassembly.github.io/spec/core/valid/index.html). If we want to write simple valid bytecode without relying [WASM Text Format](https://webassembly.github.io/spec/core/text/index.html) or even higher level [toolchains](https://emscripten.org/), attention need to be paid to the details. 

Let's start from scratch again to see if we can find simple, straightforward, easy to understand way to construct WASM bytecode from data in JS without using advanced features like types. The goal is not to make a robust general purpose [WASM AST](https://webassembly.github.io/spec/core/syntax/index.html#syntax) generator that covers all the cases but to make it easy to write small and simple WASM modules.

## Empty module

### Generator

We use mutable `let wasm = ` so that we can update it in future sections.

```javascript
let wasm = async () => {
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const bytes = magic.concat(version);
    console.log({ bytes });
    return await WebAssembly.compile((new Uint8Array(bytes)).buffer);
}
```

### Test

```javascript
{ // begin block namespace
    const module = await wasm(); 
    const env = {}
    const instance = await WebAssembly.instantiate(module, env);
    console.log('empty module', instance);
} // end block namescape
```

## Module sections

The binary encoding of modules is organized into [13 optional sections](https://webassembly.github.io/spec/core/binary/modules.html). 
We can rewrite our wasm generate to take an array of 13 empty arrays.

```javascript
const empty_data = [
    [], // 0 custom section
    [], // 1 type section
    [], // 2 import section
    [], // 3 function section 
    [], // 4 table section
    [], // 5 memory section
    [], // 6 global section
    [], // 7 export section
    [], // 8 start section
    [], // 9 element section
    [], // 10 code section
    [], // 11 data section
    [], // 12 data count section
];

wasm = async (data = empty_data) => {
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    let bytes = magic.concat(version);
    for(let i = 0; i < data.length; i++ ) {
        bytes = bytes.concat(data[i]);
    }
    console.log({ bytes });
    return await WebAssembly.compile((new Uint8Array(bytes)).buffer);
}
```

### Test

```javascript
{ // begin block namespace
    const module = await wasm(); 
    const env = {}
    const instance = await WebAssembly.instantiate(module, env);
    console.log('empty sections module', instance);
} // end block namescape
```

### Think in arrays

Since WASM is an abstraction on stack machine and linear memory, one of the goals of this exercise of generating WASM bytecode from data is to help programming **think in arrays**. 

Let's see if we can get rid of the noise of variable names or labels so that we focus on the basic concepts of array and index. 

### Empty function

```
$ cat empty_func.wat
(func)
$ wat2wasm empty_func.wat
$ hexdump -C empty_func.wasm 
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 03 02  |.asm.......`....|
00000010  01 00 0a 04 01 02 00 0b                           |........|
00000018
$ 
```

```javascript
let section = (i, data) => {
    if(i === 0x01) {
        return [i, 0x04, 0x01, 0x60, 0x00, 0x00];
    }
    if(i === 0x03) {
        return [i, 0x02, 0x01, 0x00];
    }
    if(i === 0x0a) {
        return [i, 0x04, 0x01, 0x02, 0x00, 0x0b];
    }
    return [];
}

wasm = async (data = empty_data) => {
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    let bytes = magic.concat(version);
    for(let i = 0; i < data.length; i++) {
        console.log('section', i, section(i, data));
        bytes = bytes.concat(section(i, data));
    }
    console.log({ bytes });
    return await WebAssembly.compile((new Uint8Array(bytes)).buffer);
}
```

### Test

```javascript
{ // begin block namespace
    const module = await wasm(); 
    const env = {}
    const instance = await WebAssembly.instantiate(module, env);
    console.log('empty_func', instance);
} // end block namescape
```

### Empty function export

```
$ cat empty_func_export.wat  
(func (export "f"))
$ hexdump -C empty_func_export.wasm 
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 03 02  |.asm.......`....|
00000010  01 00 07 05 01 01 66 00  00 0a 04 01 02 00 0b     |......f........|
0000001f

```

```javascript
section = (i, data) => {
    if(i === 0x01) {
        return [i, 0x04, 0x01, 0x60, 0x00, 0x00];
    }
    if(i === 0x03) {
        return [i, 0x02, 0x01, 0x00];
    }
    if(i === 0x07) {
        if(data[i].length === 1) {
            count = 0x01;
            const name = data[i][0].split('');
            const total = name.length + 4;
            return [
              i, 
              total, 
              count, 
              name.length, name.map(d => (d.charCodeAt(0))),
              0x00,  
              0x00
            ].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x0a) {
        return [i, 0x04, 0x01, 0x02, 0x00, 0x0b];
    }
    return [];
}

wasm = async (data = empty_data) => {
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    let bytes = magic.concat(version);
    for(let i = 0; i < data.length; i++) {
        console.log('section', i, section(i, data));
        bytes = bytes.concat(section(i, data));
    }
    console.log({ bytes });
    return await WebAssembly.compile((new Uint8Array(bytes)).buffer);
}
```

### Test

```javascript
{ // begin block namespace
    const data = [
        [], // 0 custom section
        [], // 1 type section
        [], // 2 import section memory type
        [], // 3 function section 
        [], // 4 table section
        [], // 5 memory section
        [], // 6 global section
        ["f"], // 7 export section
        [], // 8 start section
        [], // 9 element section
        [], // 10 code section
        [], // 11 data section
        [], // 12 data count section
    ];
    const module = await wasm(data); 
    const env = {}
    const instance = await WebAssembly.instantiate(module, env);
    const { exports } = instance;
    console.log('empty_func_export', instance, exports);
} // end block namescape
```


### Import memory

```
$cat memory.wat 
(memory (import "j" "m") 1)
$ wat2wasm memory.wat
$ hexdump -C memory.wasm
00000000  00 61 73 6d 01 00 00 00  02 08 01 01 6a 01 6d 02  |.asm........j.m.|
00000010  00 01                                             |..|
00000012
```

```javascript
section = (i, data) => {
    if(i === 0x01) {
        return [i, 0x04, 0x01, 0x60, 0x00, 0x00];
    }
    if(i === 0x02) {
        return [i, 0x08, 0x01, 0x01, 0x6a, 0x01, 0x6d, 0x02, 0x00, 0x01];
    }
    if(i === 0x03) {
        return [i, 0x02, 0x01, 0x00];
    }
    if(i === 0x07) {
        if(data[i].length === 1) {
            count = 0x01;
            const name = data[i][0].split('');
            const total = name.length + 4;
            return [
              i, 
              total, 
              count, 
              name.length, name.map(d => (d.charCodeAt(0))),
              0x00,  
              0x00
            ].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x0a) {
        return [i, 0x04, 0x01, 0x02, 0x00, 0x0b];
    }
    return [];
}
```

### Test
```javascript
{ // begin block namespace
    const module = await wasm();
    const m = new WebAssembly.Memory({ initial: 1, maximum: 1 }); 
    const env = { j: { m }};
    const instance = await WebAssembly.instantiate(module, env);
    console.log('memory', instance);
} // end block namescape
```

### Import memory with a pair of mod and name

[Import Section](https://webassembly.github.io/spec/core/binary/modules.html#binary-importsec)

```
$ cat memory.wat        
(memory (import "js" "mem") 1 )
$ wat2wasm memory.wat
$ hexdump -C memory.wasm 
00000000  00 61 73 6d 01 00 00 00  02 0b 01 02 6a 73 03 6d  |.asm........js.m|
00000010  65 6d 02 00 01                                    |em...|
00000015
```

```javascript
section = (i, data) => {
    if(i === 0x01) {
        return [i, 0x04, 0x01, 0x60, 0x00, 0x00];
    }
    if(i === 0x02) {
        if(data[i].length === 5) {
            const mod = data[i][0].split('');
            const name = data[i][1].split('');
            const type = data[i][2];
            const min = data[i][3];
            const max = data[i][4];
            const total = mod.length + name.length + 6;
            return [
              i, 
              total, 
              0x01, 
              mod.length, mod.map(d => (d.charCodeAt(0))),
              name.length, name.map(d => (d.charCodeAt(0))),
              type, 
              min, 
              max].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x03) {
        return [i, 0x02, 0x01, 0x00];
    }
    if(i === 0x07) {
        if(data[i].length === 1) {
            count = 0x01;
            const name = data[i][0].split('');
            const total = name.length + 4;
            return [
              i, 
              total, 
              count, 
              name.length, name.map(d => (d.charCodeAt(0))),
              0x00,  
              0x00
            ].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x0a) {
        return [i, 0x04, 0x01, 0x02, 0x00, 0x0b];
    }
    return [];
}
```

### Test
```javascript
{ // begin block namespace
    const data = [
        [], // 0 custom section
        [], // 1 type section
        ["js", "mem", 0x02, 0x00, 0x01], // 2 import section memory type
        [], // 3 function section 
        [], // 4 table section
        [], // 5 memory section
        [], // 6 global section
        ["fun"], // 7 export section
        [], // 8 start section
        [], // 9 element section
        [], // 10 code section
        [], // 11 data section
        [], // 12 data count section
    ];
    const module = await wasm(data);
    const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 }); 
    const env = { js: { mem }};
    const instance = await WebAssembly.instantiate(module, env);
    const { exports } = instance;
    console.log('import memory js.mem, export fun()', instance, exports);
    exports.fun();
} // end block namescape
```

### Start section

```
$ cat start.wat
(module (func) (start 0))
$ hexdump -C start.wasm
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 03 02  |.asm.......`....|
00000010  01 00 08 01 00 0a 04 01  02 00 0b                 |...........|
0000001b
```

```javascript
section = (i, data) => {
    if(i === 0x01) { // type
        return [i, 0x04, 0x01, 0x60, 0x00, 0x00];
    }
    if(i === 0x02) { // import
        if(data[i].length === 5) {
            const mod = data[i][0].split('');
            const name = data[i][1].split('');
            const type = data[i][2];
            const min = data[i][3];
            const max = data[i][4];
            const total = mod.length + name.length + 6;
            return [
              i, 
              total, 
              0x01, 
              mod.length, mod.map(d => (d.charCodeAt(0))),
              name.length, name.map(d => (d.charCodeAt(0))),
              type, 
              min, 
              max].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x03) { // func
        return [i, 0x02, 0x01, 0x00];
    }
    if(i === 0x07) { // export
        if(data[i].length === 1) {
            count = 0x01;
            const name = data[i][0].split('');
            const total = name.length + 4;
            return [
              i, 
              total, 
              count, 
              name.length, name.map(d => (d.charCodeAt(0))),
              0x00,  
              0x00
            ].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x08) { // start
        if(data[i].length === 1) {
          return [i, 0x01, data[i][0]];
        }
        else {
            return [];
        }
    }
    if(i === 0x0a) { // code
        return [i, 0x04, 0x01, 0x02, 0x00, 0x0b];
    }
    return [];
}
```

### Test

```javascript
{ // begin block namespace
    const data = [
        [], // 0 custom section
        [], // 1 type section
        ["js", "mem", 0x02, 0x00, 0x01], // 2 import section memory type
        [], // 3 function section 
        [], // 4 table section
        [], // 5 memory section
        [], // 6 global section
        [], // 7 export section
        [0x00], // 8 start section
        [], // 9 element section
        [], // 10 code section
        [], // 11 data section
        [], // 12 data count section
    ];
    const module = await wasm(data);
    const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 }); 
    const env = { js: { mem }};
    const instance = await WebAssembly.instantiate(module, env);
    console.log('import memory js.mem, with start but no export', instance);
} // end block namescape
```

### A minimum wasm program

Set the first 4 byte of the memory to i32 `0x01`.

<canvas id="minimum_canvas"></canvas>
<pre id="minimum_hex"></pre>

```javascript
section = (i, data) => {
    if(i === 0x01) { // type
        return [i, 0x04, 0x01, 0x60, 0x00, 0x00];
    }
    if(i === 0x02) { // import
        if(data[i].length === 5) {
            const mod = data[i][0].split('');
            const name = data[i][1].split('');
            const type = data[i][2];
            const min = data[i][3];
            const max = data[i][4];
            const total = mod.length + name.length + 6;
            return [
              i, 
              total, 
              0x01, 
              mod.length, mod.map(d => (d.charCodeAt(0))),
              name.length, name.map(d => (d.charCodeAt(0))),
              type, 
              min, 
              max].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x03) { // func
        return [i, 0x02, 0x01, 0x00];
    }
    if(i === 0x07) { // export
        if(data[i].length === 1) {
            count = 0x01;
            const name = data[i][0].split('');
            const total = name.length + 4;
            return [
              i, 
              total, 
              count, 
              name.length, name.map(d => (d.charCodeAt(0))),
              0x00,  
              0x00
            ].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x08) { // start
        if(data[i].length === 1) {
          return [i, 0x01, data[i][0]];
        }
        else {
            return [];
        }
    }
    if(i === 0x0a) { // code
        if(data[i].length > 1 ) {
            const total = data[i].length + 4;
            return [i, total, 0x01, data[i].length + 2, 0x00, data[i], 0x0b].flat();
           
        }
        else {
          return [i, 0x04, 0x01, 0x02, 0x00, 0x0b];
        }
    }
    return [];
}
```

```javascript
{
  const canvas = document.getElementById('minimum_canvas');
  const hex = document.getElementById('minimum_hex');
  const width = 0x80; // 128
  const height = 0x80;
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = '1px solid black';
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#00000000';
  ctx.fillRect(0, 0, width, height);
  let imageData = ctx.getImageData(0, 0, width, height);
  let x = 0;
  let y = 0;
  let offset = 0;
  const length = imageData.data.length;
  const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 });
  let heap = new Uint8ClampedArray(mem.buffer);
  for (let index = 0; index < length; index++) {
    heap[index] = imageData.data[index];
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
    hex.innerHTML = `
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
        imageData.data[i] = heap[i];
    }
    ctx.putImageData(imageData, 0, 0);
}

  const code = [
    0x41, 0x00, // address: i32.const 0x00
    0x41, 0x01, // value: i32.const 0x01
    0x36, 0x02, 0x00, // i32.store 
  ];
  
  const data = [
        [], // 0 custom section
        [], // 1 type section
        ["js", "mem", 0x02, 0x00, 0x01], // 2 import section memory type
        [], // 3 function section 
        [], // 4 table section
        [], // 5 memory section
        [], // 6 global section
        [], // 7 export section
        [0x00], // 8 start section
        [], // 9 element section
        code, // 10 code section store 0x01 at the first byte
        [], // 11 data section
        [], // 12 data count section
    ];
    const module = await wasm(data);
    const env = { js: { mem }};
    const instance = await WebAssembly.instantiate(module, env);
    console.log('a minimum wasm program', instance);
    
    canvas_render();
    hexdump();
}

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
