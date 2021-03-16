all: 42 memory_empty 42_memory hex_memory_wasm

42:
	wat2wasm 42.wat
	hexdump 42.wasm

memory_empty:
	wat2wasm memory_empty.wat
	hexdump memory_empty.wasm

42_memory:
	wat2wasm 42_memory.wat
	hexdump 42_memory.wasm

hex_memory_wasm:
	wat2wasm hex_memory_wasm.wat
	hexdump hex_memory_wasm.wasm
