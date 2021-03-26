# Stack and Heap
[source code](https://github.com/ontouchstart/cloudflare-page/blob/master/src/stack_and_heap.md)

## Chrome DevTools
The latest Chrome browser allows us to [debug native WebAssembly in Chrome DevTools](https://developers.google.com/web/updates/2020/12/webassembly). To see this page in action, you need to step through the WASM in DevTools.

![](/stack_and_heap/screenshot1.png)
![](/stack_and_heap/screenshot2.png)
![](/stack_and_heap/screenshot3.png)
![](/stack_and_heap/screenshot4.png)

## code

```javascript
 const code = [
    0x00, // no local
    0x41, 0x00, // address: i32.const 0x00
    0x41, 0x01, // value: i32.const 0x01
    0x36, 0x02, 0x00, // i32.store 
  ];
```

## Hexdump of the heap 

We also add hexdump to show the heap before and after.

### before 
<pre id="heap_before"></pre>

### after

<pre id="heap_after"></pre>

## Machine

```javascript
let x = 0;
let y = 0;
let offset = 0;
const hexdump = ({ hex, data } ) => {
    let output = '';
    for (let i = offset; i < offset + 0x100; i += 4) {
        if (i < data.length - 4) {
            // the byte order is different from canvas version 
            // because we do not group 4 byte as a representation of an i32 
            for (let j = 0; j < 4; j++) {  
                if (data[i + j] < 0x10) {
                    output += `0${data[i + j].toString(16)}`;
                } else {
                    output += `${data[i + j].toString(16)}`;
                }
            }
            if (((i - offset) % 0x20) === 0x1c) {
                output += '\n';
            }
            else {
                output += ' ';
            }
        }
    }
    hex.innerHTML = `
x: 0x${parseInt(x).toString(16)}
y: 0x${parseInt(y).toString(16)}
offset: 0x${offset.toString(16)} 
(mouse point = upper left corner of hexdump)        

(8 x 8) i32 = 256 bytes (1/256 of the total memory of a 64K page)
(0x${0x10000.toString(16)} = 0x${0x100.toString(16)} * 0x${0x100.toString(16)} = ${0x100 * 0x100} )

${output}
`;
};
```

```javascript
const section = (i, data) => {
    if(i === 0x01) { // type
        return [i, 0x04, 0x01, 0x60, 0x00, 0x00]; 
    }
    if(i === 0x02) { // import
        if(data[i].length === 5) {
            const mod = data[i][0].split('');
            const name = data[i][1].split('');
            const type = data[i][2];
            const min = data[i][3];
            const max = data[i][4];
            const total = mod.length + name.length + 6;
            return [
              i, 
              total, 
              0x01, 
              mod.length, mod.map(d => (d.charCodeAt(0))),
              name.length, name.map(d => (d.charCodeAt(0))),
              type, 
              min, 
              max].flat();
        }
        else {
            return [];
        }
    }
    if(i === 0x03) { // func
        return [i, 0x02, 0x01, 0x00];
    }
    if(i === 0x07) { // export
        return [];
    }
    if(i === 0x08) { // start
        return [i, 0x01, 0x00]
    }
    if(i === 0x0a) { // code
        if(data[i].length > 1 ) {
            const total = data[i].length + 3;
            return [i, total, 0x01, data[i].length + 1, data[i], 0x0b].flat();
           
        }
        else {
          return [i, 0x04, 0x01, 0x02, 0x00, 0x0b];
        }
    }
    return [];
}

const wasm = async ({ code }) => {
    const data = [
    [], // 0 custom section
    [], // 1 type section
    ["js", "mem", 0x02, 0x00, 0x01], // 2 import section memory type
    [], // 3 function section 
    [], // 4 table section
    [], // 5 memory section
    [], // 6 global section
    [], // 7 export section
    [], // 8 start section
    [], // 9 element section
    code, // 10 code section store 0x01 at the first byte
    [], // 11 data section
    [], // 12 data count section
];
    const magic = [0x00, 0x61, 0x73, 0x6d];
    const version = [0x01, 0x00, 0x00, 0x00];
    let bytes = magic.concat(version);
    for(let i = 0; i < data.length; i++) {
        console.log('section', i, section(i, data));
        bytes = bytes.concat(section(i, data));
    }
    return await WebAssembly.compile((new Uint8Array(bytes)).buffer);
}

const module = await wasm({ code });
const mem = new WebAssembly.Memory({ initial: 1, maximum: 1 });
const heap = new Uint8Array(mem.buffer);

{
    const hex = document.getElementById('heap_before');
    const data = heap;
    hexdump({hex, data});
}
    
const env = { js: { mem }};
const instance = await WebAssembly.instantiate(module, env);
     
{
    const hex = document.getElementById('heap_after');
    const data = heap;
    hexdump({hex, data});
}

```

## More code

We can reuse the same heap memory and create more WASM stack machines in their own namespaces. Here is a complete example

```javascript
{
    const code = [
        0x00, // no local
        0x41, 0x01, // address: i32.const 0x01
        0x41, 0xff, 0x01, // value: i32.const 0xff
        0x36, 0x02, 0x00, // i32.store 
    ];
    const module = await wasm({ code } );
    const env = { js: { mem }};
    const instance = await WebAssembly.instantiate(module, env);
    const hex = document.getElementById('more_hex');
    hexdump({hex, data: heap});
}
```
<pre id="more_hex"><pre>

<script>
  let code = '(async () => {';
  const code_sections = document.getElementsByClassName('language-javascript');
  
  for(let i = 0; i < code_sections.length; i++) {
      code += code_sections[i].innerText;
  }
  code += '})()';
  eval(code);
</script>