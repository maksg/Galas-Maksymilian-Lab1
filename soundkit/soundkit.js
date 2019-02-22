document.addEventListener('DOMContentLoaded', appStart);

const sounds = {
    97: 'boom',
    115: 'clap',
    100: 'hihat',
    102: 'kick',
    103: 'openhat',
    104: 'ride',
    106: 'snare',
    107: 'tink',
    108: 'tom'
};

const channels = [];

const isRecording = [];
const recStartTime = [];

// Start app
function appStart() {
    window.addEventListener('keypress', function (e) {
        var charCode = e.charCode;
        playSound(charCode);
    });

    // Get buttons
    var recordButtons = document.querySelectorAll('.record');
    var playButtons = document.querySelectorAll('.play');
    var keyButtons = document.querySelectorAll('.key');

    // Initialize everything
    for(var i=0; i<recordButtons.length; i++) {
        channels.push([]);
        isRecording.push(false);
        recStartTime.push(0);
    }

    // Add click events
    recordButtons.forEach(button => {
        button.addEventListener('click', recordAudio);
    });
    playButtons.forEach(button => {
        button.addEventListener('click', playAudio);
    });
    keyButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            var charCode = e.target.value;
            playSound(charCode);
        });
    });
}

// Start or stop recording
function recordAudio(e) {
    var index = e.target.value;
    isRecording[index] = !isRecording[index];
    recStartTime[index] = Date.now();
    if(isRecording[index]) {
        channels[index] = [];
    }
    e.target.innerHTML = isRecording[index] ? 'Stop' : 'Record';
}

// Play recorded audio
function playAudio(e) {
    var index = e.target.value;
    channels[index].forEach(sound => {
        setTimeout( () => {
                playAudioDOM(sound.name);
            }, sound.time
        )
    });
}

// Play sound based on pressed key
function playSound(charCode) {
    var soundName = sounds[charCode]

    if (!soundName) {
        return;
    }

    playAudioDOM(soundName);

    // Add sound if channel is recording
    isRecording.forEach((isRecording, index) => {
        if(isRecording) {
            channels[index].push(
                {
                    name: soundName,
                    time: Date.now() - recStartTime[index]
                }
            );
        }
    });

}

// Play audio file
function playAudioDOM(soundName) {
    const audioDOM = document.querySelector(`#${soundName}`);
    audioDOM.currentTime = 0;
    audioDOM.play();
}