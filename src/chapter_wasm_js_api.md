# WebAssembly JavaScript Interface

An effective way to learn WASM from JS (or JS from WASM) is to go through the official specification in detail.

[WebAssembly JavaScript Interface](https://webassembly.github.io/spec/js-api/) defines JavaScript classes and objects for accessing WebAssembly from within JavaScript, including methods for validation, compilation, instantiation, and classes for representing and manipulating imports and exports as JavaScript objects.

## Sample

[Reference](https://webassembly.github.io/spec/js-api/index.html#sample)

`chapter_wasm_js_api/sample/sample.wat`
```
{{#include chapter_wasm_js_api/sample/sample.wat}}
```

```console
$ wat2wasm sample.wat
$ hexdump -C sample.wasm
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 02 1b  |.asm.......`....|
00000010  02 02 6a 73 07 69 6d 70  6f 72 74 31 00 00 02 6a  |..js.import1...j|
00000020  73 07 69 6d 70 6f 72 74  32 00 00 03 03 02 00 00  |s.import2.......|
00000030  07 05 01 01 66 00 03 08  01 02 0a 0b 02 04 00 10  |....f...........|
00000040  00 0b 04 00 10 01 0b                              |.......|
00000047
```

`chapter_wasm_js_api/sample.js`
```javascript
{{#include chapter_wasm_js_api/sample/sample.js}}
```

<script src="chapter_wasm_js_api/sample/sample.js"></script>
The result is in console log.
