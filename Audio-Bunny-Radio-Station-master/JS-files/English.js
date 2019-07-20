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
                "name": "A Different Way",
                "duration": "3:17",
                "file": "A Different Way"
            }, {
                "track": 2,
                "name": "Call Out My Name",
                "duration": "3:48",
                "file": "Call Out My Name"
            },{
                "track": 3,
                "name": "I feel it coming",
                "duration":"4:24",
                "file": "I feel it coming"
            },{
                "track": 4,
                "name": "I Will Be There For You Friends",
                "duration":"3:44",
                "file": "I Will Be There For You Friends"
            },{
                "track": 5,
                "name": "Let Me Love You",
                "duration":"3:25",
                "file": "Let Me Love You"
            },{
                "track": 6,
                "name": "Magenta Riddim",
                "duration":"3:14",
                "file": "Magenta Riddim"
            },
            {
                "track": 7,
                "name": "Middle",
                "duration":"3:40",
                "file": "Middle"
            },
            {
                "track": 8,
                "name": "Reminder",
                "duration": "3:50",
                "file": "Reminder"
            },
            {
                "track": 9,
                "name": "See You Again",
                "duration": "3:57",
                "file": "See You Again"
            },
            {
                "track": 10,
                "name": "Starboy",
                "duration": "3:51",
                "file": "Starboy"
            },
            {
                "track": 11,
                "name": "Taki Taki",
                "duration": "3:14",
                "file": "Taki Taki"
            },
            {
                "track": 12,
                "name": "The Hills",
                "duration": "3:54",
                "file": "The Hills"
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