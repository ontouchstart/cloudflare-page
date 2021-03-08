build:
	make -C wasm/simplest_wasm
	make -C wasm/link_section
	make -C wasm/double
	mdbook build
	cp -r wasm book

