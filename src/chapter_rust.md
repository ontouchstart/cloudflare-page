# Rust and WASM

Now let's play with WASM in Rust without [rustwasm toolchain](https://rustwasm.github.io/).

## Empty module

`chapter_rust/rust/empty_module/src/lib.rs`
```rust
{{#include chapter_rust/rust/empty_module/src/lib.rs}}
```

`chapter_rust/rust/empty_module/Cargo.toml`
```
{{#include chapter_rust/rust/empty_module/Cargo.toml}}
```

`chapter_rust/rust/empty_module/Makefile`
```
{{#include chapter_rust/rust/empty_module/Makefile}}
```

`chapter_rust/js/empty_module.js`
```javascript
{{#include chapter_rust/js/empty_module.js}}
```

```markdown
<pre id="empty_module"></pre>
<script src="chapter_rust/js/empty_module.js"></script>
```

<pre id="empty_module"></pre>
<script src="chapter_rust/js/empty_module.js"></script>

The wasm straight out of the rust is way bigger than the 8 bytes empty module created by hand.

```console
$ hexdump -C wasm/empty_module.wasm | head
00000000  00 61 73 6d 01 00 00 00  01 04 01 60 00 00 03 02  |.asm.......`....|
00000010  01 00 04 05 01 70 01 01  01 05 03 01 00 10 06 19  |.....p..........|
00000020  03 7f 01 41 80 80 c0 00  0b 7f 00 41 80 80 c0 00  |...A.......A....|
00000030  0b 7f 00 41 80 80 c0 00  0b 07 2d 04 06 6d 65 6d  |...A......-..mem|
00000040  6f 72 79 02 00 05 65 6d  70 74 79 00 00 0a 5f 5f  |ory...empty...__|
00000050  64 61 74 61 5f 65 6e 64  03 01 0b 5f 5f 68 65 61  |data_end...__hea|
00000060  70 5f 62 61 73 65 03 02  0a 04 01 02 00 0b 00 da  |p_base..........|
00000070  92 18 0b 2e 64 65 62 75  67 5f 69 6e 66 6f 80 15  |....debug_info..|
00000080  03 00 04 00 00 00 00 00  04 01 00 00 00 00 1c 00  |................|
00000090  39 00 00 00 00 00 00 00  50 00 00 00 00 00 00 00  |9.......P.......|
$ hexdump -C wasm/empty_module.wasm | tail
001828e0  6d 5f 6d 65 6d 63 70 79  5f 65 6c 65 6d 65 6e 74  |m_memcpy_element|
001828f0  5f 75 6e 6f 72 64 65 72  65 64 5f 61 74 6f 6d 69  |_unordered_atomi|
00182900  63 5f 31 00 00 00 00 00  00 0f 04 6e 61 6d 65 01  |c_1........name.|
00182910  08 01 00 05 65 6d 70 74  79 00 4d 09 70 72 6f 64  |....empty.M.prod|
00182920  75 63 65 72 73 02 08 6c  61 6e 67 75 61 67 65 01  |ucers..language.|
00182930  04 52 75 73 74 00 0c 70  72 6f 63 65 73 73 65 64  |.Rust..processed|
00182940  2d 62 79 01 05 72 75 73  74 63 1d 31 2e 35 30 2e  |-by..rustc.1.50.|
00182950  30 20 28 63 62 37 35 61  64 35 64 62 20 32 30 32  |0 (cb75ad5db 202|
00182960  31 2d 30 32 2d 31 30 29                           |1-02-10)|
00182968
```

The file size is `1583464 (0x00182968)` bytes.

### ArrayBuffer

We still have the first 4 bytes WASM_BINARY_MAGIC
```
00 61 73 6d ('\0asm')
```
and the next 4 bytes represent WASM_BINARY_VERSION
```
01 00 00 00
```

See [binary module specification](https://webassembly.github.io/spec/core/binary/modules.html#binary-module).

## A simple function that returns the input

`chapter_rust/rust/return_module/src/lib.rs`
```rust
{{#include chapter_rust/rust/return_module/src/lib.rs}}
```

Since `return` is a rust keyword, we changed the function name to `return_input`.

`chapter_rust/js/return_module.js`
```javascript
{{#include chapter_rust/js/return_module.js}}
```

```markdown
<pre id="return_module"></pre>
<script src="chapter_rust/js/return_module.js"></script>
```

<pre id="return_module"></pre>
<script src="chapter_rust/js/return_module.js"></script>

```console
$ hexdump -C wasm/return_module.wasm | head
00000000  00 61 73 6d 01 00 00 00  01 06 01 60 01 7f 01 7f  |.asm.......`....|
00000010  03 02 01 00 04 05 01 70  01 01 01 05 03 01 00 10  |.......p........|
00000020  06 19 03 7f 01 41 80 80  c0 00 0b 7f 00 41 80 80  |.....A.......A..|
00000030  c0 00 0b 7f 00 41 80 80  c0 00 0b 07 34 04 06 6d  |.....A......4..m|
00000040  65 6d 6f 72 79 02 00 0c  72 65 74 75 72 6e 5f 69  |emory...return_i|
00000050  6e 70 75 74 00 00 0a 5f  5f 64 61 74 61 5f 65 6e  |nput...__data_en|
00000060  64 03 01 0b 5f 5f 68 65  61 70 5f 62 61 73 65 03  |d...__heap_base.|
00000070  02 0a 06 01 04 00 20 00  0b 00 da 92 18 0b 2e 64  |...... ........d|
00000080  65 62 75 67 5f 69 6e 66  6f 80 15 03 00 04 00 00  |ebug_info.......|
00000090  00 00 00 04 01 00 00 00  00 1c 00 39 00 00 00 00  |...........9....|
$ hexdump -C wasm/return_module.wasm | tail
001828f0  63 70 79 5f 65 6c 65 6d  65 6e 74 5f 75 6e 6f 72  |cpy_element_unor|
00182900  64 65 72 65 64 5f 61 74  6f 6d 69 63 5f 31 00 00  |dered_atomic_1..|
00182910  00 00 00 00 16 04 6e 61  6d 65 01 0f 01 00 0c 72  |......name.....r|
00182920  65 74 75 72 6e 5f 69 6e  70 75 74 00 4d 09 70 72  |eturn_input.M.pr|
00182930  6f 64 75 63 65 72 73 02  08 6c 61 6e 67 75 61 67  |oducers..languag|
00182940  65 01 04 52 75 73 74 00  0c 70 72 6f 63 65 73 73  |e..Rust..process|
00182950  65 64 2d 62 79 01 05 72  75 73 74 63 1d 31 2e 35  |ed-by..rustc.1.5|
00182960  30 2e 30 20 28 63 62 37  35 61 64 35 64 62 20 32  |0.0 (cb75ad5db 2|
00182970  30 32 31 2d 30 32 2d 31  30 29                    |021-02-10)|
0018297a
```

The file size is `1583482 (0x0018297a)` bytes. `18` bytes bigger than the empty version.

## Add only module

`chapter_rust/rust/add_only_module/src/lib.rs`
```rust
{{#include chapter_rust/rust/return_module/src/lib.rs}}
```

`chapter_rust/js/add_only_module.js`
```javascript
{{#include chapter_rust/js/add_only_module.js}}
```

```markdown
<pre id="add_only_module_output"></pre>
<script src="chapter_rust/js/add_only_module.js"></script>
```

<pre id="add_only_module_output"></pre>
<script src="chapter_rust/js/add_only_module.js"></script>

```console
$ hexdump -C wasm/add_only_module.wasm | head
00000000  00 61 73 6d 01 00 00 00  01 07 01 60 02 7f 7f 01  |.asm.......`....|
00000010  7f 03 02 01 00 04 05 01  70 01 01 01 05 03 01 00  |........p.......|
00000020  10 06 19 03 7f 01 41 80  80 c0 00 0b 7f 00 41 80  |......A.......A.|
00000030  80 c0 00 0b 7f 00 41 80  80 c0 00 0b 07 2b 04 06  |......A......+..|
00000040  6d 65 6d 6f 72 79 02 00  03 61 64 64 00 00 0a 5f  |memory...add..._|
00000050  5f 64 61 74 61 5f 65 6e  64 03 01 0b 5f 5f 68 65  |_data_end...__he|
00000060  61 70 5f 62 61 73 65 03  02 0a 09 01 07 00 20 01  |ap_base....... .|
00000070  20 00 6a 0b 00 da 92 18  0b 2e 64 65 62 75 67 5f  | .j.......debug_|
00000080  69 6e 66 6f 80 15 03 00  04 00 00 00 00 00 04 01  |info............|
00000090  00 00 00 00 1c 00 39 00  00 00 00 00 00 00 50 00  |......9.......P.|
$ hexdump -C wasm/add_only_module.wasm | tail
001828e0  00 5f 5f 6c 6c 76 6d 5f  6d 65 6d 63 70 79 5f 65  |.__llvm_memcpy_e|
001828f0  6c 65 6d 65 6e 74 5f 75  6e 6f 72 64 65 72 65 64  |lement_unordered|
00182900  5f 61 74 6f 6d 69 63 5f  31 00 00 00 00 00 00 0d  |_atomic_1.......|
00182910  04 6e 61 6d 65 01 06 01  00 03 61 64 64 00 4d 09  |.name.....add.M.|
00182920  70 72 6f 64 75 63 65 72  73 02 08 6c 61 6e 67 75  |producers..langu|
00182930  61 67 65 01 04 52 75 73  74 00 0c 70 72 6f 63 65  |age..Rust..proce|
00182940  73 73 65 64 2d 62 79 01  05 72 75 73 74 63 1d 31  |ssed-by..rustc.1|
00182950  2e 35 30 2e 30 20 28 63  62 37 35 61 64 35 64 62  |.50.0 (cb75ad5db|
00182960  20 32 30 32 31 2d 30 32  2d 31 30 29              | 2021-02-10)|
0018296c
```

The file size is `1583468 (0x0018296c)` bytes.

## Call JS function from WASM

We are going to use [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/examples/without-a-bundler.html) in this implementation.

`chapter_rust/rust/call_js_func_module/Cargo.toml`
```
{{#include chapter_rust/rust/call_js_func_module/Cargo.toml}}
```

`chapter_rust/rust/call_js_func_module/src/lib.rs`
```rust
{{#include chapter_rust/rust/call_js_func_module/src/lib.rs}}
```

`chapter_rust/rust/call_js_func_module/Makefile`
```
{{#include chapter_rust/rust/call_js_func_module/Makefile}}
```

The JavaScript part is going to be a little bit complicated. Hopefully we can clean up in the future. 

`chapter_rust/js/call_js_func_module_dom.js`
```javascript
{{#include chapter_rust/js/call_js_func_module_dom.js }}
```

`chapter_rust/js/module/call_js_func_module.js`
```javascript
{{#include chapter_rust/js/module/call_js_func_module.js }}
```


This is the wrapper JS code generated by `wasm-bindgen`:

`chapter_rust/rust/call_js_func_module/pkg/call_js_func_module.js`
```javascript
{{#include chapter_rust/rust/call_js_func_module/pkg/call_js_func_module.js}}
```

There is a lot of magic up there genearted by [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/) and [wasm-pack](https://rustwasm.github.io/docs/wasm-pack/). Let's see if we can make it simpler.

### JavaScript modules

Wasm-pack use [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#applying_the_module_to_your_html) to load WASM from the "machine generated" `chapter_rust/rust/call_js_func_module/pkg/call_js_func_module.js`.

```markdown
<script src="/chapter_rust/js/call_js_func_module_dom.js"></script>
<script type="module" src="/chapter_rust/js/module/call_js_func_module.js"></script>
```

<script src="/chapter_rust/js/call_js_func_module_dom.js"></script>
<script type="module" src="/chapter_rust/js/module/call_js_func_module.js"></script>

In our other examples, we use simple [script tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script). Let's see if we can make it work the same way without modules. 

```markdown
<script src="chapter_rust/js/call_js_func_module.js"></script>
```

`chapter_rust/js/call_js_func_module.js`
```javascript
{{#include chapter_rust/js/call_js_func_module.js}}
```

As we can see it works for both JavaScript loaders, although they come in asynchronously. 

```markdown
<pre id ="call_js_func_module_output"></pre>
```

<pre id ="call_js_func_module_output"></pre>
<script src="chapter_rust/js/call_js_func_module.js"></script>
