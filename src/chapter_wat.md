# WAT: WASM by Hand

Let's start to learn WASM ground up by hand from

- [The official specification](https://webassembly.github.io/spec/core/text/index.html)
- [Understanding WebAssembly text format](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)

## Empty module

`chapter_wat/wat/empty_module.wat`
```
{{#include chapter_wat/wat/empty_module.wat}}
```

```makefile
{{#include chapter_wat/Makefile}}
```

`chapter_wat/js/empty_module.js`
```javascript
{{#include chapter_wat/js/empty_module.js}}
```

```markdown
<pre id="empty_module"></pre>
<script src="chapter_wat/js/empty_module.js"></script>
```

<pre id="empty_module"></pre>
<script src="chapter_wat/js/empty_module.js"></script>

## ArrayBuffer

So what does the output above mean? To understand it, we need to dive into 
[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer). 

An empty WASM module is nothing but 8 bytes.

```console
$ hexdump -C src/chapter_wat/wasm/empty_module.wasm   
00000000  00 61 73 6d 01 00 00 00                           |.asm....|
00000008
```
See [hexdump](https://en.wikipedia.org/wiki/Hex_dump).

The first 4 bytes represent WASM_BINARY_MAGIC
```
00 61 73 6d ('\0asm')
```

The next 4 bytes represent WASM_BINARY_VERSION
```
01 00 00 00
```

See [binary module specification](https://webassembly.github.io/spec/core/binary/modules.html#binary-module).

