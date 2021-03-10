# Study Rust/JS/WASM in mdBook 

The purpose of this blog is to study low level [rust](https://www.rust-lang.org)/[JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[WASM](https://webassembly.org/) concepts and features in an iterative and interactive [literate programming](https://en.wikipedia.org/wiki/Literate_programming) workflow.

It uses [mdBook as a static site generator](https://jamstack.org/generators/mdbook/) and the source code is on [GitHub](https://github.com/ontouchstart/cloudflare-page).

## Rust

### Use rust playground backend

[Rust Playground](https://play.rust-lang.org/) has a REST API 
for us to send rust code to and get result back. Here is how it works in JavaScript.

`introduction/js/hello.js`

```javascript
{{#include introduction/js/hello.js}}
```
<pre id="result"></pre>
<script src="introduction/js/hello.js"></script>

It is possible to build a whole interactive coding environment this way and we might want to do it in the future. However, mdBook already has [this feature built in](https://rust-lang.github.io/mdBook/format/mdbook.html#inserting-runnable-rust-files) so we might just use it unless we need more custom features. 

`introduction/hello/src/main.rs`
```rust,editable
{{#include introduction/hello/src/main.rs}}
```

The example above shows different levels of thinking in programming although they achieved similar goal, i.e., run rust code at the backend and display the result on the page.

With the packaged solution, we get things done but don't know much about how it works. The *implementation* is hidden from us unless we take a look at the [source code](https://github.com/rust-lang/mdBook/blob/536873ca267db8a7d92cd9455e1aa84eefda71e6/src/theme/book.js#L18). 

The REST API solution is actually a hack by inspecting the network traffic of the packaged solution in the browser [DevTools](https://developers.google.com/web/tools/chrome-devtools) and figuring out the [API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) by ourselves. This is the main difference between learning how to *use* a feature and how to *implement* a feature.

This book is more about the latter. 

## JS

For JS, the browser itself is the runtime so we can do whatever we want with [Web API](https://developer.mozilla.org/en-US/docs/Web/Reference/API).

Our approach would be use [script tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) to load JS file directly into the markdown page.


```md
<pre id="browser_vendor"></pre>
<script src="introduction/js/browser_vendor.js"></script>
```

`introduction/js/browser_vendor.js`
```javascript
{{#include introduction/js/browser_vendor.js}}
```

<pre id="browser_vendor"></pre>
<script src="introduction/js/browser_vendor.js"></script>
