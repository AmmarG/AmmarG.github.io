// Start Social top position
// $(document).ready(function() {
//     var socialTop = $('.area_33').offset().top;
//     $('.social_icons ul').css('top', socialTop + 'px');
// });
// End top position

function ArbNetRotator(tab, cnt) {
    $(tab).mouseenter(function(e, trg) {
        if (trg)
            e.stopPropagation();
        $(tab).siblings().removeClass("active");
        $(this).addClass("active");
        $(cnt).hide();
        $(cnt).eq($(this).index()).show();
        if (trg)
            return false;
    });

    $(tab).eq(0).parent().mouseenter(function(e) {
        e.stopPropagation();
        clearInterval(window.arbnettmrrotator);
        return false;
    });

    $(tab).eq(0).parent().mouseleave(
        function(e) {
            e.stopPropagation();
            var rot = $(this);
            window.arbnettmrrotator = setInterval(function() {
                rot.find("li")
                    .eq(
                        rot.find("li.active").index() + 1 == rot
                        .find("li").length ? 0 : rot.find(
                            "li.active").index() + 1).trigger(
                        'mouseenter', true);
            }, $(".news_headlines").attr("auto_news_headlines"));
            return false;
        });

    $(tab).eq(0).parent().mouseleave();
}

function ArbNetTicker(ticker, speed) {
    $(
        ticker + " .controls .prev," + ticker + " .controls .next," + ticker + " .controls .pause").removeAttr("href");
    $(ticker + " .controls .pause").click(function() {
        if ($(this).hasClass("pause")) {
            $(this).parent().parent().find('.ticker_feeds').stop();
            $(this).attr("class", "play");
        } else {
            $(this).siblings(arbnettkrdir).click();
            $(this).attr("class", "pause")
        }
    });
    $(ticker + " .controls .prev," + ticker + " .controls .next")
        .click(
            function() {
                window.arbnettkrdir = $(this).hasClass("prev") ? ".prev" : ".next";
                $(this).siblings(".play").attr("class", "pause");
                var tkr = $(ticker + ' .ticker_feeds');
                var dir = $(".page_wrapper").css("direction") == "rtl" ? tkr
                    .css("right") : tkr.css("left");
                var anm = {};
                var prop = $(".page_wrapper").css("direction") == "rtl" ? "right" : "left";
                anm[prop] = (prop == "right" && $(this)
                    .hasClass("prev")) || (prop == "left" && $(this).hasClass("next")) ? -1 * tkr.width() : $(ticker + ' .wrapper').width();
                dir = anm[prop] > 0 ? anm[prop] - parseInt(dir.replace("px", "")) : tkr.width() + parseInt(dir.replace("px", ""));
                tkr
                    .stop()
                    .animate(
                        anm,
                        dir * speed,
                        'linear',
                        function() {
                            var dir = $(".page_wrapper").css(
                                "direction") == "rtl" ? "right" : "left";
                            if (parseInt($(this).css("right")
                                .replace("px", "")) == -1 * $(this).width()) {
                                $(this).css(
                                    "right",
                                    $(this).parent()
                                    .width() + "px");
                                $(this).parent().parent().find(
                                    ".controls .prev")
                                    .click();
                            } else {
                                $(this).css(
                                    "right", ($(this).width() * -1) + "px");
                                $(this).parent().parent().find(
                                    ".controls .next")
                                    .click();
                            }
                        });
            });

    $(ticker + " .controls .prev").click();
}

