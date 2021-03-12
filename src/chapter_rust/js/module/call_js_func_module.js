import init, {show_add} from '/chapter_rust/rust/call_js_func_module/pkg/call_js_func_module.js';

(async ()=> {
    const result = await init();
    console.log({result})
    const i32max = (0xffffffff - 1) / 2;
    show_add(1,1);
    show_add(3,4);
    show_add(i32max, 1);
})();