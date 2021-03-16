# Programming with ArrayBuffer

Let's start from the bottom and program from scratch with [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

## An array buffer of 16 bytes

`chapter_bytes/js/16_bytes.js`
```javascript
{{#include chapter_bytes/js/16_bytes.js}}
```
<pre id="16_bytes"></pre>
<script src="chapter_bytes/js/16_bytes.js"></script>

## An array buffer of 256 bytes

`chapter_bytes/js/256_bytes.js`
```javascript
{{#include chapter_bytes/js/256_bytes.js}}
```
These are all the possible values a byte can represent.
<pre id="256_bytes"></pre>
<script src="chapter_bytes/js/256_bytes.js"></script>

## Empty WASM of 8 bytes

`chapter_bytes/wat/empty.wat`
```
{{#include chapter_bytes/wat/empty.wat}}
```

```console
$ wat2wasm empty.wat
$ hexdump -C empty.wasm
00000000  00 61 73 6d 01 00 00 00                           |.asm....|
00000008
```

`chapter_bytes/js/8_bytes_empty_wasm.js`
```javascript
{{#include chapter_bytes/js/8_bytes_empty_wasm.js}}
```
<pre id="8_bytes_empty_wasm"></pre>
<script src="chapter_bytes/js/8_bytes_empty_wasm.js"></script>

## 42 WASM 

Let's see if we can "hand write" bytecode WASM in ArrayBuffer for a simple WASM that gives us [the answer](https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42)).


`chapter_bytes/wat/42.wat`
```
{{#include chapter_bytes/wat/42.wat}}
```

```console
$ wat2wasm 42.wat
$ hexdump -C 42.wasm
00000000  00 61 73 6d 01 00 00 00  01 05 01 60 00 01 7f 03  |.asm.......`....|
00000010  02 01 00 07 06 01 02 34  32 00 00 0a 06 01 04 00  |.......42.......|
00000020  41 2a 0b                                          |A*.|
00000023
```

Now we can hard code those bytes in following JS.

`chapter_bytes/js/42_wasm.js`
```javascript
{{#include chapter_bytes/js/42_wasm.js}}
```
<pre id="42_wasm"></pre>
<script src="chapter_bytes/js/42_wasm.js"></script>

## Memory

Now let's see how [WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory) works.

We add a page of memory to the empty wasm.

`chapter_bytes/wat/memory_empty.wat`
```
{{#include chapter_bytes/wat/memory_empty.wat}}
```
```console
$ wat2wasm memory_empty.wat
$ hexdump -C memory_empty.wasm
00000000  00 61 73 6d 01 00 00 00  02 0b 01 02 6a 73 03 6d  |.asm........js.m|
00000010  65 6d 02 00 01                                    |em...|
00000015
```

`chapter_bytes/js/single_page_memory_empty_wasm.js`
```javascript
{{#include chapter_bytes/js/single_page_memory_empty_wasm.js}}
```

<pre id="single_page_memory_empty_wasm"></pre>
<script src="chapter_bytes/js/single_page_memory_empty_wasm.js"></script>

## 42 Memory

Now let's store 42 into the memory and then load it.

`chapter_bytes/wat/42_memory.wat`
```
{{#include chapter_bytes/wat/42_memory.wat}}
```

```console
$ wat2wasm 42_memory.wat
$ hexdump -C 42_memory.wasm
00000000  00 61 73 6d 01 00 00 00  01 08 02 60 00 00 60 00  |.asm.......`..`.|
00000010  01 7f 02 0b 01 02 6a 73  03 6d 65 6d 02 00 01 03  |......js.mem....|
00000020  03 02 00 01 07 10 02 05  73 74 6f 72 65 00 00 04  |........store...|
00000030  6c 6f 61 64 00 01 0a 13  02 09 00 41 00 41 2a 36  |load.......A.A*6|
00000040  02 00 0b 07 00 41 00 28  02 00 0b                 |.....A.(...|
0000004b
```

`chapter_bytes/js/42_memory_wasm.js`
```javascript
{{#include chapter_bytes/js/42_memory_wasm.js}}
```

<pre id="42_memory_wasm"></pre>
<script src="chapter_bytes/js/42_memory_wasm.js"></script>

## store and hex

`chapter_bytes/wat/hex_memory_wasm.wat`
```
{{#include chapter_bytes/wat/hex_memory_wasm.wat}}
```

```console
$ wat2wasm hex_memory_wasm.wat
$ hexdump -C hex_memory_wasm.wasm
00000000  00 61 73 6d 01 00 00 00  01 0b 02 60 01 7f 00 60  |.asm.......`...`|
00000010  02 7f 7f 01 7f 02 14 02  02 6a 73 03 6d 65 6d 02  |.........js.mem.|
00000020  00 01 02 6a 73 03 68 65  78 00 00 03 02 01 01 07  |...js.hex.......|
00000030  0f 02 05 73 74 6f 72 65  00 01 03 68 65 78 00 00  |...store...hex..|
00000040  0a 10 01 0e 00 20 00 20  01 36 02 00 20 00 28 02  |..... . .6.. .(.|
00000050  00 0b                                             |..|
00000052
```
`chapter_bytes/js/hex_memory_wasm.js`
```javascript
{{#include chapter_bytes/js/hex_memory_wasm.js}}
```

<pre id="hex_memory_wasm"></pre>
<script src="chapter_bytes/js/hex_memory_wasm.js"></script>