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

The wasm straight out of the rust is way bigger than the 8 byte empty module created by hand.

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
$ du -k wasm/empty_module.wasm 
1548    wasm/empty_module.wasm
```

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
$ du -k wasm/return_module.wasm  
1548    wasm/return_module.wasm
```
