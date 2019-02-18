document.addEventListener('DOMContentLoaded', appStart);

let canvas;
let ctx;
let imageData;

function appStart() {
    canvas = document.querySelector('#ps');
    ctx = canvas.getContext('2d');

    let img = new Image();
    //img.src = 'https://picsum.photos/600/300/?random=1';
    img.src = './grafika.jpg';
    img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    })

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imageData);

    let brightnessSlider = document.querySelector('#brightness');

    brightnessSlider.oninput = function () {
        brightnessChange(this.value);
    }

    let contrastSlider = document.querySelector('#contrast');

    contrastSlider.oninput = function () {
        contrastChange(this.value);
    }
}

function brightnessChange(value) {
    canvas.style.filter = `brightness(${value}%)`;
}

function contrastChange(value) {
    canvas.style.filter = `contrast(${value}%)`;
}