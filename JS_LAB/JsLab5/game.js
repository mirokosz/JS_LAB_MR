const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const timerDisplay = document.getElementById('timer');
const recordsList = document.getElementById('records-list');

let ballX = Math.random() * 280;
let ballY = Math.random() * 280;
let holeX = Math.random() * 280;
let holeY = Math.random() * 280;
let startTime = null;
let timer = null;
let records = [];

ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';
hole.style.left = holeX + 'px';
hole.style.top = holeY + 'px';

function startTimer() {
    startTime = new Date();
    timer = setInterval(updateTimer, 100);
}

function stopTimer() {
    clearInterval(timer);
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    records.push(timeTaken);
    records.sort((a, b) => a - b);
    updateRecords();
}

function updateTimer() {
    const currentTime = new Date();
    const elapsed = (currentTime - startTime) / 1000;
    timerDisplay.textContent = `Czas: ${elapsed.toFixed(1)}s`;
}

function updateRecords() {
    recordsList.innerHTML = '';
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${record.toFixed(1)}s`;
        recordsList.appendChild(li);
    });
}

function checkCollision() {
    const dx = ballX - holeX;
    const dy = ballY - holeY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 20) {
        stopTimer();
        resetGame();
    }
}

function resetGame() {
    ballX = Math.random() * 280;
    ballY = Math.random() * 280;
    holeX = Math.random() * 280;
    holeY = Math.random() * 280;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    hole.style.left = holeX + 'px';
    hole.style.top = holeY + 'px';
    startTimer();
}

window.addEventListener('deviceorientation', (event) => {
    const { beta, gamma } = event;
    const maxTilt = 30;

    const tiltX = Math.max(-maxTilt, Math.min(maxTilt, gamma));
    const tiltY = Math.max(-maxTilt, Math.min(maxTilt, beta));

    ballX += tiltX * 0.1;
    ballY += tiltY * 0.1;

    ballX = Math.max(0, Math.min(280, ballX));
    ballY = Math.max(0, Math.min(280, ballY));

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    checkCollision();
});

resetGame();