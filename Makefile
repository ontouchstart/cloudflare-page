build:
	make -C wasm/simplest_wasm
	mdbook build
	cp -r wasm book
