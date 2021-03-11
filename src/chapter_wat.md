# WAT: WASM by Hand

Let's start to learn WASM ground up by hand from

- [The official specification](https://webassembly.github.io/spec/core/text/index.html)
- [Understanding WebAssembly text format](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)

## Empty module

`chapter_wat/wat/empty_module.wat`
```
{{#include chapter_wat/wat/empty_module.wat}}
```

```console
wat2wasm wat/empty_module.wat -o wasm/empty_module.wasm
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

### ArrayBuffer

So what does the output above mean? To understand it, we need to dive into 
[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer). 

An empty WASM module is nothing but 8 bytes.

```console
$ hexdump -C wasm/empty_module.wasm   
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

## A simple function that returns the input

`chapter_wat/wat/return_module.wat`
```
{{#include chapter_wat/wat/return_module.wat}}
```

```console
$ wat2wasm wat/return_module.wat -o wasm/return_module.wasm
$ hexdump -C wasm/return_module.wasm
00000000  00 61 73 6d 01 00 00 00  01 06 01 60 01 7f 01 7f  |.asm.......`....|
00000010  03 02 01 00 07 0a 01 06  72 65 74 75 72 6e 00 00  |........return..|
00000020  0a 06 01 04 00 20 00 0b                           |..... ..|
00000028
```

`chapter_wat/js/return_module.js`
```javascript
{{#include chapter_wat/js/return_module.js}}
```

```markdown
<pre id="return_module"></pre>
<script src="chapter_wat/js/return_module.js"></script>
```

<pre id="return_module"></pre>
<script src="chapter_wat/js/return_module.js"></script>

You can see this module has `40` (`0x28`) bytes. 