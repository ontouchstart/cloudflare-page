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
$ make
emcc main.c
cache:INFO: generating system headers: sysroot_install.stamp... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot_install.stamp" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libgl.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libgl.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libal.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libal.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libhtml5.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libhtml5.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libc.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libc.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libcompiler_rt.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libcompiler_rt.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libc++-noexcept.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libc++-noexcept.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libc++abi-noexcept.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libc++abi-noexcept.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libdlmalloc.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libdlmalloc.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libc_rt_wasm.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libc_rt_wasm.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system library: sysroot/lib/wasm32-emscripten/libsockets.a... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/sysroot/lib/wasm32-emscripten/libsockets.a" for subsequent builds)
cache:INFO:  - ok
cache:INFO: generating system asset: generated_struct_info.json... (this will be cached in "/usr/local/Cellar/emscripten/2.0.15/libexec/cache/generated_struct_info.json" for subsequent builds)
cache:INFO:  - ok
node a.out.js
hello, world!
```

```console
$ ls
Makefile	a.out.js	a.out.wasm	main.c
```

`a.out.js`
```javascript
{{#include chapter_emcc/hello_world/a.out.js}}
```	
