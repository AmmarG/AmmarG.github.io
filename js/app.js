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
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(this).parent().parent().siblings().children().not(tab).css("display", "none");
        $(tab).fadeIn();
    });
    // Slider
    $(function() {
        $(".slides").slidesjs({
            pagination: {
                active: false
            }
        });
    });
});