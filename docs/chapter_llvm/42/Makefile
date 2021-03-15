CLANG=/usr/local/opt/emscripten/libexec/llvm/bin/clang
LLC=/usr/local/opt/emscripten/libexec/llvm/bin/llc
LD=/usr/local/opt/emscripten/libexec/llvm/bin/wasm-ld
WASM2WAT=wasm2wat

all:
	$(CLANG) --target=wasm32 -emit-llvm -c -S 42.c
	$(LLC) -march=wasm32 -filetype=obj 42.ll
	$(LD) --no-entry --export=answer -o 42.wasm 42.o
	$(WASM2WAT) -o 42.wat 42.wasm

clean:
	rm 42.o 42.ll 42.wasm 42.wat
