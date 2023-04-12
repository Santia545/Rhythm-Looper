let videoId = '0zivUr36390';
let tag = document.createElement('script');
let externalTag = document.getElementById('myTag');
let startTime=0;
let endTime=100;
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
tag.src = "https://www.youtube.com/iframe_api";
document.body.insertBefore(tag, externalTag);
document.getElementById('btn').onclick = () => {
    updateSection();
}

//Set up Youtube Iframe API.
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

// Resize player on window resize
window.addEventListener('resize', function() {
    const playerWrapper = document.getElementById('player');
    const playerWidth = playerWrapper.getBoundingClientRect().width;
    const playerHeight = playerWidth * 9 / 16; 
    player.setSize(playerWidth, playerHeight);
});

function onPlayerStateChange(event) {
    console.log(event.data)
    if (event.data == 0) { updateSection() }
}

function onPlayerReady(event) {
    const playerWrapper = document.getElementById('player');
    const playerWidth = playerWrapper.offsetWidth;
    const playerHeight = playerWidth * 9 / 16; 
    console.log(`width: ${playerWidth} height: ${playerHeight}`);
    player.setSize(playerWidth, playerHeight);
    //alert("ready:"+player.getDuration());
    let length = Number(player.getDuration()-1);
    slider1.max = length;
    slider1.value = 0;
    slider2.min = 0;
    slider2.max = length;
    slider2.value = length;
    startTime=0;
    endTime=length;
    document.getElementById('stop').value = length;
    document.getElementById('slider2').value = length;

}
function updateSection() {
    startTime = document.getElementById('start').value;
    endTime = document.getElementById('stop').value;
    player.loadVideoById({
        videoId: videoId,
        startSeconds: Number(startTime),
        endSeconds: Number(endTime),
    });
    player.playVideo();
}


function getVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}
