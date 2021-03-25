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
    console.log('instance of an empty module', instance);
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
    console.log('instance of an empty module', instance);
} // end block namescape
```

## Think in arrays

Since WASM is an abstraction on stack machine and linear memory, one of the goals of this exercise of generating WASM bytecode from data is to help programming **think in arrays**. 

Let's see if we can get rid of the noise of variable names or labels so that we focus on the basic concepts of array and index. 

## Empty function

```
$ cat empty.wat
(module (func))
$ hexdump -C empty.wasm 
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
    console.log('instance of an empty module', instance);
} // end block namescape
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