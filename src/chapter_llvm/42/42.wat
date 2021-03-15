(module
  (type (;0;) (func (result i32)))
  (func $answer (type 0) (result i32)
    i32.const 42)
  (memory (;0;) 2)
  (global (;0;) (mut i32) (i32.const 66560))
  (export "memory" (memory 0))
  (export "answer" (func $answer)))
