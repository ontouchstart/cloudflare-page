# Code from Data

This page and all the code it runs are in one page. You can view [the source code](https://github.com/ontouchstart/cloudflare-page/blob/master/src/code_from_data.md).

[WASM bytecode](https://webassembly.github.io/spec/core/binary/modules.html#binary-module) is just a byte array that can be [validated](https://webassembly.github.io/spec/core/valid/index.html). If we want to write simple valid bytecode without relying [WASM Text Format](https://webassembly.github.io/spec/core/text/index.html) or even higher level [toolchains](https://emscripten.org/), attention need to be paid to the details. 

Let's start from scratch again to see if we can find simple, straightforward, easy to understand way to construct WASM bytecode from data in JS without using advanced features like types. The goal is not to make a robust general purpose [WASM AST](https://webassembly.github.io/spec/core/syntax/index.html#syntax) generator that covers all the cases but to make it easy to write small and simple WASM modules.

## Empty module

### Generator
```javascript
const wasm = async () => {
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    const bytes = magic.concat(version);
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