$(document)
    .ready(
        function() {
            // start tabs
            $('.tabs li a,.filter li a').removeAttr("href");
            $('.tabs li,.filter li')
                .click(
                    function() {
                        $(this).siblings()
                            .removeClass("active");
                        $(this).addClass("active");
                        if ($(this).parent().hasClass('filter')) {
                            $(this).parent().parent().nextAll(
                                '.content').hide();
                            $(this).parent().parent().nextAll(
                                '.content').eq(
                                $(this).index()).show();
                        } else if ($(this).parent().parent()
                            .next().hasClass('content')) {
                            $(this)
                                .parent()
                                .parent()
                                .next()
                                .find(
                                    '.wrapper,a.more,ul.pager')
                                .hide();
                            $(this).parent().parent().next()
                                .find('.wrapper').eq(
                                    $(this).index())
                                .show();
                            $(this).parent().parent().next()
                                .find('a.more').eq(
                                    $(this).index())
                                .show();
                            $(this).parent().parent().next()
                                .find('ul.pager').eq(
                                    $(this).index())
                                .show();
                        } else if ($(this).parent().next()
                            .hasClass('wrapper')) {
                            $(this).parent().nextAll().hide();
                            $(this).parent().nextAll().eq(
                                $(this).index()).show();
                        } else {
                            var selectedtab = $(this).index();
                            var allcontents = $(this).parent()
                                .parent().parent().parent()
                                .find('.content');

                            for (i = 0; i < allcontents.length; i++) {
                                var tempcontent = allcontents
                                    .eq(i);
                                var temptabs = tempcontent
                                    .find(".tabs li");

                                temptabs.parent().nextAll()
                                    .hide();
                                temptabs.removeClass("active");
                                temptabs.parent().nextAll().eq(
                                    selectedtab).show();
                                temptabs.eq(selectedtab)
                                    .addClass("active");
                            }
                        }
                        if ($(this).parent().parent().next()
                            .hasClass('content') && $(this)
                            .parent()
                            .parent()
                            .next()
                            .find(
                                '.slider_mod01,.slider_mod02').length > 0) {
                            $(this)
                                .parent()
                                .parent()
                                .next()
                                .find(
                                    '.pager:not([style*="display: none"],[style*="display:none"])>li')
                                .eq(0).click();
                        }
                    });
            // end tabs
            // start slider
            window.arbnetinanim = false;
            $('.slider_mod01,.slider_mod02')
                .each(
                    function() {
                        $(this)
                            .find('.wrapper')
                            .each(
                                function(wrapperIndex) {
                                    var pager = $(this)
                                        .parent()
                                        .find(
                                            '.pager')
                                        .eq(
                                            wrapperIndex);
                                    if ($(this)
                                        .find(
                                            ".slider ul").length > 1)
                                        $(this)
                                            .find(
                                                ".slider")
                                            .css(
                                                "width", ($(
                                                        this)
                                                    .find(
                                                        ".slider ul").length * $(
                                                        this)
                                                    .find(
                                                        ".slider ul:eq(0)")
                                                    .width()) + "px");
                                    if (pager.length > 0) {
                                        var clone = pager
                                            .find(
                                                'li')
                                            .eq(0)
                                            .removeAttr(
                                                "class")
                                            .clone();
                                        pager
                                            .children()
                                            .remove();
                                        for (var i = 0; i < $(
                                                this)
                                            .find(
                                                ".slider ul").length; i++)
                                            clone
                                                .clone()
                                                .appendTo(
                                                    pager);
                                        pager
                                            .find(
                                                'li')
                                            .eq(0)
                                            .addClass(
                                                "active");
                                        pager
                                            .find(
                                                'li>a')
                                            .removeAttr(
                                                "href");
                                        pager
                                            .find(
                                                'li')
                                            .click(
                                                function() {
                                                    slider = $(
                                                        this)
                                                        .parent()
                                                        .parent();
                                                    var wrapper = $(
                                                        this)
                                                        .parent()
                                                        .parent()
                                                        .parent()
                                                        .find(
                                                            '.wrapper:not([style*="display: none"],[style*="display:none"])');
                                                    var ver = wrapper
                                                        .find(".slider ul").length == 1;
                                                    var len = ver ? wrapper
                                                        .height() : wrapper
                                                        .width();
                                                    var dir = ver ? "top" : ($(
                                                            '.page_wrapper')
                                                        .css(
                                                            'direction') == "rtl" ? "right" : "left");
                                                    var anm = {};
                                                    var prop = dir;
                                                    anm[prop] = ((len * -1) * $(
                                                            this)
                                                        .index()) + "px";
                                                    slider
                                                        .find(
                                                            ".prev")
                                                        .toggleClass(
                                                            "off",
                                                            $(
                                                                this)
                                                            .index() == 0);
                                                    slider
                                                        .find(
                                                            ".next")
                                                        .toggleClass(
                                                            "off",
                                                            $(
                                                                this)
                                                            .index() == $(
                                                                this)
                                                            .parent()
                                                            .find(
                                                                "li")
                                                            .last()
                                                            .index());
                                                    $(
                                                        this)
                                                        .siblings()
                                                        .removeClass(
                                                            "active");
                                                    $(
                                                        this)
                                                        .addClass(
                                                            "active");
                                                    wrapper
                                                        .find(
                                                            ".slider")
                                                        .animate(
                                                            anm,
                                                            'linear');
                                                });
                                    }
                                    if (($(this)
                                        .parent()
                                        .hasClass(
                                            'slider_mod01') && $(
                                            this)
                                        .find(
                                            ".slider ul").length == 1) || ($(this)
                                        .parent()
                                        .hasClass(
                                            'slider_mod02') && $(
                                            this)
                                        .find(
                                            ".slider")
                                        .height() <= $(
                                            this)
                                        .height()))
                                        $(this)
                                            .parent()
                                            .find(
                                                ".next")
                                            .addClass(
                                                'off');
                                });
                    });
            $(
                ".slider_mod01 .prev,.slider_mod01 .next,.slider_mod02 .prev,.slider_mod02 .next")
                .removeAttr("href")
                .click(
                    function() {
                        if (window.arbnetinanim)
                            return;
                        slider = $(this).parent();
                        var wrapper = slider
                            .find('.wrapper:not([style*="display: none"],[style*="display:none"])');

                        if ((wrapper.parent().hasClass(
                                'slider_mod02') && wrapper
                            .find('.slider').height() <= wrapper
                            .height()) || (wrapper.parent().hasClass(
                                'slider_mod01') && wrapper
                            .find('.slider ul').length == 1))
                            return;

                        var ver = wrapper.find(".slider ul").length == 1;
                        var len = ver ? wrapper.height() : wrapper.width();
                        var dist = Math.floor((ver ? wrapper
                            .find(".slider").height() : wrapper.find(".slider")
                            .width()) / len);
                        var sign = $(this).hasClass("prev") ? 1 : -1;
                        var dir = ver ? "top" : ($(
                            '.page_wrapper').css(
                            'direction') == "rtl" ? "right" : "left");
                        var pos = parseInt(wrapper.find(
                            ".slider").css(dir).replace(
                            "px", ""));
                        pos = isNaN(pos) ? 0 : pos;
                        var anm = {};
                        var prop = dir;
                        anm[prop] = ((len * sign) + pos) + "px";

                        if (pos == 0 && sign == 1)
                            return;

                        slider
                            .find(".prev")
                            .toggleClass(
                                "off", (len * sign) + pos == 0 || (sign == 1 && pos == 0));
                        slider
                            .find(".next")
                            .toggleClass(
                                "off",
                                Math.abs((len * sign) + pos) == len * dist || (sign == -1 && Math
                                    .abs(pos) == len * dist));

                        if (!((sign == -1 && Math.abs(pos) == len * dist) || (sign == 1 && pos == 0))) {
                            window.arbnetinanim = true;
                            wrapper
                                .find(".slider")
                                .animate(
                                    anm,
                                    'linear',
                                    function() {
                                        window.arbnetinanim = false;
                                    });
                            var pager = slider
                                .find('.pager:not([style*="display: none"],[style*="display:none"])');

                            pager.find('li').removeClass(
                                "active");
                            pager.find('li').eq(
                                Math
                                .abs((len * sign) + pos) / len).addClass(
                                "active");
                        }
                    });
            // end slider
            // start hide/show media box
            $('.media_box .vid_ico').parents('a').removeAttr("href")
                .click(
                    function() {
                        $(this).parents('.media_box').fadeOut(
                            300,
                            function() {
                                $(this).remove();
                                $('#mbvb,#mbvbtxt').fadeIn(
                                    300);
                            });
                    });
            // end hide/show media box
            // start news stream
            NewsStream();
            $('.livestream_tem .latest_news .controls a.prev')
                .removeAttr("href")
                .click(
                    function() {
                        clearInterval(window.tmrNewsStrm);
                        window.curnewsstrmul = window.curnewsstrmul
                            .index() == 0 ? $(
                                '.livestream_tem .latest_news ul')
                            .eq(
                                $('.livestream_tem .latest_news ul').length - 1) : $(
                                '.livestream_tem .latest_news ul')
                            .eq(
                                window.curnewsstrmul
                                .index() - 1);
                        $('.livestream_tem .latest_news ul')
                            .hide();
                        window.curnewsstrmul.fadeIn(500);
                        NewsStream();
                    });
            $('.livestream_tem .latest_news .controls a.next')
                .removeAttr("href")
                .click(
                    function() {
                        clearInterval(window.tmrNewsStrm);
                        window.curnewsstrmul = window.curnewsstrmul
                            .index() == $('.livestream_tem .latest_news ul').length - 1 ? $(
                                '.livestream_tem .latest_news ul')
                            .eq(0) : $(
                                '.livestream_tem .latest_news ul')
                            .eq(
                                window.curnewsstrmul
                                .index() + 1);
                        $('.livestream_tem .latest_news ul')
                            .hide();
                        window.curnewsstrmul.fadeIn(500);
                        NewsStream();
                    });
            $('.livestream_tem .latest_news .controls a.pause')
                .removeAttr("href").toggle(function() {
                    clearInterval(window.tmrNewsStrm);
                }, function() {
                    NewsStream();
                });

            function NewsStream() {
                window.tmrNewsStrm = setInterval(
                    function() {
                        window.curnewsstrmul = $(
                            '.livestream_tem .latest_news ul:not([style*="display: none"],[style*="display:none"])')
                            .next('ul');
                        window.curnewsstrmul = window.curnewsstrmul.length == 0 ? $('.livestream_tem .latest_news ul:eq(0)') : window.curnewsstrmul;
                        $('.livestream_tem .latest_news ul').hide();
                        window.curnewsstrmul.fadeIn(500);
                    }, 5000);
            }
            // end news stream
            // start photo slider
            $('.photo_slider a.next,.photo_slider a.prev')
                .removeAttr("href")
                .click(
                    function() {
                        var curphoto = $('.photo_slider .wrapper:not([style*="display: none"],[style*="display:none"])');
                        var curphotoindx = $(this).hasClass(
                            'next') ? (curphoto.index() == $('.photo_slider .wrapper').length ? 0 : curphoto.index()) : (curphoto.index() == 1 ? $('.photo_slider .wrapper').length - 1 : curphoto.index() - 2);
                        $('.photo_slider .wrapper').hide().eq(
                            curphotoindx).fadeIn(500);
                        $('.photo_slider .social').hide().eq(
                            curphotoindx).fadeIn(500);
                    });

            // end photo slider
            // start gallery
            $(".gallery_slider .scroller ul li a").removeAttr("href")
                .click(
                    function() {
                        $(this).parents('.gallery_slider')
                            .find('.photo_preview').hide()
                            .eq($(this).parent().index())
                            .fadeIn(300);
                    });

            $(".gallery_slider .prev,.gallery_slider .next")
                .removeAttr("href")
                .click(
                    function() {
                        if (window.arbnetinanim)
                            return;
                        var len = $(this).parent().width();
                        var dist = Math.floor(($(this)
                            .siblings('ul').width()) / len);
                        var sign = $(this).hasClass("prev") ? 1 : -1;
                        var dir = $('.page_wrapper').css(
                            'direction') == "rtl" ? "right" : "left";
                        var pos = parseInt($(this).siblings(
                                'ul').css(dir)
                            .replace("px", ""));
                        pos = isNaN(pos) ? 0 : pos;
                        var anm = {};
                        var prop = dir;
                        anm[prop] = (($(this).parent().find(
                            'li:eq(0)').width() * sign) + pos) + "px";
                        var currentIndex = $(".gallery_slider .photo_preview:visible").index();
                        var totalImages = $(".gallery_slider .photo_preview").length;
                        currentIndex -= sign;
                        if (currentIndex >= 0 && currentIndex != totalImages) {
                            $(".gallery_slider .scroller ul li a").eq(currentIndex).trigger("click");
                        }
                        if (pos == 0 && sign == 1)
                            return;

                        $(this)
                            .parent()
                            .find(".prev")
                            .toggleClass(
                                "off", (len * sign) + pos == 0 || (sign == 1 && pos == 0));
                        $(this)
                            .parent()
                            .find(".next")
                            .toggleClass(
                                "off",
                                Math.abs((len * sign) + pos) == len * dist || (sign == -1 && Math
                                    .abs(pos) == len * dist));

                        if (!((sign == -1 && (Math.abs(pos) == len * dist || Math.abs(pos) + 2 == len * dist)) || (sign == 1 && pos == 0))) {
                            window.arbnetinanim = true;
                            $(this)
                                .siblings('ul')
                                .animate(
                                    anm,
                                    'linear',
                                    function() {
                                        window.arbnetinanim = false;
                                    });
                        }
                    });
            // end gallery
            ArbNetRotator('.news_headlines .news_list>li',
                '.news_headlines .wrapper');
            ArbNetTicker('.ticker', 15);
        });

