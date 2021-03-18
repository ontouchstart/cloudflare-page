(async () => {
    const canvas = document.getElementById('image_data_blank_canvas');
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.border = '1px solid black';
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const canvas_data = document.getElementById('image_data_blank_canvas_data');
    canvas_data.innerHTML = `
First ${0x100}$ bytes of the canvas data

hexdump({data, length: 0x100 })

${hexdump({ data, length: 0x100 })}
`

})();