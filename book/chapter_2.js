(async () => {
    const api = 'https://ontouchstart-rustwasm-markdown-parser.ontouchstart.workers.dev/';
    const output_html = await (
        await fetch(api)
    ).text();
    document.getElementById('output').innerHTML = output_html;
})();