// LIGHTBOX
(function() {
    var $, Lightbox, LightboxOptions;

    $ = jQuery;
    LightboxOptions = (function() {

        function LightboxOptions() {
            this.fileLoadingImage = contextPath + '/dms/docroot/aa-templating/gfx/loading.gif';
            this.fileCloseImage = contextPath + '/dms/docroot/aa-templating/gfx/close.png';
            this.resizeDuration = 700;
            this.fadeDuration = 500;
            this.labelImage = "Image";
            this.labelOf = "of";
        }

        return LightboxOptions;

    })();

    Lightbox = (function() {

        function Lightbox(options) {
            this.options = options;
            this.album = [];
            this.currentImageIndex = void 0;
            this.init();
        }

        Lightbox.prototype.init = function() {
            this.enable();
            return this.build();
        };

        Lightbox.prototype.enable = function() {
            var _this = this;
            return $('body').on('click',
                'a[rel^=lightbox], area[rel^=lightbox]', function(e) {
                    _this.start($(e.currentTarget));
                    return false;
                });
        };

        Lightbox.prototype.build = function() {
            var $lightbox, _this = this;
            $("<div>", {
                id: 'lightboxOverlay'
            }).after($('<div/>', {
                id: 'lightbox'
            }).append($('<div/>', {
                "class": 'lb-outerContainer'
            }).append($('<div/>', {
                "class": 'lb-container'
            }).append($('<img/>', {
                "class": 'lb-image'
            }), $('<div/>', {
                "class": 'lb-nav'
            }).append($('<a/>', {
                "class": 'lb-prev'
            }), $('<a/>', {
                "class": 'lb-next'
            })), $('<div/>', {
                "class": 'lb-loader'
            }).append($('<a/>', {
                "class": 'lb-cancel'
            }).append($('<img/>', {
                src: this.options.fileLoadingImage
            }))))), $('<div/>', {
                "class": 'lb-dataContainer'
            }).append($('<div/>', {
                "class": 'lb-data'
            }).append($('<div/>', {
                "class": 'lb-details'
            }).append($('<span/>', {
                "class": 'lb-caption'
            }), $('<span/>', {
                "class": 'lb-number'
            })), $('<div/>', {
                "class": 'lb-closeContainer'
            }).append($('<a/>', {
                "class": 'lb-close'
            }).append($('<img/>', {
                src: this.options.fileCloseImage
            }))))))).appendTo($('body'));
            $('#lightboxOverlay').hide().on('click', function(e) {
                _this.end();
                return false;
            });
            $lightbox = $('#lightbox');
            $lightbox.hide().on('click', function(e) {
                if ($(e.target).attr('id') === 'lightbox')
                    _this.end();
                return false;
            });
            $lightbox.find('.lb-outerContainer').on('click', function(e) {
                if ($(e.target).attr('id') === 'lightbox')
                    _this.end();
                return false;
            });
            $lightbox.find('.lb-prev').on('click', function(e) {
                _this.changeImage(_this.currentImageIndex - 1);
                return false;
            });
            $lightbox.find('.lb-next').on('click', function(e) {
                _this.changeImage(_this.currentImageIndex + 1);
                return false;
            });
            $lightbox.find('.lb-loader, .lb-close').on('click', function(e) {
                _this.end();
                return false;
            });
        };

        Lightbox.prototype.start = function($link) {
            var $lightbox, $window, a, i, imageNumber, left, top, _len, _ref;
            $(window).on("resize", this.sizeOverlay);
            $('select, object, embed').css({
                visibility: "hidden"
            });
            $('#lightboxOverlay').width($(document).width()).height(
                $(document).height()).fadeIn(this.options.fadeDuration);
            this.album = [];
            imageNumber = 0;
            if ($link.attr('rel') === 'lightbox') {
                this.album.push({
                    link: $link.attr('href'),
                    title: $link.attr('title')
                });
            } else {
                _ref = $($link.prop("tagName") + '[rel="' + $link.attr('rel') + '"]');
                for (i = 0, _len = _ref.length; i < _len; i++) {
                    a = _ref[i];
                    this.album.push({
                        link: $(a).attr('href'),
                        title: $(a).attr('title')
                    });
                    if ($(a).attr('href') === $link.attr('href'))
                        imageNumber = i;
                }
            }
            $window = $(window);
            top = $window.scrollTop() + $window.height() / 10;
            left = $window.scrollLeft();
            $lightbox = $('#lightbox');
            $lightbox.css({
                top: top + 'px',
                left: left + 'px'
            }).fadeIn(this.options.fadeDuration);
            this.changeImage(imageNumber);
        };

        Lightbox.prototype.changeImage = function(imageNumber) {
            var $image, $lightbox, preloader, _this = this;
            this.disableKeyboardNav();
            $lightbox = $('#lightbox');
            $image = $lightbox.find('.lb-image');
            this.sizeOverlay();
            $('#lightboxOverlay').fadeIn(this.options.fadeDuration);
            $('.loader').fadeIn('slow');
            $lightbox
                .find(
                    '.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption')
                .hide();
            $lightbox.find('.lb-outerContainer').addClass('animating');
            preloader = new Image;
            preloader.onload = function() {
                $image.attr('src', _this.album[imageNumber].link);
                $image.width = preloader.width;
                $image.height = preloader.height;
                return _this.sizeContainer(preloader.width, preloader.height);
            };
            preloader.src = this.album[imageNumber].link;
            this.currentImageIndex = imageNumber;
        };

        Lightbox.prototype.sizeOverlay = function() {
            return $('#lightboxOverlay').width($(document).width()).height(
                $(document).height());
        };

        Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
            var $container, $lightbox, $outerContainer, containerBottomPadding, containerLeftPadding, containerRightPadding, containerTopPadding, newHeight, newWidth, oldHeight, oldWidth, _this = this;
            $lightbox = $('#lightbox');
            $outerContainer = $lightbox.find('.lb-outerContainer');
            oldWidth = $outerContainer.outerWidth();
            oldHeight = $outerContainer.outerHeight();
            $container = $lightbox.find('.lb-container');
            containerTopPadding = parseInt($container.css('padding-top'), 10);
            containerRightPadding = parseInt($container.css('padding-right'),
                10);
            containerBottomPadding = parseInt($container.css('padding-bottom'),
                10);
            containerLeftPadding = parseInt($container.css('padding-left'), 10);
            newWidth = imageWidth + containerLeftPadding + containerRightPadding;
            newHeight = imageHeight + containerTopPadding + containerBottomPadding;
            if (newWidth !== oldWidth && newHeight !== oldHeight) {
                $outerContainer.animate({
                    width: newWidth,
                    height: newHeight
                }, this.options.resizeDuration, 'swing');
            } else if (newWidth !== oldWidth) {
                $outerContainer.animate({
                    width: newWidth
                }, this.options.resizeDuration, 'swing');
            } else if (newHeight !== oldHeight) {
                $outerContainer.animate({
                    height: newHeight
                }, this.options.resizeDuration, 'swing');
            }
            setTimeout(function() {
                $lightbox.find('.lb-dataContainer').width(newWidth);
                $lightbox.find('.lb-prevLink').height(newHeight);
                $lightbox.find('.lb-nextLink').height(newHeight);
                _this.showImage();
            }, this.options.resizeDuration);
        };

        Lightbox.prototype.showImage = function() {
            var $lightbox;
            $lightbox = $('#lightbox');
            $lightbox.find('.lb-loader').hide();
            $lightbox.find('.lb-image').fadeIn('slow');
            this.updateNav();
            this.updateDetails();
            this.preloadNeighboringImages();
            this.enableKeyboardNav();
        };

        Lightbox.prototype.updateNav = function() {
            var $lightbox;
            $lightbox = $('#lightbox');
            $lightbox.find('.lb-nav').show();
            if (this.currentImageIndex > 0)
                $lightbox.find('.lb-prev').show();
            if (this.currentImageIndex < this.album.length - 1) {
                $lightbox.find('.lb-next').show();
            }
        };

        Lightbox.prototype.updateDetails = function() {
            var $lightbox, _this = this;
            $lightbox = $('#lightbox');
            if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
                $lightbox.find('.lb-caption').html(
                    this.album[this.currentImageIndex].title)
                    .fadeIn('fast');
            }
            if (this.album.length > 1) {
                $lightbox.find('.lb-number').html(
                    this.options.labelImage + ' ' + (this.currentImageIndex + 1) + ' ' + this.options.labelOf + '  ' + this.album.length).fadeIn('fast');
            } else {
                $lightbox.find('.lb-number').hide();
            }
            $lightbox.find('.lb-outerContainer').removeClass('animating');
            $lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration,
                function() {
                    return _this.sizeOverlay();
                });
        };

        Lightbox.prototype.preloadNeighboringImages = function() {
            var preloadNext, preloadPrev;
            if (this.album.length > this.currentImageIndex + 1) {
                preloadNext = new Image;
                preloadNext.src = this.album[this.currentImageIndex + 1].link;
            }
            if (this.currentImageIndex > 0) {
                preloadPrev = new Image;
                preloadPrev.src = this.album[this.currentImageIndex - 1].link;
            }
        };

        Lightbox.prototype.enableKeyboardNav = function() {
            $(document)
                .on('keyup.keyboard', $.proxy(this.keyboardAction, this));
        };

        Lightbox.prototype.disableKeyboardNav = function() {
            $(document).off('.keyboard');
        };

        Lightbox.prototype.keyboardAction = function(event) {
            var KEYCODE_ESC, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW, key, keycode;
            KEYCODE_ESC = 27;
            KEYCODE_LEFTARROW = 37;
            KEYCODE_RIGHTARROW = 39;
            keycode = event.keyCode;
            key = String.fromCharCode(keycode).toLowerCase();
            if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                this.end();
            } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                if (this.currentImageIndex !== 0) {
                    this.changeImage(this.currentImageIndex - 1);
                }
            } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                if (this.currentImageIndex !== this.album.length - 1) {
                    this.changeImage(this.currentImageIndex + 1);
                }
            }
        };

        Lightbox.prototype.end = function() {
            this.disableKeyboardNav();
            $(window).off("resize", this.sizeOverlay);
            $('#lightbox').fadeOut(this.options.fadeDuration);
            $('#lightboxOverlay').fadeOut(this.options.fadeDuration);
            return $('select, object, embed').css({
                visibility: "visible"
            });
        };

        return Lightbox;

    })();

    $(function() {
        var lightbox, options;
        options = new LightboxOptions;
        return lightbox = new Lightbox(options);
    });

}).call(this);

