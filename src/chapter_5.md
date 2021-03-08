# Call WASM function in the browser

`src/lib.js`
```rust
#[no_mangle]
pub fn double(x: u32) -> u32 {
    x + x
}
```

Javascript
```javascript
(async () => {
    var importObject = {};
    const response = await fetch('wasm/double/double.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    console.log({response, bytes, instance});
    document.getElementById('answer').innerHTML = `
    <h2>42 + 42 = ${instance.exports.double(42)}</h2>
    See details in the console log.
    `
})();
```

<div id="answer"></div>

## Reference:
- [JS FFI](https://rustwasm.github.io/docs/book/reference/js-ffi.html)
- [WebAssembly.instantiate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate)
<script>
(async () => {
    var importObject = {};
    const response = await fetch('wasm/double/double.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    console.log({response, bytes, instance});
    document.getElementById('answer').innerHTML = `
    <h2>42 + 42 = ${instance.exports.double(42)}</h2>
    See details in the console log.
    `
})();
</script>