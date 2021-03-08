build:
	make -C wasm/simplest_wasm
	mdbook build
	cp -r wasm book

install:
	cargo install basic-http-server
	cargo install mdbook
	cargo install mdbook-mermaid
	cargo install mdbook-katex

start:
	basic-http-server book