// POPUP
var popupStatus = 0;
var popupStatus2 = 0;
var popupStatus3 = 0;

function loadPopup() {
    if (popupStatus == 0) {
        $(".backgroundPopup").css({
            "opacity": "0.7"
        });
        $(".backgroundPopup").fadeIn("slow");
        $(".popupLayer").fadeIn("slow");
        popupStatus = 1;
    }
}

function loadPopup2() {
    if (popupStatus2 == 0) {
        $(".backgroundPopup2").css({
            "opacity": "0.7"
        });
        $(".backgroundPopup2").fadeIn("slow");
        $(".popupLayer2").fadeIn("slow");
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
        popupStatus2 = 1;
        reloadCaptcha();
    }
}

function loadPopup3() {
    if (popupStatus3 == 0) {
        $(".backgroundPopup3").css({
            "opacity": "0.7"
        });
        $(".backgroundPopup3").fadeIn("slow");
        $(".popupLayer3").fadeIn("slow");
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
        popupStatus3 = 1;
        reloadCaptcha();
    }
}

function disablePopup() {
    if (popupStatus == 1) {
        $(".backgroundPopup").fadeOut("slow");
        $(".popupLayer").fadeOut("slow");
        popupStatus = 0;
        if (mainContentUUID)
            $('#mgnlUuid').val(mainContentUUID);
        if (mainContentTitle)
            $('#emailTitle').html(mainContentTitle);
    }
}

