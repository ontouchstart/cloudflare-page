; ModuleID = '42.c'
source_filename = "42.c"
target datalayout = "e-m:e-p:32:32-i64:64-n32:64-S128"
target triple = "wasm32"

; Function Attrs: noinline nounwind optnone
define hidden i32 @answer() #0 {
  ret i32 42
}

attributes #0 = { noinline nounwind optnone "frame-pointer"="none" "no-trapping-math"="true" "stack-protector-buffer-size"="8" "target-cpu"="generic" }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{!"clang version 13.0.0 (https://github.com/llvm/llvm-project.git 1c5f08312874717caf5d94729d825c32845773ec)"}
