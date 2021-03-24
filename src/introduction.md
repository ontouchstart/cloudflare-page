# WASM mdBook 

The purpose of this blog is to study low level [WASM](https://webassembly.org/) concepts and features in an iterative and interactive [literate programming](https://en.wikipedia.org/wiki/Literate_programming) workflow.

It uses [mdBook as a static site generator](https://jamstack.org/generators/mdbook/) and the source code is on [GitHub](https://github.com/ontouchstart/cloudflare-page).


## JS

For JS, the browser itself is the runtime so we can do whatever we want with [Web API](https://developer.mozilla.org/en-US/docs/Web/Reference/API).

Our approach would be use [script tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) to load JS file directly into the markdown page.


```markdown
<pre id="browser_vendor"></pre>
<script src="introduction/js/browser_vendor.js"></script>
```

`introduction/js/browser_vendor.js`
```javascript
{{#include introduction/js/browser_vendor.js}}
```

<pre id="browser_vendor"></pre>
<script src="introduction/js/browser_vendor.js"></script>

## WASM

Install the [WABT: The WebAssembly Binary Toolkit](https://github.com/WebAssembly/wabt) from [Homebrew](https://formulae.brew.sh/formula/wabt)
```console
$ brew install wabt
```

`introduction/wat/simple.wat`
```
{{#include introduction/wat/simple.wat}}
```

`introduction/Makefile`
```makefile
{{#include introduction/Makefile}}
```

```console
$ make -C src/introduction
wat2wasm wat/simple.wat -o wasm/simple.wasm
wat2wasm wat/memory.wat -o wasm/memory.wasm
```

```markdown
<pre id="wasm_answer"></pre>
<script async src="introduction/js/wasm.js"></script>
```


`introduction/js/wasm.js`
```javascript
{{#include introduction/js/wasm.js}}
```

<pre id="wasm_answer"></pre>
<script async src="introduction/js/wasm.js"></script>

## WASM Memory

Based on 
- [WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory)
- [WASM memory test](https://github.com/mdn/webassembly-examples/blob/master/js-api-examples/memory.html)
- [memory.wat](https://github.com/mdn/webassembly-examples/blob/master/js-api-examples/memory.wat)

`introduction/wat/memory.wat`
```
{{#include introduction/wat/memory.wat}}
```

```console
wat2wasm wat/memory.wat -o wasm/memory.wasm
```

```markdown
<pre id="wasm_memory"></pre>
<script async src="introduction/js/memory.js"></script>
```

`introduction/js/memory.js`
```javascript
{{#include introduction/js/memory.js}}
```

<pre id="wasm_memory"></pre>
<script async src="introduction/js/memory.js"></script>


