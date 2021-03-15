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
