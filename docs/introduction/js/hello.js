(async () => {
    const code = `
    fn main () {
        println!("Hello, world!");
    }
    `;
    const edition = "2018";
    const version = "stable";
    const optimize = "0";
    const api = "https://play.rust-lang.org/evaluate.json";
    const result = await (await fetch(api, {
        method: "POST",
        body: JSON.stringify({code, edition, version, optimize })
    })).json();
    console.log({result});
    document.getElementById('result').innerHTML = JSON.stringify(result, null, 2);

})();