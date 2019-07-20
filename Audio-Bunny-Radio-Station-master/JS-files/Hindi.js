// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = '/D:/NIIT University/3 Year/Semester 6/Multi-Device Programming/Project/Local-Radio-Station-MDP-master/Song-files/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Soch Na Sake",
                "duration": "4:20",
                "file": "Soch Na Sake"
            }, {
                "track": 2,
                "name": "Dekha Hazaro Dafaa",
                "duration": "3:33",
                "file": "Dekha Hazaro Dafaa"
            },{
                "track": 3,
                "name": "Samjhawan ",
                "duration":"4:24",
                "file": "Samjhawan"
            },{
                "track": 4,
                "name": "Channa Mereya",
                "duration":"5:45",
                "file": "Channa Mereya"
            },{
                "track": 5,
                "name": "Phir Bhi Tumko Chaahunga",
                "duration":"6:00",
                "file": "Phir Bhi Tumko Chaahunga"
            },{
                "track": 6,
                "name": "Tera Yaar Hoon Main",
                "duration":"4:27",
                "file": "Tera Yaar Hoon Main"
            },
            {
                "track": 7,
                "name": "Mitti Di Khushboo",
                "duration": "4:45",
                "file": "Mitti Di Khushboo"
            }, {
                "track": 8,
                "name": "Yahin Hoon Main",
                "duration": "5:01",
                "file": "Yahin Hoon Main"
            },{
                "track": 9,
                "name": "Pani Da Rang ",
                "duration":"2:20",
                "file": "Pani Da Rang"
            },{
                "track": 10,
                "name": "Ik Vaari",
                "duration":"4:59",
                "file": "Ik Vaari"
            }
            ],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});