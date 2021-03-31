# TypeScript in the Browser

## Version

```typescript
{
  const output = document.getElementById('version_output')! as HTMLPreElement;
  output.innerHTML = `
ts.version: ${ts.version}
`
}
```
<pre id="version_output"></pre>

## number test

```typescript
let num: number = 123;
{
  const output = document.getElementById('number_output')! as HTMLPreElement;
  output.innerHTML += JSON.stringify({num});
}
```
<pre id="number_output"></pre>

### greeter test
```typescript
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };
{
  const output = document.getElementById('greeter_output')! as HTMLPreElement;
  output.textContent += greeter(user);
}
```
<pre id="greeter_output"></pre>

<script src="/typescript/lib/typescriptServices.js"></script>
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

