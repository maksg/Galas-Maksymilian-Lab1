document.addEventListener('DOMContentLoaded', appStart);

let canvas;
let ctx;

var brightness = 100;
var contrast = 100;
var saturation = 100;
var blur = 0;
var sepia = 0;
var invert = 0;

var position = { x: 0, y: 0 };

function appStart() {
    canvas = document.querySelector('#ps');
    ctx = canvas.getContext('2d');

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

    let blurSlider = document.querySelector('#blur');
    blurSlider.oninput = function () {
        blurChange(this.value);
    }

    let sepiaSlider = document.querySelector('#sepia');
    sepiaSlider.oninput = function () {
        sepiaChange(this.value);
    }

    let invertSlider = document.querySelector('#invert');
    invertSlider.oninput = function () {
        invertChange(this.value);
    }

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', setPosition);
    canvas.addEventListener('mouseenter', setPosition);
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

function blurChange(value) {
    blur = value;
    setFilters();
}

function sepiaChange(value) {
    sepia = value;
    setFilters();
}

function invertChange(value) {
    invert = value;
    setFilters();
}

function setFilters() {
    canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%) invert(${invert}%)`;
}

function setPosition(e) {
    position = getMousePosition(canvas, e);
}

function draw(e) {
    if (e.buttons !== 1) {
        return;
    }

    ctx.beginPath();

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.moveTo(position.x, position.y);
    setPosition(e);
    ctx.lineTo(position.x, position.y);

    ctx.stroke();
}

function getMousePosition(dom, event) {
    var rect = dom.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}