use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = dom)]
    fn log(x: i32, y: i32, output: i32);
}

fn add(x: i32, y: i32) -> i32 {
    x + y
}

#[wasm_bindgen]
pub fn show_add(x: i32, y: i32) {
    let output = add(x, y);
    log(x, y, output);
}
