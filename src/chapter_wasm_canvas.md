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

## WASM green canvas

Now let's do it again with WASM.

`chapter_wasm_canvas/wasm_image_data_green_canvas.js`
```javascript
{{#include chapter_wasm_canvas/wasm_image_data_green_canvas.js}}
```
<canvas id="wasm_image_data_green_canvas"></canvas>
<pre id="wasm_image_data_green_canvas_data"></pre>
<script src="chapter_wasm_canvas/wasm_image_data_green_canvas.js"></script>

Setting pixels in imageData via a loop calling an exported WASM function is definitely not an efficient way to draw on a canvas. We just showed that it is possible to pass WASM memory back to canvas. 

In the next step, we want to do computation in the WASM and "read" the memory out on Canvas.

