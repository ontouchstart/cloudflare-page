(module
  (import "dom" "log" (func $log (param i32)))
  (func (param $input i32)
    local.get $input
    call $log)
  (export "log" (func 0))
)