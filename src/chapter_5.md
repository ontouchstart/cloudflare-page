# Call WASM function in the browser

`wasm/double/src/lib.rs`
```rust
{{#include wasm/double/src/lib.rs}}
# fn main() {
#    let x = 42;
#    println!("The double of {} is {}.", x, double(x));
# }
```
`wasm/double/index.rs`
```javascript
{{#include wasm/double/index.js}}
```

<div id="answer"></div>

## Reference:
- [JS FFI](https://rustwasm.github.io/docs/book/reference/js-ffi.html)
- [WebAssembly.instantiate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate)
<script src="wasm/double/index.js"></script>
