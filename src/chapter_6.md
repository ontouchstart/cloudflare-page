# WASM Memory without wasm-bindgen

A demo of WASM memory without [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen) based on the blog
[A practical guide to WebAssembly memory](https://radu-matei.com/blog/practical-guide-to-wasm-memory/).

`wasm/memory/src/lib.rs `
```rust
{{#include wasm/memory/src/lib.rs}}
#  fn main() {
#    let array = [1, 2, 3, 4, 5];
#    let ptr = alloc(array.len());  
#    println!("The length of the array {:?} is {}", array, array.len());
#    unsafe { 
#      println!("Copy the array into the memory block at {:?}", ptr);
#      std::ptr::copy(array.as_ptr(), ptr, array.len());
#      println!("array_sum = {}", array_sum(ptr, array.len()));
#    }
# }
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