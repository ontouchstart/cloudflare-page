# WASM Canvas

We have build foundation to write binary WASM code with JavaScript and inspect memory as hexdump in the browser. Now let's visualize the memory via [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

<script src="chapter_wasm_binary/hexdump.js"></script>
## Blank canvas

`chapter_wasm_canvas/blank_canvas.js`
```javascript
{{#include chapter_wasm_canvas/blank_canvas.js}}
```
<canvas id="blank_canvas"></canvas>
<script src="chapter_wasm_canvas/blank_canvas.js"></script>

## ImageData of a blank canvas

[getImageData](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)

`chapter_wasm_canvas/image_data_blank_canvas.js`
```javascript
{{#include chapter_wasm_canvas/image_data_blank_canvas.js}}
```
<canvas id="image_data_blank_canvas"></canvas>
<pre id="image_data_blank_canvas_data"></pre>
<script src="chapter_wasm_canvas/image_data_blank_canvas.js"></script>

## ImageData of a green canvas

Now let's make a green canvas.

`chapter_wasm_canvas/image_data_green_canvas.js`
```javascript
{{#include chapter_wasm_canvas/image_data_green_canvas.js}}
```
<canvas id="image_data_green_canvas"></canvas>
<pre id="image_data_green_canvas_data"></pre>
<script src="chapter_wasm_canvas/image_data_green_canvas.js"></script>
