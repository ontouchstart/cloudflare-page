(module
  (func (param i32 i32) (result i32) ;; add(x, y)
    local.get 0
    local.get 1
    i32.add)
  (export "add" (func 0))
)