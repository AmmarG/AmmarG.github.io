(function() {
    'use strict';

    var slider = (document.querySelector('.slider') ? document.querySelector('.slider') : null);
    if (slider) {
        var li = slider.querySelectorAll('ul li');
        var leftBtn = slider.querySelector('button.left');
        var rightBtn = slider.querySelector('button.right');
        var score = 0;

        slider.firstElementChild.style.width = li.length * 900 + 50 + 'px';

        function scroll() {

            if (this.classList[1] == 'right') {
                if (li[score].nextElementSibling.nextElementSibling.nextElementSibling == null) return;
                li[score].style.display = 'none';
                score++;
            };

            if (this.classList[1] == 'left') {
                if (score == 0) return;
                li[score - 1].style.display = 'inline-block';
                score--;
            };

        };
        rightBtn.addEventListener('click', scroll);
        leftBtn.addEventListener('click', scroll);
    }
    document.querySelector('.menu-icon').addEventListener('click', function(e) {

        document.querySelector('.overlay').classList.toggle('show');

    });
    var ss = document.querySelector('.overlay');

    ss.addEventListener('click', function(e) {
        document.querySelector('.menu-btn').checked = false;
        document.querySelector('.overlay').classList.toggle('show');
    });


    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('nav.about ul li a');

    function getClosestSection() {
        var sectionsLength = sections.length;

        for (var index = 0; index < sectionsLength; index++) {
            if (isBelowScroll(sections.item(index)))
                break;
        }

        selectLink(sections.item(index).id)
    }

    function isBelowScroll(element) {
        var position = element.getBoundingClientRect();
        return position.top > 0;
    }

    function selectLink(id) {

        Array.prototype.forEach.call(navLinks, function(element) {
            element.classList.remove('is-selected');
        });

        document.querySelector('a[href="#' + id + '"]').classList.add('is-selected');
    }

    window.addEventListener('scroll', function(event) {
        getClosestSection();
    });


})();