(module 
  (memory 1) 
  (func (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.store
    local.get 1
  ) 
  (export "m" (memory 0 )) 
  (export "f" (func 0 ))
)
