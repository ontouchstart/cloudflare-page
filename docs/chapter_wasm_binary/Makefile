all:
	wat2wasm magic_version.wat
	hexdump -C magic_version.wasm

	wat2wasm func.wat
	hexdump -C func.wasm

	wat2wasm mem_func.wat
	hexdump -C mem_func.wasm

	wat2wasm import_mem_func.wat
	hexdump -C import_mem_func.wasm

