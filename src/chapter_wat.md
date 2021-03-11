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

Let's shave a few more bytes off.

`chapter_wat/wat/r_module.wat`
```
{{#include chapter_wat/wat/r_module.wat}}
```

```console
$ wat2wasm wat/r_module.wat -o wasm/r_module.wasm
$ hexdump -C wasm/r_module.wasm
00000000  00 61 73 6d 01 00 00 00  01 06 01 60 01 7f 01 7f  |.asm.......`....|
00000010  03 02 01 00 07 05 01 01  72 00 00 0a 06 01 04 00  |........r.......|
00000020  20 00 0b                                          | ..|
00000023
```
You can see this module has `35` (`0x23`) bytes. We shaved 5 bytes `eturn` from the wasm. 

Since we only have one function in the WAT, we can simplify the WAT source further:

```
{{#include chapter_wat/wat/r_func_0_module.wat }}
```

Which produces exactly the same WASM.
```console
$ diff wat/r_module.wat wat/r_func_0_module.wat
2,4c2,4
<   (func $return (param $input i32) (result i32)
<     local.get $input )
<   (export "r" (func $return))
---
>   (func (param $p i32) (result i32)
>     local.get $p )
>   (export "r" (func 0))
$ diff wasm/r_module.wasm wasm/r_func_0_module.wasm
```

## All things work together

`chapter_wat/js/r_module.js`
```javascript
{{#include chapter_wat/js/r_module.js}}
```

```markdown
<pre id="r_module"></pre>
<script src="chapter_wat/js/r_module.js"></script>
```

- Browser: `exports` context from [WebAssembly instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance) 
- Browser: `const input = 42`
- Browser: calls `exports.r(input)`
- WASM: invoke `func 0`, which is the only function in the module
- WASM: pass `42` of type `i32` to `$p`
- WASM: `local.get $p` push `42` to the stack.
- WASM: The only data left in the stack is `42` of type `i32`
- WASM: `(func 0)` finishes, pop the stack as the result `42`
- Browser: inserts the result `42` into [JavaScript template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)  
```
`FROM WASM:
${JSON.stringify({memory}, null, 2)}
return(${input}) = ${exports.r(input)}
`;
```
- Browser: render via [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML): 
```
document.getElementById('r_module').innerHTML = `...`
```
<pre id="r_module"></pre>
<script src="chapter_wat/js/r_module.js"></script>

### Call JS function from WASM

See [Importing functions from JavaScript](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format#importing_functions_from_javascript)

`chapter_wat/wat/call_js_func_module.wat`
```
{{#include chapter_wat/wat/call_js_func_module.wat}}
```

```console
$ wat2wasm wat/call_js_func_module.wat -o wasm/call_js_func_module.wasm
$ hexdump -C wasm/call_js_func_module.wasm
00000000  00 61 73 6d 01 00 00 00  01 0a 02 60 02 7f 7f 00  |.asm.......`....|
00000010  60 01 7f 00 02 0b 01 03  64 6f 6d 03 6c 6f 67 00  |`.......dom.log.|
00000020  00 03 02 01 01 07 07 01  03 6c 6f 67 00 01 0a 0a  |.........log....|
00000030  01 08 00 20 00 20 00 10  00 0b                    |... . ....|
0000003a
```

```markdown
<pre id="call_js_func_module_output"></pre>
<script src="chapter_wat/js/call_js_func_module.js"></script>
```


`chapter_wat/js/call_js_func_module.js`
```javascript
{{#include chapter_wat/js/call_js_func_module.js}}
```

<pre id="call_js_func_module_output"></pre>
<script src="chapter_wat/js/call_js_func_module.js"></script>

### Finally the add module

`chapter_wat/wat/add_module.wat`
```
{{#include chapter_wat/wat/add_module.wat}}
```

```console
wat2wasm wat/add_module.wat -o wasm/add_module.wasm
hexdump -C wasm/add_module.wasm
00000000  00 61 73 6d 01 00 00 00  01 12 03 60 03 7f 7f 7f  |.asm.......`....|
00000010  00 60 02 7f 7f 01 7f 60  02 7f 7f 00 02 10 01 03  |.`.....`........|
00000020  64 6f 6d 08 73 68 6f 77  5f 61 64 64 00 00 03 03  |dom.show_add....|
00000030  02 01 02 07 07 01 03 61  64 64 00 02 0a 18 02 07  |.......add......|
00000040  00 20 00 20 01 6a 0b 0e  00 20 00 20 01 20 00 20  |. . .j... . . . |
00000050  01 10 01 10 00 0b                                 |......|
00000056
```

```markdown
<pre id="add_module_output"></pre>
<script src="chapter_wat/js/add_fmodule.js"></script>
```

`chapter_wat/js/add_module.js`
```javascript
{{#include chapter_wat/js/add_module.js}}
```

<pre id="add_module_output"></pre>
<script src="chapter_wat/js/add_module.js"></script>
