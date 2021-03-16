(module 
  (memory (import "js" "mem") 1)
  (import "js" "hex" (func (param i32) ))
  (func (export "store") (param i32 i32) (result i32) 
    local.get 0
    local.get 1
    i32.store
    local.get 0
    i32.load)
  (export "hex" (func 0))
)
