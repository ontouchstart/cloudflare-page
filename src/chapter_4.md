# WASM Custom Sections (Read Only)

`src/lib.js`
```rust
#[link_section = "data"]
pub static SECTION: [u8; 12] = *b"Hello World!";
```

Javascript
```javascript
(async () => {
    const response = await fetch('wasm/link_section/link_section.wasm');
    const mod = await WebAssembly.compileStreaming(response);
    const sections = await WebAssembly.Module.customSections(mod, "data");
    const decoder = new TextDecoder();
    const text = decoder.decode(sections[0]);
    document.getElementById('answer').innerHTML = `
    <h2>${text}</h2>
    `
})();
```

<div id="answer"></div>

## Reference:
- [JS FFI Custom Sections](https://rustwasm.github.io/docs/book/reference/js-ffi.html#custom-sections)
- [WebAssembly.compileStreaming()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/compileStreaming)
- [WebAssembly.Module.customSections()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module/customSections)
<script>
(async () => {
    var importObject = {};
    const response = await fetch('wasm/link_section/link_section.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    
    console.log({ response, bytes, instance});
    /*
    const response = await fetch('wasm/link_section/link_section.wasm');
    const mod = await WebAssembly.compileStreaming(response);
    const sections = await WebAssembly.Module.customSections(mod, "data");
    const decoder = new TextDecoder();
    const text = decoder.decode(sections[0]);
    console.log({ response, mod, sections })
    document.getElementById('answer').innerHTML = `
    <h2>${text}</h2>
    `
    */
})();
</script>
