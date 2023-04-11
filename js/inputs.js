
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








