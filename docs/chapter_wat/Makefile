build: empty_module \
	return_module \
	r_module \
	r_func_0_module \
	call_js_func_module \
	add_module \
	add_only_module \
	import_add_module

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

call_js_func_module:
	wat2wasm wat/call_js_func_module.wat -o wasm/call_js_func_module.wasm
	hexdump -C wasm/call_js_func_module.wasm

add_module:
	wat2wasm wat/add_module.wat -o wasm/add_module.wasm
	hexdump -C wasm/add_module.wasm

add_only_module:
	wat2wasm wat/add_only_module.wat -o wasm/add_only_module.wasm
	hexdump -C wasm/add_only_module.wasm

import_add_module:
	wat2wasm wat/import_add_module.wat -o wasm/import_add_module.wasm
	hexdump -C wasm/import_add_module.wasm
