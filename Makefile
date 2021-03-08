build:
	make -C wasm/simplest_wasm
	make -C wasm/link_section
	make -C wasm/double
	make -C wasm/memory
	mdbook build
	cp -r wasm book

