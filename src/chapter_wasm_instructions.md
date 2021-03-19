# WASM Instructions

After we have set up the toolchain to develop WASM in JS, it is time to learn how to do real coding with [WASM Instructions](https://webassembly.github.io/spec/core/syntax/instructions.html), which are encoded by [opcodes](https://webassembly.github.io/spec/core/binary/instructions.html).

Let's write a starter WASM with I/O via module imports and exports.

## Starter
`chapter_wasm_instructions/starter.js`
```
{{#include chapter_wasm_instructions/starter.js}}
```

<canvas id="starter_canvas"></pre>
<pre id="starter_hex"></pre>

<script src="chapter_wasm_instructions/starter.js"></script>

## Draw on canvas

Mouse down to draw red dots on canvas.

`chapter_wasm_instructions/draw.js`
```
{{#include chapter_wasm_instructions/draw.js}}
```

<canvas id="draw_canvas"></pre>
<pre id="draw_hex"></pre>

<script src="chapter_wasm_instructions/draw.js"></script>
