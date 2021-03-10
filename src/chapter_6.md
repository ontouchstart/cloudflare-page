# WASM Memory without wasm-bindgen

A demo of WASM memory without [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen) based on the blog
[A practical guide to WebAssembly memory](https://radu-matei.com/blog/practical-guide-to-wasm-memory/).

`wasm/memory/src/lib.rs `
```rust
{{#include wasm/memory/src/lib.rs}}
```

`wasm/memory/index.js`
```javascript
{{#include wasm/memory/index.js}}
```

<div id="answer"></div>

## Reference:
- [Passing arrays to Rust WebAssembly modules](https://radu-matei.com/blog/practical-guide-to-wasm-memory/#passing-arrays-to-rust-webassembly-modules)
- [JS FFI](https://rustwasm.github.io/docs/book/reference/js-ffi.html)
- [WebAssembly.instantiate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate)

<script src="wasm/memory/index.js"></script>