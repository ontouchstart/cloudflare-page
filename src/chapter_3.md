# Simplest WASM in the Browser (all local)

`wasm/simplest_wasm/src/lib.rs`
```rust
{{#include wasm/simplest_wasm/src/lib.rs}}
# fn main() {
#    println!("The anwser is {}.", answer());
# }
```

`wasm/simplest_wasm/index.js`
```javascript
{{#include wasm/simplest_wasm/index.js}}
```

<div id="answer"></div>

## Reference:
- [JS FFI](https://rustwasm.github.io/docs/book/reference/js-ffi.html)
- [WebAssembly.instantiate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate)
<script src="wasm/simplest_wasm/index.js"></script>