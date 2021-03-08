# Simplest WASM in the Browser (all local)

`src/lib.js`
```rust
#[no_mangle]
pub fn answer() -> u32 {
	42
}
```

Javascript
```javascript
(async () => {
    var importObject = {};
    const response = await fetch('wasm/simplest_wasm/simplest_wasm.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    console.log({response, bytes, instance});
    document.getElementById('answer').innerHTML = `
    <h2>The answer is ${instance.exports.answer()}</h2>
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
    const response = await fetch('wasm/simplest_wasm/simplest_wasm.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    console.log({response, bytes, instance});
    document.getElementById('answer').innerHTML = `
    <h2>The answer is ${instance.exports.answer()}</h2>
    See details in the console log.
    `
})();
</script>