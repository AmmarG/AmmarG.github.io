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
    var isMobile = window.matchMedia("only screen and (max-width: 480px)");

    if (isMobile.matches) {
        // Close Mobile Menu on Select
        $("header nav ul li a").click(function() {
            $("header nav ul, .overlay").toggleClass("show");
            $(".mobile-menu").toggleClass("cross");
        });
    }


});