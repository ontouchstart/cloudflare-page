build: empty_module return_module

empty_module:
	wat2wasm wat/empty_module.wat -o wasm/empty_module.wasm
	hexdump -C wasm/empty_module.wasm

return_module:	
	wat2wasm wat/return_module.wat -o wasm/return_module.wasm
	hexdump -C wasm/return_module.wasm