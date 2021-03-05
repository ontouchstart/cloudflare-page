# Cloudflare Worker Test

[https://ontouchstart-rustwasm-markdown-parser.ontouchstart.workers.dev](https://ontouchstart-rustwasm-markdown-parser.ontouchstart.workers.dev)

<div id="output">Output</div>

<script>
  (async () => {
    const output_html = await (await fetch('https://ontouchstart-rustwasm-markdown-parser.ontouchstart.workers.dev/')).text();
    document.getElementById('output').innerHTML = output_html;
  })();
</script>
