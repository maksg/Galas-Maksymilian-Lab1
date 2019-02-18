document.addEventListener('DOMContentLoaded', appStart);

let canvas;

var brightness = 100;
var contrast = 100;
var saturation = 100;

function appStart() {
    canvas = document.querySelector('#ps');
    let ctx = canvas.getContext('2d');

    let img = new Image();
    img.src = 'https://picsum.photos/600/300/?random=1';
    //img.src = './grafika.jpg';
    img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    })

    let brightnessSlider = document.querySelector('#brightness');

    brightnessSlider.oninput = function () {
        brightnessChange(this.value);
    }

    let contrastSlider = document.querySelector('#contrast');

    contrastSlider.oninput = function () {
        contrastChange(this.value);
    }

    let saturationSlider = document.querySelector('#saturation');

    saturationSlider.oninput = function () {
        saturationChange(this.value);
    }
}

function brightnessChange(value) {
    brightness = value;
    setFilters();
}

function contrastChange(value) {
    contrast = value;
    setFilters();
}

function saturationChange(value) {
    saturation = value;
    setFilters();
}

function setFilters() {
    canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
}