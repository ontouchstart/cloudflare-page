all: empty 42 memory_empty 42_memory hex_memory_wasm

empty:
	wat2wasm empty.wat
	hexdump -C empty.wasm

42:
	wat2wasm 42.wat
	hexdump -C 42.wasm

memory_empty:
	wat2wasm memory_empty.wat
	hexdump -C memory_empty.wasm

42_memory:
	wat2wasm 42_memory.wat
	hexdump -C 42_memory.wasm

hex_memory_wasm:
	wat2wasm hex_memory_wasm.wat
	hexdump -C hex_memory_wasm.wasm
