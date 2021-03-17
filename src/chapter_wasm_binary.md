# WASM Binary Format

[Reference](https://webassembly.github.io/spec/core/binary/index.html)

## Module preamble

Every module starts with a [preamble](https://webassembly.github.io/spec/core/binary/modules.html#binary-module) of a magic and version. Let's use JS to create an empty module from binary data.

`chapter_wasm_binary/magic_version.js`
```javascript
{{#include chapter_wasm_binary/magic_version.js}}
```
<pre id="magic_version"></pre>
<script src="chapter_wasm_binary/magic_version.js"></script>
