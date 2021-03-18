(async () => {
    const canvas = document.getElementById('image_data_green_canvas');
    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '1px solid black';
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, width, height);
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let i = 0; i < imageData.data.length; i++) {
        if (i % 4 === 1) {
            imageData.data[i] = 0xff;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    const { data } = imageData;
    const canvas_data = document.getElementById('image_data_green_canvas_data');
    canvas_data.innerHTML = `
First ${0x100} bytes of the canvas data

hexdump({data, length: 0x100 })
${hexdump({ data, length: 0x100 })}
`

})();