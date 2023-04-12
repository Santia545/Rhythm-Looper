
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
        inputStart.value = fancyTimeFormat(value);
        slider1.value = value;
        startTime = value;
    } else {
        inputStart.value = fancyTimeFormat(Number(slider2.value) - 1);
        slider1.value = Number(slider2.value) - 1;
    }
}
function checkMaxSliderValue(event) {
    let value = Number(event.target.value);
    if (value > Number(slider1.value) + 1) {
        inputStop.value = fancyTimeFormat(value);
        slider2.value = value;
        endTime = value;
    } else {
        inputStop.value = fancyTimeFormat(Number(slider1.value) + 1);
        slider2.value = Number(slider1.value) + 1;
    }
}
function checkStartValue(event) {
    var input = event.target;
    let value = timeToSeconds(event.target.value);
    if (!input.checkValidity()) {
        alert("Mal formato de tiempo");
        inputStart.value = fancyTimeFormat(Number(slider1.value));
        return;
    } 
    if (value < 0 || value >= Number(slider2.value)) {
        inputStart.value = Number(slider1.value);
    } else {
        slider1.value = value;
        startTime = value;
    }
}
function checkStopValue(event) {
    var input = event.target;
    let value = timeToSeconds(event.target.value);
    if (!input.checkValidity()) {
        alert("Mal formato de tiempo");
        inputStop.value = fancyTimeFormat(Number(slider2.value));
        return;
    } 
    if (value > Number(slider2.max) || value <= Number(slider1.value)) {
        inputStop.value = Number(slider2.value);
    } else {
        slider2.value = value;
        stopTime = value;
    }
}


  function incrementTimeValue(increment) {
    var timeInput = document.getElementById("myTimeInput");
    var currentTime = timeInput.value;
    var currentTimeArray = currentTime.split(":");
    var hours = parseInt(currentTimeArray[0]);
    var minutes = parseInt(currentTimeArray[1]);
    var seconds = parseInt(currentTimeArray[2]);
    
    // Perform increment/decrement logic for hours, minutes, and seconds here
    hours += increment;
    
    // Ensure hours, minutes, and seconds are within valid time range
    hours = Math.max(0, Math.min(23, hours));
    minutes = Math.max(0, Math.min(59, minutes));
    seconds = Math.max(0, Math.min(59, seconds));
    
    // Update time input value with new time
    timeInput.value = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
  }

/*
  document.getElementById('start').addEventListener('input', function(event) {
    var input = event.target;
    if (!input.checkValidity()) {
        alert("Mal formato de tiempo");
    } else {
        alert("MBuen formato de tiempo");
    }
  });
*/