function disablePopup2() {
    if (popupStatus2 == 1) {
        $(".backgroundPopup2").fadeOut("slow");
        $(".popupLayer2").fadeOut("slow");
        popupStatus2 = 0;
    }
}

function disablePopup3() {
    if (popupStatus3 == 1) {
        $(".backgroundPopup3").fadeOut("slow");
        $(".popupLayer3").fadeOut("slow");
        popupStatus3 = 0;
    }
}

$(document)
    .ready(
        function() {
            $('.popupLayerClose, .pop, .pick').removeAttr("href");
            $(".pop").click(function() {
                loadPopup2();
            });
            $(".pick").click(function() {
                loadPopup3();
            });
            $(
                ".popupLayerClose, .backgroundPopup, .backgroundPopup2, .backgroundPopup3")
                .click(function() {
                    disablePopup();
                    disablePopup2();
                    disablePopup3();
                });
            // Press Escape event!
            $(document)
                .keypress(
                    function(e) {
                        if (e.keyCode == 27 && popupStatus == 1 || e.keyCode == 27 && popupStatus2 == 1) {
                            disablePopup();
                            disablePopup2();
                            disablePopup3();
                        }
                    });
        });

// Expand Collapse
$(document).ready(function() {
    window.mobileservices = false;
    $(".cont").hide();
    $(".heading").click(function() {

        if (!window.mobileservices) {
            $('.cont>.tabs>li').click(function() {
                $(this).parent().parent().find(".tabs,.provider").show()
            });
            window.mobileservices = true;
        }
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {

            $(this).addClass("active");
            $(this).siblings().removeClass("active");

        }

        $(this).next(".cont").slideToggle(150);
        $(this).next(".cont").find(".wrapper").hide();
    });
});

