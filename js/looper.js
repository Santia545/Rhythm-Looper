let videoId = 'LB1fmj3R_Wc';
let tag = document.createElement('script');
let externalTag = document.getElementById('myTag');
let startTime = 0;
let endTime = 100;
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const slider3 = document.getElementById('slider3');
tag.src = "https://www.youtube.com/iframe_api";
document.body.insertBefore(tag, externalTag);
document.getElementById('btn').onclick = () => {
    player.seekTo(startTime);
    player.playVideo();
}

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });

}

window.addEventListener('resize', function () {
    const playerWrapper = document.getElementById('player');
    const playerWidth = playerWrapper.getBoundingClientRect().width;
    const playerHeight = playerWidth * 9 / 16;
    player.setSize(playerWidth, playerHeight);
});
let interval = null;
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        interval = setInterval(function () {
            var currentTime = player.getCurrentTime();
            endTime = document.getElementById('slider2').value;
            console.log(`current time: ${currentTime}>=endTime: ${endTime}?${currentTime >= endTime}`);
            if (currentTime >= endTime) {
                player.seekTo(startTime);
            }
        }, 100);
    } else {
        clearInterval(interval);
        interval = null;
    }
    if (event.data == 0) { player.seekTo(startTime) }
}

function onPlayerReady(event) {
    event.target.setPlaybackRate(Number(slider3.value)); // set to half speed
    const playerWrapper = document.getElementById('player');
    const playerWidth = playerWrapper.offsetWidth;
    const playerHeight = playerWidth * 9 / 16;
    player.setSize(playerWidth, playerHeight);
    let length = Number(player.getDuration() - 1);
    slider1.max = length;
    slider1.value = 0;
    slider2.min = 0;
    slider2.max = length;
    slider2.value = length;
    startTime = 0;
    endTime = length;
    document.getElementById('stop').value = fancyTimeFormat(length);
    document.getElementById('slider2').value = length;

}

function fancyTimeFormat(duration) {
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
function timeToSeconds(timeString) {
    var timeParts = timeString.split(":"); 
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    if (timeParts.length === 1) {
        seconds = parseFloat(timeParts[0]);
    } else if (timeParts.length === 2) {
        minutes = parseFloat(timeParts[0]); 
        seconds = parseFloat(timeParts[1]); 
    } else if (timeParts.length === 3) {
        hours = parseFloat(timeParts[0]); 
        minutes = parseFloat(timeParts[1]); 
        seconds = parseFloat(timeParts[2]); 
    } else {
        return NaN;
    }
    var totalSeconds = (hours * 3600) + (minutes * 60) + seconds; 
    return totalSeconds; 
}
function getVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}
