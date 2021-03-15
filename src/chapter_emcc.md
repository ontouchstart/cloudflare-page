# emcc

[emcc](https://emscripten.org/docs/tools_reference/emcc.html) is the [Emscripten](https://emscripten.org) Compiler Frontend.

```console
$ brew install emcc
$ emcc -v
emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) 2.0.15
clang version 13.0.0 (https://github.com/llvm/llvm-project.git 1c5f08312874717caf5d94729d825c32845773ec)
Target: wasm32-unknown-emscripten
Thread model: posix
InstalledDir: /usr/local/opt/emscripten/libexec/llvm/bin
```


## Hello world

[Reference](https://emscripten.org/docs/getting_started/Tutorial.html)

`chapter_emcc/hello_world/Makefile`
```makefile
{{#include chapter_emcc/hello_world/Makefile}}
```

`chapter_emcc/hello_world/main.c`
```c
{{#include chapter_emcc/hello_world/main.c}}
```

```console
$ make node
emcc main.c
node a.out.js
hello, world!

```
`a.out.js`
```javascript
{{#include chapter_emcc/hello_world/a.out.js}}
```	

## Generating HTML

```console
$ make html
emcc main.c -o hello.html
```

`chapter_emcc/hello_world/hello.js`
```javascript
{{#include chapter_emcc/hello_world/hello.js}}
```

[`chapter_emcc/hello_world/hello.html`](chapter_emcc/hello_world/hello.html)
```html
{{#include chapter_emcc/hello_world/hello.html}}
```

This is way complicated. Let's make it simple from scratch.

## 42

[Why 42](https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Why_the_number_42?)?

Let's make a simplest wasm from C.

`chapter_emcc/42/main.c`
```C
{{#include chapter_emcc/42/main.c}}
```

`chapter_emcc/42/Makefile`
```makefile
{{#include chapter_emcc/42/Makefile}}
```

`chapter_emcc/42/a.out.wat`
```
{{#include chapter_emcc/42/a.out.wat}}
```

What really matters is the line
```
(export "main" (func 2))
```

which is just
```
(func (;1;) (type 0) (result i32)
    (local i32 i32 i32 i32 i32)
    global.get 0
    local.set 0
    i32.const 16
    local.set 1
    local.get 0
    local.get 1
    i32.sub
    local.set 2
    i32.const 0
    local.set 3
    local.get 2
    local.get 3
    i32.store offset=12
    i32.const 42
    local.set 4
    local.get 4
    return)
```
so we might be able to load it in the similiar ways as we did in [WAT: WASM by Hand](/chapter_wat.html).

`chapter_emcc/42/load.js`
```javascript
{{#include chapter_emcc/42/load.js}}
```

<pre id="emcc_output"></pre>
<script src="/chapter_emcc/42/load.js"></script>
