import Timer from "./Timer.js";

function muteAudio() {
    var audio = document.getElementById('audioPlayer');
    
    if (audio.mute = false) {
        document.getElementById('audioPlayer').muted = true;
    }
    else {
        audio.mute = true 
        document.getElementById('audioPlayer').muted = false;
        }
}
new Timer(
    document.querySelector(".timer")
);