(module
  (import "dom" "log" (func (param i32 i32 )))
  (func (param $input i32)
    local.get $input ;; pass input to log
    local.get $input ;; pass output to log
    call 0)
  (export "log" (func 1))
)