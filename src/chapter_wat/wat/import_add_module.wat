(module
  (import "dom" "show_add" (func (param i32 i32 i32))) ;; add(x, y, result)
  (import "external" "add" (func (param i32 i32) (result i32))) ;; add(x, y)
  (func (param i32 i32) 
    local.get 0 ;; for the first param in dom.add
    local.get 1 ;; for the second param in dom.add
    local.get 0
    local.get 1
    call 1 ;; for the third param in dom.add
    call 0 ;;
  )
  (export "add" (func 2))
)