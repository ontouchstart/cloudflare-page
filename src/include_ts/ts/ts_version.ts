if (ts) {
    const output = document.getElementById('version_output')! as HTMLPreElement;
    output.innerHTML = `
  ts.version: ${ts.version}
  `
}