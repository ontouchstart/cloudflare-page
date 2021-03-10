build:
	make -C src/wasm/simplest_wasm
	make -C src/wasm/link_section
	make -C src/wasm/double
	make -C src/wasm/memory
	mdbook build
