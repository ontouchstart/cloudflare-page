build:
	make -C wasm/simplest_wasm
	make -C wasm/link_section
	mdbook build
	cp -r wasm book

