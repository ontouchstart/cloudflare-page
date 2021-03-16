(module 
  (memory (import "js" "mem") 1)
  (func (export "store") i32.const 0 i32.const 42 i32.store)
  (func (export "load") (result i32) i32.const 0 i32.load)
)
