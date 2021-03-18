# WASM Binary Format

[Reference](https://webassembly.github.io/spec/core/binary/index.html)

Here is a hexdump function to help us read byte code in the browser:

`chapter_wasm_binary/hexdump.js`
```javascript
{{#include chapter_wasm_binary/hexdump.js}}
```

<script src="chapter_wasm_binary/hexdump.js"></script> 

## Module preamble

Every module starts with a [preamble](https://webassembly.github.io/spec/core/binary/modules.html#binary-module) of a magic and version. Let's use JS to create an empty module from binary data.

`chapter_wasm_binary/magic_version.js`
```javascript
{{#include chapter_wasm_binary/magic_version.js}}
```

As a reference here is the `chapter_wasm_binary/magic_version.wat`

```
{{#include chapter_wasm_binary/magic_version.wat}}
```

```console
$ wat2wasm magic_version.wat
$ hexdump -C magic_version.wasm
00000000  00 61 73 6d 01 00 00 00                           |.asm....|
00000008
```

<pre id="magic_version"></pre>
<script src="chapter_wasm_binary/magic_version.js"></script>

## Sections

Each [section](https://webassembly.github.io/spec/core/binary/modules.html#binary-section) consists of

- a one-byte section id,
- the `u32` size of the contents, in bytes,
- the actual contents, whose structure is depended on the section id.

Every section is optional; an omitted section is equivalent to the section being present with empty contents.

Let's create modules from scratch by adding sections one by one.

### (module (func))

`chapter_wasm_binary/func.js`
```javascript
{{#include chapter_wasm_binary/func.js}}
```

As a reference here is the `chapter_wasm_binary/func.wat`
```
{{#include chapter_wasm_binary/func.wat}}
```

```console
$ wat2wasm func.wat
$ hexdump -C func.wasm
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 03 02  |.asm.......`....|
00000010  01 00 0a 04 01 02 00 0b                           |........|
00000018
```

<pre id="func"></pre>
<script src="chapter_wasm_binary/func.js"></script>


### (module (memory 1) (func))

`chapter_wasm_binary/mem_func.js`
```javascript
{{#include chapter_wasm_binary/mem_func.js}}
```

As a reference here is the `chapter_wasm_binary/mem_func.wat`
```
{{#include chapter_wasm_binary/mem_func.wat}}
```

```console
$ wat2wasm mem_func.wat
$ hexdump -C mem_func.wasm
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 03 02  |.asm.......`....|
00000010  01 00 05 03 01 00 01 0a  04 01 02 00 0b           |.............|
0000001d
```

<pre id="mem_func"></pre>
<script src="chapter_wasm_binary/mem_func.js"></script>

### (module (memory (import "js" "mem") 1) (func))

`chapter_wasm_binary/import_mem_func.js`
```javascript
{{#include chapter_wasm_binary/import_mem_func.js}}
```

As a reference here is the `chapter_wasm_binary/import_mem_func.wat`
```
{{#include chapter_wasm_binary/import_mem_func.wat}}
```

```console
$ wat2wasm import_mem_func.wat
$ hexdump -C import_mem_func.wasm
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 02 0b  |.asm.......`....|
00000010  01 02 6a 73 03 6d 65 6d  02 00 01 03 02 01 00 0a  |..js.mem........|
00000020  04 01 02 00 0b                                    |.....|
00000025
```

<pre id="import_mem_func"></pre>
<script src="chapter_wasm_binary/import_mem_func.js"></script>

### Export memory and func

`chapter_wasm_binary/export_mem_func.js`
```javascript
{{#include chapter_wasm_binary/export_mem_func.js}}
```

As a reference here is the `chapter_wasm_binary/export_mem_func.wat`
```
{{#include chapter_wasm_binary/export_mem_func.wat}}
```

```console
$ wat2wasm export_mem_func.wat
$ hexdump -C export_mem_func.wasm
00000000  00 61 73 6d 01 00 00 00  01 07 01 60 02 7f 7f 01  |.asm.......`....|
00000010  7f 03 02 01 00 05 03 01  00 01 07 09 02 01 6d 02  |..............m.|
00000020  00 01 66 00 00 0a 0d 01  0b 00 20 00 20 01 36 02  |..f....... . .6.|
00000030  00 20 01 0b                                       |. ..|
00000034
```

<pre id="export_mem_func"></pre>
<script src="chapter_wasm_binary/export_mem_func.js"></script>