// Comment Tools
$(document).ready(function() {
    $('.cmnt_tools>.like').click(function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {

            $(this).addClass("active");
            $(this).siblings().removeClass("active");

        }
    });
    $('.cmnt_tools>.dislike').click(function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {

            $(this).addClass("active");
            $(this).siblings().removeClass("active");

        }
    });
    $('.cmnt_tools>.reply').click(function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    });

});

// Program Grid Select Week
$(document).ready(function() {
    $('.filter .select_week a').removeAttr("href");
    $('.filter .select_week .first_week').click(function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".week01").show();
        $(".week02").hide();
    });
    $('.filter .select_week .second_week').click(function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".week02").show();
        $(".week01").hide();
    });
});

// Program Grid Select Channel
$(document)
    .ready(
        function() {
            $(".grid_66 .isAaChannel").hide();
            $(".grid_66 .isHadathChannel").hide();
            $(".programs_66 .isAaChannel").hide();
            $(".programs_66 .isHadathChannel").hide();
            $(".grid_66 .theSelect")
                .change(
                    function() {
                        var value = $(
                            ".grid_66 .theSelect option:selected")
                            .val();
                        var theDiv = $(".grid_66 .is" + value);
                        theDiv.fadeIn("fast");
                        theDiv.siblings('[class^=is]').fadeOut(
                            "fast");
                        $('.filter .select_week a')
                            .click(
                                function() {
                                    $(
                                        '.grid_66 .theSelect option:selected')
                                        .removeAttr(
                                            "selected");
                                    $(
                                        ".grid_66 .isAaChannel")
                                        .hide();
                                    $(
                                        ".grid_66 .isHadathChannel")
                                        .hide();
                                    $(".grid_66 .isAll")
                                        .show();
                                })
                    });
            $(".programs_66 .content01 .theSelect")
                .change(
                    function() {
                        var value = $(
                            ".programs_66 .content01 .theSelect option:selected")
                            .val();
                        var theDiv = $(".programs_66 .content01 .is" + value);
                        theDiv.fadeIn("fast");
                        theDiv.siblings('[class^=is]').fadeOut(
                            "fast");
                    });

            $(".programs_66 .content02 .theSelect")
                .change(
                    function() {
                        var value = $(
                            ".programs_66 .content02 .theSelect option:selected")
                            .val();
                        var theDiv = $(".programs_66 .content02 .is" + value);
                        theDiv.fadeIn("fast");
                        theDiv.siblings('[class^=is]').fadeOut(
                            "fast");
                    });
        });


