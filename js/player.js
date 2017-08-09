(function($, window, document, undefined) {
    "use strict";
    var pluginName = "musicPlayer",
        defaults = {
            playlistItemSelector: 'li',
            autoPlay: !1,
            volume: 80,
            loop: !1,
            timeSeparator: ' / ',
            playerAbovePlaylist: !0,
            infoElements: ['title', 'artist'],
            elements: ['artwork', 'information', 'controls', 'progress', 'time', 'volume'],
            timeElements: ['current', 'duration'],
            controlElements: ['backward', 'play', 'forward', 'stop'],
            onLoad: function() {},
            onPlay: function() {},
            onPause: function() {},
            onStop: function() {},
            onFwd: function() {},
            onRew: function() {},
            volumeChanged: function() {},
            seeked: function() {},
            trackClicked: function() {},
            onMute: function() {}
        };
    var isTouch = 'ontouchstart' in window,
        eStart = isTouch ? 'touchstart' : 'mousedown',
        eMove = isTouch ? 'touchmove' : 'mousemove',
        eEnd = isTouch ? 'touchend' : 'mouseup',
        eCancel = isTouch ? 'touchcancel' : 'mouseup';

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init()
    }
    $.extend(Plugin.prototype, {
        init: function() {
            var controlInnerElem = "",
                timeInnerElem = "",
                infoElem = "",
                infoInnerElem = "",
                fullPlayerElem = "",
                volumeElem = "",
                progressElem = "",
                artworkElem = "",
                timeElem = "",
                controlElem = "",
                titleElem = "",
                artistElem = "",
                backwardElem = "",
                forwardElem = "",
                stopElem = "",
                playElem = "",
                curTimeElem = "",
                durTimeElem = "",
                timeSeparator = "",
                playerElem = "",
                playerThis = this;
            for (var elemItem in this.settings.elements) {
                if (this.settings.elements[elemItem] == "volume") {
                    volumeElem = "<div class='volume'><div class='volume-btn' title='Volume'></div><div class=' volume-adjust'><div><div></div></div></div></div>";
                    fullPlayerElem += volumeElem
                } else if (this.settings.elements[elemItem] == "progress") {
                    progressElem = "<div class='progressbar'><div class='bar-loaded' ></div><div class='bar-played'></div></div>";
                    fullPlayerElem += progressElem
                } else if (this.settings.elements[elemItem] == "artwork") {
                    artworkElem = "<div class='cover'><span class='play-icon'></span></div>";
                    fullPlayerElem += artworkElem
                } else if (this.settings.elements[elemItem] == "information") {
                    $.inArray("title", this.settings.infoElements) != '-1' ? titleElem = "<div class='title'></div>" : titleElem = " ";
                    $.inArray("artist", this.settings.infoElements) != '-1' ? artistElem = "<div class='artist'></div>" : artistElem = " ";
                    for (var item in this.settings.infoElements) {
                        if (this.settings.infoElements[item] == "title") {
                            infoInnerElem += titleElem
                        } else if (this.settings.infoElements[item] == "artist") {
                            infoInnerElem += artistElem
                        }
                    }
                    infoElem = "<div class='info' >" + infoInnerElem + "</div>";
                    fullPlayerElem += infoElem
                } else if (this.settings.elements[elemItem] == "time") {
                    $.inArray("current", this.settings.timeElements) != '-1' ? curTimeElem = "<div class='time-current'></div>" : curTimeElem = " ";
                    $.inArray("duration", this.settings.timeElements) != '-1' ? durTimeElem = "<div class='time-duration'></div>" : durTimeElem = " ";
                    timeSeparator = "<div class='time-separator'>" + this.settings.timeSeparator.replace(/\s/g, '&nbsp;') + "</div>";
                    for (var item in this.settings.timeElements) {
                        if (item == 1) {
                            timeInnerElem += timeSeparator
                        }
                        if (this.settings.timeElements[item] == "current") {
                            timeInnerElem += curTimeElem
                        } else if (this.settings.timeElements[item] == "duration") {
                            timeInnerElem += durTimeElem
                        }
                    }
                    timeElem = "<div class='timeHolder'>" + timeInnerElem + "</div>";
                    fullPlayerElem += timeElem
                } else if (this.settings.elements[elemItem] == "controls") {
                    $.inArray("backward", this.settings.controlElements) != '-1' ? backwardElem = "<div class='rew'></div>" : backwardElem = " ";
                    $.inArray("forward", this.settings.controlElements) != '-1' ? forwardElem = "<div class='fwd'></div>" : forwardElem = " ";
                    $.inArray("stop", this.settings.controlElements) != '-1' ? stopElem = "<div class='stop'></div>" : stopElem = " ";
                    $.inArray("play", this.settings.controlElements) != '-1' ? playElem = "<div class='play'></div><div class='pause'></div>" : playElem = " ";
                    for (var item in this.settings.controlElements) {
                        if (this.settings.controlElements[item] == "backward") {
                            controlInnerElem += backwardElem
                        } else if (this.settings.controlElements[item] == "play") {
                            controlInnerElem += playElem
                        } else if (this.settings.controlElements[item] == "forward") {
                            controlInnerElem += forwardElem
                        } else if (this.settings.controlElements[item] == "stop") {
                            controlInnerElem += stopElem
                        }
                    }
                    controlElem = "<div class='controls'>" + controlInnerElem + "</div>";
                    fullPlayerElem += controlElem
                }
            }
            playerElem = $("<div class='player' >" + fullPlayerElem + "</div>");
            if (this.settings.playerAbovePlaylist) {
                $(playerElem).insertBefore($(this.element).find(".playlist"))
            } else {
                $(playerElem).insertAfter($(this.element).find(".playlist"))
            }
            this.playlistItemSelector = this.settings.playlistItemSelector;
            this.playlistHolder = $(this.element).children(".playlist"), this.playerHolder = $(this.element).children(".player");
            this.song = "";
            this.theBar = this.playerHolder.find('.progressbar');
            this.barPlayed = this.playerHolder.find('.bar-played');
            this.barLoaded = this.playerHolder.find('.bar-loaded');
            this.timeCurrent = this.playerHolder.find('.time-current');
            this.timeDuration = this.playerHolder.find('.time-duration');
            this.timeSeparator = this.settings.timeSeparator;
            this.volumeInfo = this.playerHolder.find('.volume');
            this.volumeButton = this.playerHolder.find('.volume-btn');
            this.volumeAdjuster = this.playerHolder.find('.volume-adjust' + ' > div');
            this.volumeValue = this.settings.volume / 100;
            this.volumeDefault = 0;
            this.trackInfo = this.playerHolder.find('.info');
            this.coverInfo = this.playerHolder.find('.cover');
            this.controlsInfo = this.playerHolder.find('.controls');
            this.controlPlay = $(this.controlsInfo).find('.play');
            this.controlPause = $(this.controlsInfo).find('.pause');
            this.controlStop = $(this.controlsInfo).find('.stop');
            this.controlFwd = $(this.controlsInfo).find('.fwd');
            this.controlRew = $(this.controlsInfo).find('.rew');
            this.cssClass = {
                playing: 'playing',
                mute: 'mute'
            };
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) $(this.volumeInfo).hide();
            this.initAudio($(this.playlistHolder.children(this.playlistItemSelector + ":first-child")));
            this.song.volume = this.volumeValue;
            this.timeDuration.html('&hellip;');
            this.timeCurrent.text(this.secondsToTime(0));
            $(this.controlPlay).click(function(e) {
                e.preventDefault();
                playerThis.playAudio()
            });
            $(this.controlPause).click(function(e) {
                e.preventDefault();
                playerThis.stopAudio();
                playerThis.settings.onPause()
            });
            $(this.controlFwd).click(function(e) {
                e.preventDefault();
                playerThis.stopAudio();
                var next = $(playerThis.playlistHolder).find(playerThis.playlistItemSelector + '.active').next();
                if (next.length == 0) {
                    next = $(playerThis.playlistHolder).find(playerThis.playlistItemSelector + ':first-child')
                }
                playerThis.loadNewSong(next);
                playerThis.playAudio();
                playerThis.settings.onFwd()
            });
            $(this.controlRew).click(function(e) {
                e.preventDefault();
                playerThis.stopAudio();
                var prev = $(playerThis.playlistHolder).find(playerThis.playlistItemSelector + '.active').prev();
                if (prev.length == 0) {
                    prev = $(playerThis.playlistHolder).find(playerThis.playlistItemSelector + ':last-child')
                }
                playerThis.loadNewSong(prev);
                playerThis.playAudio();
                playerThis.settings.onRew()
            });
            $(this.controlStop).click(function(e) {
                e.preventDefault();
                playerThis.stopAudio();
                playerThis.song.currentTime = 0;
                playerThis.settings.onStop()
            });
            $(this.playlistHolder).find(this.playlistItemSelector).click(function(e) {
                e.preventDefault();
                playerThis.stopAudio();
                playerThis.loadNewSong($(this));
                playerThis.playAudio();
                playerThis.settings.trackClicked()
            })
        },
        secondsToTime: function(secs) {
            var hours = Math.floor(secs / 3600),
                minutes = Math.floor(secs % 3600 / 60),
                seconds = Math.ceil(secs % 3600 % 60);
            return (hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : hours + ':') + (minutes.toString().length < 2 ? '0' + minutes : minutes) + ':' + (seconds.toString().length < 2 ? '0' + seconds : seconds)
        },
        adjustVolume: function(e) {
            var theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
            this.song.volume = Math.abs((theRealEvent.pageX - (this.volumeAdjuster.offset().left)) / this.volumeAdjuster.width())
        },
        adjustCurrentTime: function(e) {
            var theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
            this.song.currentTime = Math.round((this.song.duration * (theRealEvent.pageX - this.theBar.offset().left)) / this.theBar.width())
        },
        initAudio: function(elem) {
            var url = elem.children("a:first-child").attr("href"),
                title = elem.text(),
                cover = elem.attr('data-cover'),
                artist = elem.attr('data-artist'),
                playerInstance = this;
            $(this.trackInfo).children('.title').text(title);
            $(this.trackInfo).children('.artist').text(artist);
            $(this.coverInfo).css('background-image', 'url(' + cover + ')');
            this.song = new Audio(url);
            this.song.load();
            this.song.addEventListener('loadeddata', function() {
                $(playerInstance.timeDuration).html(playerInstance.secondsToTime(this.duration));
                $(playerInstance.volumeAdjuster).find('div').width(this.volume * 100 + '%');
                playerInstance.volumeDefault = this.volume
            }, !1);
            this.song.addEventListener('progress', function() {
                $(playerInstance.barLoaded).width((this.buffered.end(0) / this.duration) * 100 + '%')
            });
            this.song.addEventListener('timeupdate', function() {
                $(playerInstance.timeCurrent).text(playerInstance.secondsToTime(this.currentTime));
                $(playerInstance.barPlayed).width((this.currentTime / this.duration) * 100 + '%')
            });
            this.song.addEventListener('volumechange', function() {
                if (Number(Math.round(this.volume * 100 + 'e' + 1) + 'e-' + 1) <= 0.4) {
                    this.volume = 0
                }
                $(playerInstance.volumeAdjuster).find('div').width(this.volume * 100 + '%');
                if (this.volume > 0 && playerInstance.playerHolder.hasClass(playerInstance.cssClass.mute)) playerInstance.playerHolder.removeClass(playerInstance.cssClass.mute);
                if (this.volume <= 0 && !playerInstance.playerHolder.hasClass(playerInstance.cssClass.mute)) playerInstance.playerHolder.addClass(playerInstance.cssClass.mute);
                playerInstance.volumeValue = this.volume
            });
            this.song.addEventListener('ended', function() {
                if (playerInstance.settings.autoPlay) {
                    playerInstance.autoPlayNext()
                } else {
                    playerInstance.playerHolder.removeClass(playerInstance.cssClass.playing);
                    $(playerInstance.controlPlay).removeClass('hidden');
                    $(playerInstance.controlPause).removeClass('visible')
                }
            });
            $(this.volumeButton).on('click', function() {
                if ($(playerInstance.playerHolder).hasClass(playerInstance.cssClass.mute)) {
                    $(playerInstance.playerHolder).removeClass(playerInstance.cssClass.mute);
                    playerInstance.song.volume = playerInstance.volumeDefault
                } else {
                    $(playerInstance.playerHolder).addClass(playerInstance.cssClass.mute);
                    playerInstance.volumeDefault = playerInstance.song.volume;
                    playerInstance.song.volume = 0;
                    playerInstance.settings.onMute()
                }
                return !1
            });
            $(this.volumeAdjuster).on(eStart, function(e) {
                playerInstance.adjustVolume(e);
                playerInstance.volumeAdjuster.on(eMove, function(e) {
                    playerInstance.adjustVolume(e)
                });
                playerInstance.settings.volumeChanged()
            }).on(eCancel, function() {
                playerInstance.volumeAdjuster.unbind(eMove)
            });
            $(this.theBar).on(eStart, function(e) {
                playerInstance.adjustCurrentTime(e);
                playerInstance.theBar.on(eMove, function(e) {
                    playerInstance.adjustCurrentTime(e)
                })
            }).on(eCancel, function() {
                playerInstance.theBar.unbind(eMove);
                playerInstance.settings.seeked()
            });
            $(this.playlistHolder).children(playerInstance.playlistItemSelector).removeClass('active');
            elem.addClass('active');
            this.settings.onLoad();
            if (this.settings.autoPlay) this.playAudio()
        },
        playAudio: function() {
            this.song.play();
            this.playerHolder.addClass(this.cssClass.playing);
            if ($.inArray("controls", this.settings.elements) != '-1' && $.inArray("play", this.settings.controlElements) != '-1') {
                $(this.controlPlay).addClass('hidden');
                $(this.controlPause).addClass('visible')
            }
            this.settings.onPlay()
        },
        stopAudio: function() {
            this.song.pause();
            this.playerHolder.removeClass(this.cssClass.playing);
            if ($.inArray("controls", this.settings.elements) != '-1' && $.inArray("play", this.settings.controlElements) != '-1') {
                $(this.controlPlay).removeClass('hidden');
                $(this.controlPause).removeClass('visible')
            }
        },
        autoPlayNext: function() {
            this.stopAudio();
            var next = $(this.playlistHolder).children(this.playlistItemSelector + '.active').next();
            if (next.length == 0 && this.settings.loop) {
                next = $(this.playlistHolder).children(this.playlistItemSelector + ':first-child')
                this.loadNewSong(next);
                this.playAudio()
            } else if (!next.length == 0) {
                this.loadNewSong(next);
                this.playAudio()
            }
        },
        loadNewSong: function(elem) {
            this.volumeValue = this.song.volume;
            this.initAudio(elem);
            this.song.volume = this.volumeValue;
            this.volumeAdjuster.find('div').width(this.volumeValue * 100 + '%');
            this.barPlayed.width(0);
            this.barLoaded.width(0)
        }
    });
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options))
            }
        })
    }
})(jQuery, window, document)