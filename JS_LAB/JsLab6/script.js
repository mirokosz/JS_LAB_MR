const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let numBalls = 50;
let lineDistance = 100;
let forceStrength = 50;
let animationFrameId;

const numBallsInput = document.getElementById('numBalls');
const lineDistanceInput = document.getElementById('lineDistance');
const forceStrengthInput = document.getElementById('forceStrength');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

numBallsInput.addEventListener('input', () => {
    numBalls = parseInt(numBallsInput.value);
});

lineDistanceInput.addEventListener('input', () => {
    lineDistance = parseInt(lineDistanceInput.value);
});

forceStrengthInput.addEventListener('input', () => {
    forceStrength = parseInt(forceStrengthInput.value);
});

startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);

class Ball {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function init() {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        const radius = 20;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
        balls.push(new Ball(x, y, dx, dy, radius));
    }
}

function connectBalls() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dist = getDistance(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
            if (dist < lineDistance) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = 'green';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    connectBalls();
    balls.forEach(ball => ball.update());
}

function start() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    init();
    animate();
}

function reset() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
}

canvas.addEventListener('mousemove', (event) => {
    balls.forEach(ball => {
        const dist = getDistance(ball.x, ball.y, event.clientX, event.clientY);
        if (dist < lineDistance) {
            const angle = Math.atan2(ball.y - event.clientY, ball.x - event.clientX);
            const force = (forceStrength / 100) * (lineDistance - dist);
            ball.dx += Math.cos(angle) * force;
            ball.dy += Math.sin(angle) * force;
        }
    });
});

canvas.addEventListener('click', (event) => {
    balls.forEach((ball, index) => {
        const dist = getDistance(ball.x, ball.y, event.clientX, event.clientY);
        if (dist < ball.radius) {
            balls.splice(index, 1);
            balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, ball.radius));
            balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, ball.radius));
        }
    });
});