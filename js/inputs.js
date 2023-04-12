
const inputStart = document.getElementById('start');
const inputStop = document.getElementById('stop');

$('#url').on('change', function () {
    alert("change");
    var inputValue = $(this).val();
    videoId = getVideoId(inputValue);
    player.destroy();
    player = new YT.Player('player', {
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });
});

function checkMinSliderValue(event) {
    let value = Number(event.target.value);
    console.log(`min slider: new value ${value}, current Max value ${Number(slider2.value) - 1}`);
    console.log(`${value}<${Number(slider2.value - 1)}?${value < Number(slider2.value) - 1}`);
    if (value < Number(slider2.value - 1)) {
        inputStart.value = value;
        slider1.value = value;
        console.log("value changed to: " + event.target.value);
        startTime = value;
    } else {
        inputStart.value = Number(slider2.value) - 1;
        slider1.value = Number(slider2.value) - 1;
    }
    console.log("Current start slider value" + Number(slider1.value));
}
function checkMaxSliderValue(event) {
    let value = Number(event.target.value);
    console.log(`max slider: new value ${value}, current min value ${Number(slider1.value) + 1}`);
    console.log(`${value}>${slider1.value + 1}?${value > Number(slider1.value) + 1}`);
    if (value > Number(slider1.value) + 1) {
        inputStop.value = value;
        slider2.value = value;
        endTime = value;
    } else {
        inputStop.value = Number(slider1.value) + 1;
        slider2.value = Number(slider1.value) + 1;
    }
    console.log("Current stop slider value" + Number(slider2.value));
}
function checkStartValue(event) {
    let value = Number(event.target.value);
    if (value < 0 || value >= Number(slider2.value)) {
        inputStart.value = Number(slider1.value);
    } else {
        slider1.value = value;
        startTime = value;
    }
    console.log("Current start slider value" + slider1.value);
}
function checkStopValue(event) {
    let value = Number(event.target.value);
    if (value > Number(slider2.max) || value <= Number(slider1.value)) {
        inputStop.value = Number(slider2.value);
    } else {
        slider2.value = value;
        stopTime = value;
    }
    console.log("Current stop slider value" + Number(slider1.value));
}

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }
  console.log(
    fancyTimeFormat(1),
    fancyTimeFormat(10),
    fancyTimeFormat(100),
    fancyTimeFormat(1000),
    fancyTimeFormat(10000),
  );




