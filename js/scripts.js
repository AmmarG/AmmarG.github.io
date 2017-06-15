$(function() {
    $('#ChangeToggle').click(function() {
        $('#navbar-hamburger').toggleClass('hidden');
        $('#navbar-close').toggleClass('hidden');
    });
});

function showNews() {
    $('.box.popup').slideDown(400).css('visibility', 'visible');
}

function breakingClose() {
    $('.box.popup .close').click(function() {
        $('.box.popup').slideUp(200);
        window.setTimeout(showNews, 10000);
    });
}
$(document).ready(function() {
    $("#myCarousel").swiperight(function() {
        $(this).carousel('prev');
    });
    $("#myCarousel").swipeleft(function() {
        $(this).carousel('next');
    });
    $('.carousel').carousel({
        interval: false
    });
    $('.box.popup .close').removeAttr("href");
    $('.box.popup').hide();
    window.setTimeout(showNews, 10000);
    breakingClose();


    // START CALENDAR
    moment.locale('ar-sa');
    $.getJSON("http://feed.alarabiya.net/calendarEvents/calendarEvents.json", function(data) {
        var events = [];
        $.each(data, function(key, val) {
            events.push(val);
        });
        $('#mini-clndr').clndr({
            template: $('#calendar-template').html(),
            events: events,
            clickEvents: {
                click: function(target) {
                    if (target.events.length) {
                        console.log('You picked a valid date!');
                        var daysContainer = $('#mini-clndr').find('.days-container');
                        daysContainer.toggleClass('show-events', true);
                        $('#mini-clndr').find('.x-button').click(function() {
                            daysContainer.toggleClass('show-events', false);
                        });
                    }
                }
            },
            adjacentDaysChangeMonth: true
        });
    });
});
// Start Article Highlight Sharing Tooltip
var sharableContent = "";
var bsTooltip = $.fn.tooltip.noConflict();
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
        $(".need_tooltip").on("tap", function() {
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