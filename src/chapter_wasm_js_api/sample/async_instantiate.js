(async () => {
    const importObj1 = {
        js: {
            import1: () => console.log("From importObj1"),
            import2: () => console.log("hello world!")
        }
    };

    const importObj2 = {
        js: {
            import1: () => console.log("From importObj2"),
            import2: () => console.log("hello world!")
        }
    };

    const response = await fetch('/chapter_wasm_js_api/sample/sample.wasm');
    console.log({ response });
    const buffer = await response.arrayBuffer();
    console.log({ buffer });

    if (WebAssembly.validate(buffer)) {
        const module = await WebAssembly.compile(buffer);
        console.log({ module });

        const instance1 = await WebAssembly.instantiate(module, importObj1);
        instance1.exports.f();

        const instance2 = await WebAssembly.instantiate(module, importObj2);
        instance2.exports.f();

    }
    else {
        console.error('invalid WASM');
    }
})();