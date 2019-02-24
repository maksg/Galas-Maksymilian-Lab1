document.addEventListener('DOMContentLoaded', appStart);

let canvas;
let ctx;

var brightness = 100;
var contrast = 100;
var saturation = 100;

var position = { x: 0, y: 0 };

let imageData;

function appStart() {
    canvas = document.querySelector('#ps');
    ctx = canvas.getContext('2d');

    let img = new Image();
    //img.src = 'https://picsum.photos/600/300/?random=1';
    img.src = './grafika.jpg';
    img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    })

    let brightnessSlider = document.querySelector('#brightness');
    brightnessSlider.oninput = function () {
        brightness = this.value;
        setupFilters();
    }

    let contrastSlider = document.querySelector('#contrast');
    contrastSlider.oninput = function () {
        contrast = this.value;
        setupFilters();
    }

    let saturationSlider = document.querySelector('#saturation');
    saturationSlider.oninput = function () {
        saturation = this.value;
        setupFilters();
    }

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', setPosition);
    canvas.addEventListener('mouseenter', setPosition);
}

function setupFilters() {
    var newImageData;
    newImageData = brightnessChange(imageData);
    newImageData = contrastChange(newImageData);
    newImageData = saturationChange(newImageData);

    ctx.putImageData(newImageData, 0, 0);
}

function brightnessChange(imageData) {
    let factor = brightness / 100.0;
    let newImageData = new ImageData(canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        newImageData.data[i] = fixPixel(imageData.data[i] * factor);
        newImageData.data[i + 1] = fixPixel(imageData.data[i + 1] * factor);
        newImageData.data[i + 2] = fixPixel(imageData.data[i + 2] * factor);
        newImageData.data[i + 3] = 255;
    }

    return newImageData;
}

function contrastChange(imageData) {
    let factor = contrast / 100.0;
    let newImageData = new ImageData(canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        newImageData.data[i] = fixPixel(factor * (imageData.data[i] - 128) + 128);
        newImageData.data[i + 1] = fixPixel(factor * (imageData.data[i + 1] - 128) + 128);
        newImageData.data[i + 2] = fixPixel(factor * (imageData.data[i + 2] - 128) + 128);
        newImageData.data[i + 3] = 255;
    }

    return newImageData;
}

function saturationChange(imageData) {
    let factor = saturation / 100.0;
    let newImageData = new ImageData(canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        var red = imageData.data[i];
        var green = imageData.data[i + 1];
        var blue = imageData.data[i + 2];
        var sat = Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114);

        newImageData.data[i] = fixPixel(sat + (red - sat) * factor);
        newImageData.data[i + 1] = fixPixel(sat + (green - sat) * factor);
        newImageData.data[i + 2] = fixPixel(sat + (blue - sat) * factor);

        newImageData.data[i + 3] = 255;
    }

    return newImageData;
}

function fixPixel(pixel) {
    if (pixel > 255) {
        return 255;
    } else if (pixel < 0) {
        return 0;
    }
    return pixel;
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