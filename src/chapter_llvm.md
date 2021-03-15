# C and WASM via LLVM

We are going to use the same llvm toolchain as in [emcc](chapter_emcc.html):

```console
$ brew install emscripten
$ emcc -v
emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) 2.0.15
clang version 13.0.0 (https://github.com/llvm/llvm-project.git 1c5f08312874717caf5d94729d825c32845773ec)
Target: wasm32-unknown-emscripten
Thread model: posix
InstalledDir: /usr/local/opt/emscripten/libexec/llvm/bin

```

`chapter_llvm/42/42.c`

```C
{{#include chapter_llvm/42/42.c}}
```

`chapter_llvm/42/Makefile`

```makefile
{{#include chapter_llvm/42/Makefile}}
```

`chapter_llvm/42/42.ll`

```
{{#include chapter_llvm/42/42.ll}}
```

`chapter_llvm/42/42.wat`

```
{{#include chapter_llvm/42/42.wat}}
```

`chapter_llvm/42/42.js`

```
{{#include chapter_llvm/42/42.js}}
```

<pre id="llvm_output"></pre>
<script src="chapter_llvm/42/42.js"></script>

