import init, {show_add} from '/chapter_rust/rust/call_js_func_module/pkg/call_js_func_module.js';

(async ()=> {
    const result = await init();
    console.log({result})
    const { memory } = result;
    console.log ( { memory });
    const { buffer }  = memory;
    console.log({ buffer });
    console.log(buffer.byteLength);

    const i32max = (0xffffffff - 1) / 2;
    document.getElementById(`call_js_func_module_output`).innerHTML += `

FROM chapter/js/module/call_js_func_modules.js
Memory buffer ${buffer.byteLength} bytes
`
    show_add(1,2);
    show_add(3,4);
    show_add(i32max, 1);
})();