{
    let num: number = 123;
    const output = document.getElementById('number_output')! as HTMLPreElement;
    output.innerHTML += JSON.stringify({ num });
}