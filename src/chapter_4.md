# WASM Custom Sections (Read Only)

`wasm/link_section/src/lib.rs`
```rust
{{#include wasm/link_section/src/lib.rs}}
# fn main() {
#    println!("SECTION = {:?}", SECTION);
# }
```

`wasm/link_section/index.js`
```javascript
{{#include wasm/link_section/index.js}}
```

<div id="answer"></div>

## Reference:
- [JS FFI Custom Sections](https://rustwasm.github.io/docs/book/reference/js-ffi.html#custom-sections)
- [WebAssembly.Module() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module/Module)
- [WebAssembly.Module.customSections()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module/customSections)
<script src="wasm/link_section/index.js"></script>