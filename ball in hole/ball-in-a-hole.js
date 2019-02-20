document.addEventListener('DOMContentLoaded', appStart);

var canvas;
var ctx;
var player;
var holes = [];
var startDate;
var finishDate;

function appStart() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    startGame();
    
    window.addEventListener('deviceorientation', moveMe);

    animate();

    function animate() {
        player.update();

        holes.forEach(function (hole) {
            player.collidesWithHole(hole);
        });

        drawFrame();
        requestAnimationFrame(animate);
    }
}

function startGame() {
    player = new Player();
    player.setPosition(canvas.width / 2, canvas.height / 2);

    for (var i = 0; i < 2; i++) {
        var hole = new Hole()
        var x = Math.floor((Math.random() * canvas.width - hole.getSize().width * 2) + hole.getSize().width * 2);
        var y = Math.floor((Math.random() * canvas.height - hole.getSize().height * 2) + hole.getSize().height * 2);
        hole.setPosition(x, y);
        holes.push(hole);
    }

    holes[0].setActive();

    startDate = Date.now();
}

function Player() {
    var position = { x: 0.0, y: 0.0 };
    var size = { width: 20.0, height: 20.0 };
    var speed = { x: 0.0, y: 0.0 };

    this.setPosition = function (x, y) {
        if (x < size.width) {
            x = size.width;
        } else if (x > canvas.width - size.width) {
            x = canvas.width - size.width;
        }
        position.x = x;

        if (y < size.height) {
            y = size.height;
        } else if (y > canvas.height - size.height) {
            y = canvas.height - size.height;
        }
        position.y = y;
    };

    this.getPosition = function () {
        return position;
    };

    this.setSpeed = function (x, y) {
        speed.x = x;
        speed.y = y;
    };

    this.getSpeed = function () {
        return speed;
    };

    this.getSize = function () {
        return size;
    };

    this.render = function () {
        ctx.beginPath();
        ctx.arc(position.x, position.y, size.width, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
    }

    this.update = function () {
        this.setPosition(position.x + speed.x, position.y + speed.y);
    }

    this.collidesWithHole = function (hole) {
        var dx = position.x - hole.getPosition().x;
        var dy = position.y - hole.getPosition().y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < size.width + hole.getSize().width) {
            if (hole.isActive()) {
                holes.splice(0, 1);
                if (holes.length > 0) {
                    holes[0].setActive();
                } else {
                    finishDate = Date.now();
                    setTimeout(startGame, 3000);
                }
            } else {
                var x = Math.floor((Math.random() * canvas.width - size.width * 2) + size.width * 2);
                var y = Math.floor((Math.random() * canvas.height - size.height * 2) + size.height * 2);
                this.setPosition(x, y);
            }
        }
    }
}

function Hole() {
    var position = { x: 0.0, y: 0.0 };
    var size = { width: 20.0, height: 20.0 };
    var active = false;

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

    this.setActive = function () {
        active = true;
    }

    this.isActive = function () {
        return active;
    }

    this.render = function () {
        ctx.beginPath();
        ctx.arc(position.x, position.y, size.width, 0, 2 * Math.PI);
        if (active) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "black";
        }
        ctx.fill();
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(197,126,20)";
    ctx.fill();

    holes.forEach(function (hole) {
        hole.render();
    });

    player.render();

    var delta;
    if (holes.length > 0) {
        delta = Date.now() - startDate;
    } else {
        delta = finishDate - startDate;
    }
    var minutes = Math.floor(delta / 60000);
    var seconds = ((delta % 60000) / 1000).toFixed(0);
    var miliseconds = ((delta % 1000) / 10).toFixed(0);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (miliseconds < 10) {
        miliseconds = '0' + miliseconds;
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`${minutes}:${seconds}:${miliseconds}`, canvas.width/2, 50); 
}

function moveMe(event) {
    player.setSpeed(event.gamma / 2, event.beta / 2);
}