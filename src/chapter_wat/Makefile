build: empty_module return_module r_module r_func_0_module

empty_module:
	wat2wasm wat/empty_module.wat -o wasm/empty_module.wasm
	hexdump -C wasm/empty_module.wasm

return_module:
	wat2wasm wat/return_module.wat -o wasm/return_module.wasm
	hexdump -C wasm/return_module.wasm

r_module:
	wat2wasm wat/r_module.wat -o wasm/r_module.wasm
	hexdump -C wasm/r_module.wasm

r_func_0_module:
	wat2wasm wat/r_func_0_module.wat -o wasm/r_func_0_module.wasm
	hexdump -C wasm/r_func_0_module.wasm
	-diff wat/r_module.wat wat/r_func_0_module.wat	
	-diff wasm/r_module.wasm wasm/r_func_0_module.wasm
