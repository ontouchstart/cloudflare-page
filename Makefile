build:
	make -C wasm/simplest_wasm
	mdbook build
	cp -r wasm book
	curl https://raw.githubusercontent.com/mermaid-js/mermaid/8.9.0/dist/mermaid.min.js.map > book/mermaid.min.js.map

install:
	cargo install basic-http-server
	cargo install mdbook
	cargo install mdbook-mermaid
	cargo install mdbook-katex

start:
	basic-http-server book
