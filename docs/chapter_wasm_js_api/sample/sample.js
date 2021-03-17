var importObj = {
    js: {
        import1: () => console.log("hello,"),
        import2: () => console.log("world!")
    }
};
fetch('/chapter_wasm_js_api/sample/sample.wasm').then(response =>
    response.arrayBuffer()
).then(buffer =>
    WebAssembly.instantiate(buffer, importObj)
).then(({ module, instance }) =>
    instance.exports.f()
);
