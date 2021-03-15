build:
	make -C src/wasm/simplest_wasm
	make -C src/wasm/link_section
	make -C src/wasm/double
	make -C src/wasm/memory
	make -C src/chapter_wat
	make -C src/chapter_rust
	make -C src/chapter_emcc
	mdbook build

view:
	# cargo install basic-http-server
	basic-http-server docs	
