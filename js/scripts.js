'use strict';
(function() {
    var menu = document.querySelector('.mobile-menu'),
        overlay = document.querySelector('.overlay'),
        nav = document.querySelector('nav ul'),
        ss = nav.querySelector('ul'),
        body = document.querySelector('body');
    menu.addEventListener('click', function() {
        overlay.classList.toggle('show');
        nav.classList.toggle('show');
        menu.classList.toggle('cross');
        body.classList.toggle('noscroll');
    })
})()
$(document).ready(function() {
    // Tabs
    $(".full-wrapper .tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(this).parent().parent().siblings().children().not(tab).css("display", "none");
        $(this).parent().parent().siblings().children(tab).fadeIn();
    });

    // Main Navigation Tabs
    $("nav .tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var menutab = $(this).attr("href");
        $(".menu-content").not(menutab).css("display", "none");
        $(menutab).fadeIn();
    });
    // Slider
    $(function() {
        $(".slides").slidesjs({
            pagination: {
                active: false
            },
            navigation: {
                effect: "fade"
            }
        });
    });
    // Toogle Buttons
    $(".play-toggle, .share, .like").click(function() {
        $(this).toggleClass("active");
    });

    $(".share").click(function() {
        $(this).children(".pop").toggleClass("show");
    });

    // Close Mobile Menu on Select
    var isMobile = window.matchMedia("only screen and (max-width: 480px)");
    if (isMobile.matches) {
        $("header nav ul li a, .overlay").click(function() {
            $("header nav ul, .overlay").toggleClass("show");
            $(".mobile-menu").toggleClass("cross");
        });
    };
    $(".fm-player").musicPlayer({
        playlistItemSelector: 'div',
        elements: ['artwork', 'information', 'controls', 'progress', 'time', 'volume'],
        autoPlay: true,
        loop: true, // ==> This will display in  the order it is inserted
        //elements: [ 'controls' , 'information', 'artwork', 'progress', 'time', 'volume' ],
        controlElements: ['backward', 'play', 'forward'],
        //timeElements: ['current', 'duration'],
        //timeSeparator: " : ", // ==> Only used if two elements in timeElements option
        //infoElements: [  'title', 'artist' ],  

        //volume: 10,
    });
});