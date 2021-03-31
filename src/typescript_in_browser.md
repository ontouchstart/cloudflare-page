# TypeScript in the Browser

<pre id="output"></pre>
```typescript
let num: number = 123;
const output = document.getElementById('output')! as HTMLPreElement;
output.innerHTML = `
ts.version: ${ts.version}
`
output.innerHTML += JSON.stringify({num});
```

<script src="https://unpkg.com/typescript@latest/lib/typescriptServices.js"></script>
<script>
  let ts_code = '';
  const ts_code_sections = document.getElementsByClassName('language-typescript');
  for(let i = 0; i < ts_code_sections.length; i++) {
      ts_code += ts_code_sections[i].innerText;
  }
  console.log({ts});
  const js_code = ts.transpile(ts_code);
  console.log('ts_code');
  console.log(ts_code);
  console.log('js_code');
  console.log(js_code);
  eval(`(async () => { ${js_code }})()`);
</script>

