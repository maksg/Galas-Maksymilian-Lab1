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

function appStart() {
    window.addEventListener('keypress', playSound);
    var recordButtons = document.querySelectorAll('.record');
    var playButtons = document.querySelectorAll('.play');
    console.log(recordButtons);
    console.log(playButtons);

    for(var i=0; i<recordButtons.length; i++) {
        channels.push([]);
        isRecording.push(false);
        recStartTime.push(0);
    }
    
    console.log(channels);
    console.log(isRecording);
    console.log(recStartTime);

    recordButtons.forEach(button => {
        button.addEventListener('click', recordAudio);
    });
    playButtons.forEach(button => {
        button.addEventListener('click', playAudio);
    });

    //document.querySelector('#record').addEventListener('click', recordAudio);
    //document.querySelector('#play').addEventListener('click', playAudio);
}

function recordAudio(e) {
    var index = e.target.value;
    isRecording[index] = !isRecording[index];
    recStartTime[index] = Date.now();
    /*if(isRecording[index]) {
        channels[index] = [];
    }*/
    e.target.innerHTML = isRecording[index] ? 'Stop' : 'Record';
}

function playAudio() {
    var index = e.target.value;
    channels[index].forEach(sound => {
        setTimeout(
            () => {
                playAudioDOM(sound.name);
            }, sound.time
        )
    });
}

function playSound(e) {
    if(!sounds[e.charCode]) {
        return;
    }

    playAudioDOM(sounds[e.charCode]);

    console.log(isRecording);
    isRecording.forEach((isRecording, index) => {
        console.log(isRecording, index);
        if(isRecording) {
            console.log(channels[index]);
            channels[index].push(
                {
                    name: soundName,
                    time: Date.now() - recStartTime[index]
                }
            );
        }
    });

}

function playAudioDOM(soundName) {
    const audioDOM = document.querySelector(`#${soundName}`);
    audioDOM.currentTime = 0;
    audioDOM.play();
}