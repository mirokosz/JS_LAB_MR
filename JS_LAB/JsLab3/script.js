document.addEventListener('DOMContentLoaded', function () {
    const sounds = {
        65: new Audio('sounds/kick.wav'),
        83: new Audio('sounds/snare.wav'),
        68: new Audio('sounds/hihat.wav'),
        70: new Audio('sounds/boom.wav'),
        71: new Audio('sounds/openhat.wav'),
        72: new Audio('sounds/tom.wav'),
        74: new Audio('sounds/tinka.wav'),
        75: new Audio('sounds/ride.wav'),
        76: new Audio('sounds/clap.wav'),
    };

    const channels = [[], [], [], []];
    let isRecording = [false, false, false, false];
    let startTime;
    let metronomeInterval;
    let bpm = 120;
    let metronomeOn = false;

    function playSound(key) {
        const sound = sounds[key];
        if (sound) {
            sound.currentTime = 0;
            sound.play();
            recordSound(key);
        }
    }

    function recordSound(key) {
        if (isRecording.some(recording => recording)) {
            const time = Date.now() - startTime;
            isRecording.forEach((recording, index) => {
                if (recording) {
                    channels[index].push({ key, time });
                }
            });
        }
    }

    function playChannel(channel) {
        channels[channel].forEach(sound => {
            setTimeout(() => playSound(sound.key), sound.time);
        });
    }

    function startRecording(channel) {
        isRecording.fill(false);
        isRecording[channel] = true;
        channels[channel] = [];
        startTime = Date.now();
    }

    function stopRecording() {
        isRecording.fill(false);
    }

    function toggleMetronome() {
        if (metronomeOn) {
            clearInterval(metronomeInterval);
            metronomeOn = false;
        } else {
            const interval = (60 / bpm) * 1000;
            metronomeInterval = setInterval(() => {
                playSound(65); // Kick sound for metronome
            }, interval);
            metronomeOn = true;
        }
    }

    function handleKeydown(event) {
        playSound(event.keyCode);
    }

    document.addEventListener('keydown', handleKeydown);

    document.getElementById('record1').addEventListener('click', () => startRecording(0));
    document.getElementById('record2').addEventListener('click', () => startRecording(1));
    document.getElementById('record3').addEventListener('click', () => startRecording(2));
    document.getElementById('record4').addEventListener('click', () => startRecording(3));

    document.getElementById('play1').addEventListener('click', () => playChannel(0));
    document.getElementById('play2').addEventListener('click', () => playChannel(1));
    document.getElementById('play3').addEventListener('click', () => playChannel(2));
    document.getElementById('play4').addEventListener('click', () => playChannel(3));
    document.getElementById('playAll').addEventListener('click', () => {
        playChannel(0);
        playChannel(1);
        playChannel(2);
        playChannel(3);
    });

    document.getElementById('toggle-metronome').addEventListener('click', toggleMetronome);

    document.getElementById('bpm').addEventListener('input', event => {
        bpm = event.target.value;
        if (metronomeOn) {
            toggleMetronome();
            toggleMetronome();
        }
    });
});