$(document).ready(function($) {

    // Reset Selected Dropdown
    $(window).unload(function() {
        $('select option').remove();
    });

    $(document).ready(function() {
        $('.news_ticker .title a, .videoWithPoster a').removeAttr("href");
    });

});

// Content Slider
$(document).ready(
    function($) {
        $('.cont_slider .control_next, .cont_slider .control_prev')
            .removeAttr("href");

        var slideCount = $('.cont_slider ul li').length;
        var slideWidth = $('.cont_slider ul li').width();
        var slideHeight = $('.cont_slider ul li').height();
        var sliderUlWidth = slideCount * slideWidth;

        $('.cont_slider').css({
            width: slideWidth,
            height: slideHeight
        });

        $('.cont_slider ul').css({
            width: sliderUlWidth,
            marginRight: -slideWidth
        });

        $('.cont_slider ul li:last-child').prependTo('.cont_slider ul');

        function moveLeft() {
            $('.cont_slider ul').animate({
                    left: -slideWidth
                },
                200,
                function() {
                    $('.cont_slider ul li:last-child').prependTo(
                        '.cont_slider ul');
                    $('.cont_slider ul').css('left', '');
                });
        };

        function moveRight() {
            $('.cont_slider ul').animate({
                    left: +slideWidth
                },
                200,
                function() {
                    $('.cont_slider ul li:first-child').appendTo(
                        '.cont_slider ul');
                    $('.cont_slider ul').css('left', '');
                });
        };

        $('a.control_prev').click(function() {
            moveLeft();
        });

        $('a.control_next').click(function() {
            moveRight();
        });

    });

