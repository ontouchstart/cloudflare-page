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
$ du src/chapter_wat/wasm/empty_module.wasm
8       src/chapter_wat/wasm/empty_module.wasm
$ hexdump src/chapter_wat/wasm/empty_module.wasm
0000000 00 61 73 6d 01 00 00 00                        
0000008
```
