# WASM Custom Sections (Read Only)

`src/lib.js`
```rust
#[link_section = "data"]
pub static SECTION: [u8; 12] = *b"Hello World!";
```

Javascript
```javascript
(async () => {
    var importObject = {};
    const response = await fetch('wasm/link_section/link_section.wasm');
    const bytes = await response.arrayBuffer();
    const mod = new WebAssembly.Module(bytes);
    
    console.log({ response, bytes, mod});
    const sections = await WebAssembly.Module.customSections(mod, "data");
    const decoder = new TextDecoder();
    const text = decoder.decode(sections[0]);
    console.log({ response, mod, sections })
    document.getElementById('answer').innerHTML = `
    <h2>${text}</h2>
    `
})();
```

<div id="answer"></div>

## Reference:
- [JS FFI Custom Sections](https://rustwasm.github.io/docs/book/reference/js-ffi.html#custom-sections)
- []()
- [WebAssembly.Module() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module/Module)
<script>
(async () => {
    var importObject = {};
    const response = await fetch('wasm/link_section/link_section.wasm');
    const bytes = await response.arrayBuffer();
    const mod = new WebAssembly.Module(bytes);
    
    console.log({ response, bytes, mod});
    const sections = await WebAssembly.Module.customSections(mod, "data");
    const decoder = new TextDecoder();
    const text = decoder.decode(sections[0]);
    console.log({ response, mod, sections })
    document.getElementById('answer').innerHTML = `
    <h2>${text}</h2>
    `
})();
</script>
