(async () => {
    var importObject = {};
    const response = await fetch('wasm/link_section/link_section.wasm');
    const bytes = await response.arrayBuffer();
    const mod = await WebAssembly.compile(bytes);
    
    console.log({ response, bytes, mod});
    const sections = WebAssembly.Module.customSections(mod, "data");
    const decoder = new TextDecoder();
    const text = decoder.decode(sections[0]);
    console.log({ response, mod, sections })
    document.getElementById('answer').innerHTML = `
    <h2>${text}</h2>
    `
})();