// TRANSCRIPTS
$(document).ready(function() {
    $('.translation-box .tabs-head .tab').click(function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($('.translation-box .tabs-content .tab1').hasClass('active')) {
            $('.translation-box .tabs-content .tab1').removeClass('active');
            $('.translation-box .tabs-content .tab2').addClass('active');
            $('.translation-box .tabs-content .tab1').hide();
            $('.translation-box .tabs-content .tab2').show();
        } else {
            $('.translation-box .tabs-content .tab2').removeClass('active');
            $('.translation-box .tabs-content .tab1').addClass('active');
            $('.translation-box .tabs-content .tab2').hide();
            $('.translation-box .tabs-content .tab1').show();
        }
    });
});

//$(document).ready(function() {
//	$('.multi_artcle_cmnts').hide();
//
//	$('.show_cmnts').click(function() {
//		if ($(this).siblings('.multi_artcle_cmnts').hasClass('.active')) {
//			$(this).siblings('.multi_artcle_cmnts').removeClass('.active');
//			$(this).siblings('.multi_artcle_cmnts').slideUp();
//			$(this).removeClass('hide_cmnts');
//			$(this).text('أظهر التعليقات');
//		} else {
//			$(this).siblings('.multi_artcle_cmnts').addClass('.active');
//			$(this).siblings('.multi_artcle_cmnts').slideDown();
//			$(this).addClass('hide_cmnts');
//			$(this).text('أخفي التعليقات');
//		}
//
//	});
//});

// Start Multi Slider
$(document).ready(function() {
    try {
        $('.multi_slider .slider').flexslider({
            animation: 'fade',
            controlNav: false,
            animationLoop: true,
            slideshow: false,
            sync: '.carousel',
            start: function(slider) {
                $('body').removeClass('loading');
            }
        });
        $('.multi_slider .carousel').flexslider({
            animation: 'slide',
            controlNav: false,
            animationLoop: true,
            slideshow: false,
            itemWidth: 118,
            asNavFor: '.slider',
        });
        if ($('.multi_slider .carousel .slides li').length < 6) {
            $('.multi_slider .carousel .slides').css({
                'padding-right': 10
            });
        };
    } catch (err) {
        console.warn("FLEXSLIDER is not available ::::> " + err.message);
    }
});
// End Multi Slider

//Start Social handlers
function shareCount(intentEvent) {

    var randomnumber = Math.floor(Math.random() * 1000000);
    var shareLink = "/servlet/aa/tracking-info.gif?id=" + txt_uid + "&ty=" + txt_ty + "&se=" + txt_se + "&ac=sharing" + "&verid=" + randomnumber;

    console.log(shareLink);

    $.get(shareLink, function(data) {
        console.log("article shared");
    });
};

//google
function plusone_vote(obj) {
    shareCount();
};

$(document).ready(function() {
    try {
        //FB
        $('#shareButton').click(function() {
            fbLink = $(this).data("href");
            FB.ui({
                method: 'share',
                href: fbLink
            }, function(response) {
                if (response && !response.error_code) {
                    shareCount();
                } else {
                    shareCount();
                }
            });
        });

        // TWITTER
        twttr.ready(function(twttr) {
            twttr.events.bind('click', shareCount);
        });
    } catch (err) {
        console.warn("Social handlers error" + err.message);
    }
});
//END social Handlers 

// Start Article Highlight Sharing Tooltip
var sharableContent = "";
$(document).tooltip({
    items: '.need_tooltip',
    content: function() {
        sharableContent = $(this).html();
        return $('.tooltip').html();
    },
    close: function(event, ui) {
        ui.tooltip.hover(
            function() {
                $(this).stop(true).fadeTo(400, 1);
            },
            function() {
                $(this).fadeOut("400", function() {
                    $(this).remove();
                })
            }
        );
    },

});
$(function() {
    $(document).ready(function() {
        $(".need_tooltip").live("mouseout", function() {
            var txt = $(this).text();
            $(".tooltip .whatsapp").attr({
                href: "javascript:window.open('whatsapp://send?text=" + txt + shortURL + "','_blank', 'width=400,height=500');void(0);",
                title: txt,
                "data-action": "share/whatsapp/share"
            });
            $(".tooltip .fb").attr({
                href: "javascript:window.open('http://www.facebook.com/share.php?u=" + shortURL + "&title=" + txt + "','_blank', 'width=400,height=500');void(0);",
                title: txt
            });
            $(".tooltip .twtr").attr({
                href: "http://twitter.com/intent/tweet?text=" + txt + " " + shortURL,
                title: txt
            });
            $(".tooltip .telegram").attr({
                href: "javascript:window.open('tg://msg_url?url=" + shortURL + "&amp;text=" + txt + "','_blank', 'width=400,height=500');void(0);",
                title: txt
            });

        });

    })
});
// End Article Highlight Sharing Tooltip