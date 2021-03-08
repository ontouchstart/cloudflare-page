# WASM Memory without wasm-bindgen

A demo of WASM memory without [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen) based on the blog
[A practical guide to WebAssembly memory](https://radu-matei.com/blog/practical-guide-to-wasm-memory/).

`src/lib.js`
```rust
#[no_mangle]
pub fn alloc(len: usize) -> *mut u8 {
    let mut buf = Vec::with_capacity(len);
    let ptr = buf.as_mut_ptr();
    std::mem::forget(buf);
    return ptr;
}

#[no_mangle]
pub unsafe fn array_sum(ptr: *mut u8, len: usize) -> u8 {
    let data = Vec::from_raw_parts(ptr, len, len);
    data.iter().sum()
}

```

Javascript
```javascript
function copyMemory(data, instance) {
  var ptr = instance.exports.alloc(data.length);
  var mem = new Uint8Array(instance.exports.memory.buffer, ptr, data.length);
  mem.set(new Uint8Array(data));
  return ptr;
}
```

```javascript
function arraySum(array, instance) {
  var ptr = copyMemory(array, instance);
  var res = instance.exports.array_sum(ptr, array.length);
  return res;
}
```

```javascript
(async () => {
    var importObject = {};
    const { instance } = await WebAssembly.instantiateStreaming(fetch('wasm/memory/memory.wasm'), importObject);
    console.log({instance});
    document.getElementById('answer').innerHTML = `
    <h2>arraySum([1, 2, 3, 4, 5], instance) = ${arraySum([1, 2, 3, 4, 5], instance)}</h2>
    See details in the console log.
    `
})();
```

<div id="answer"></div>

## Reference:
- [Passing arrays to Rust WebAssembly modules](https://radu-matei.com/blog/practical-guide-to-wasm-memory/#passing-arrays-to-rust-webassembly-modules)
- [JS FFI](https://rustwasm.github.io/docs/book/reference/js-ffi.html)
- [WebAssembly.instantiateStreaming()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming)
<script>
function copyMemory(data, instance) {
  var ptr = instance.exports.alloc(data.length);
  var mem = new Uint8Array(instance.exports.memory.buffer, ptr, data.length);
  mem.set(new Uint8Array(data));
  return ptr;
}

function arraySum(array, instance) {
  var ptr = copyMemory(array, instance);
  var res = instance.exports.array_sum(ptr, array.length);
  return res;
}

(async () => {
    var importObject = {};
    const { instance } = await WebAssembly.instantiateStreaming(fetch('wasm/memory/memory.wasm'), importObject);
    console.log({instance});
    document.getElementById('answer').innerHTML = `
    <h2>arraySum([1, 2, 3, 4, 5], instance) = ${arraySum([1, 2, 3, 4, 5], instance)}</h2>
    See details in the console log.
    `
})();
</script>