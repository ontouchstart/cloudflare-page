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


`chapter_bytes/js/8_bytes_empty_wasm.js`
```javascript
{{#include chapter_bytes/js/8_bytes_empty_wasm.js}}
```
<pre id="8_bytes_empty_wasm"></pre>
<script src="chapter_bytes/js/8_bytes_empty_wasm.js"></script>

## 42 WASM 

Let's see if we can "hand write" bytecode WASM in ArrayBuffer for a simple WASM that gives us [the answer](https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42)).

Here we cheated a little bit by generating the WASM first by hand with a short WAT.

`chapter_bytes/wat/42.wat`
```
{{#include chapter_bytes/wat/42.wat}}
```

`chapter_bytes/wat/Makefile`
```makefile
{{#include chapter_bytes/wat/Makefile}}
```

```console
$ make
wat2wasm 42.wat
hexdump 42.wasm
0000000 00 61 73 6d 01 00 00 00 01 05 01 60 00 01 7f 03
0000010 02 01 00 07 06 01 02 34 32 00 00 0a 06 01 04 00
0000020 41 2a 0b                                       
0000023
```

Now we can hard code those bytes in following JS.

`chapter_bytes/js/42_wasm.js`
```javascript
{{#include chapter_bytes/js/42_wasm.js}}
```
<pre id="42_wasm"></pre>
<script src="chapter_bytes/js/42_wasm.js"></script>

