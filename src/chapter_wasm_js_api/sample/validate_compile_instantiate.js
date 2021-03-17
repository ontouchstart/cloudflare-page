var importObj = {
    js: {
        import1: () => console.log("hello,"),
        import2: () => console.log("world!")
    }
};

fetch('/chapter_wasm_js_api/sample/sample.wasm').then(response => {
    console.log({ response });
    return response.arrayBuffer();
}).then(buffer => {
    console.log({ buffer });
    if (WebAssembly.validate(buffer)) {
        return WebAssembly.compile(buffer);
    }
    else {
        throw 'invalid WASM';
    }
}).then(module => {
    console.log({ module });
    return WebAssembly.instantiate(module, importObj);
}).then(instance => {
    console.log({ instance });
    const { exports } = instance;
    const { f } = exports;
    f();
}).catch((error) => {
    console.error(error);
});