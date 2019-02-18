document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    var size = { width: canvas.width, height: canvas.height };

    var player = new Player(ctx);
    player.setPosition(size.width / 2, size.height / 2);

    window.addEventListener('deviceorientation', function(event) {
        moveMe(event, player, size);
    });

    animate();

    function animate() {
        drawFrame(player, ctx, size);
        requestAnimationFrame(animate);
    }
}

function Player(ctx) {
    var position = { x: 0, y: 0 };
    var size = { width: 30, height: 30 };

    this.setPosition = function (x, y) {
        position.x = x;
        position.y = y;
    };

    this.getPosition = function () {
        return position;
    };

    this.getSize = function () {
        return size;
    };

    this.render = function () {
        ctx.beginPath();
        ctx.arc(position.x, position.y, size.width, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}

function drawFrame(player, ctx, size) {
    ctx.clearRect(0, 0, size.width, size.height);

    ctx.beginPath();
    ctx.rect(0, 0, size.width, size.height);
    ctx.fillStyle = "rgb(197,126,20)";
    ctx.fill();

    player.render();
}

function moveMe(event, player, size) {
    var widthMultiplier = size.width / 180;
    var heightMultiplier = size.height / 180;
    player.setPosition(size.width / 2 + event.gamma * widthMultiplier, size.height / 2 + event.beta * heightMultiplier);
    console.log(event);
}