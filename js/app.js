/*if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../sw.js', { scope: '/' }).then((reg) => {
		if (reg.installing) {
			console.log('Service worker installing');
		} else if(reg.waiting) {
			console.log('Service worker installed');
		} else if(reg.active) {
			console.log('Service worker active');
		}
		
	}).catch((error) => {
		console.log('Registration failed with ' + error); // Registration failed
	});

  // Communicate with the service worker using MessageChannel API.
  function sendMessage(message) {
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function(event) {
        resolve(`Direct message from SW: ${event.data}`);
      };

      navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])
    });
  }
}*/
'use strict';
(function() {
    var menu = document.querySelector('.mobile-menu'),
        overlay = document.querySelector('.overlay'),
        nav = document.querySelector('nav .main-content'),
        ss = nav.querySelector('main-content'),
        slider = document.getElementById('slider'),
        body = document.querySelector('body'),
        submenu = document.querySelector('.menu-icon'),
        mobsubmenu = document.querySelector('.submenu'),
        seacrhBtn = document.querySelector('.btn-search'),
        search = document.querySelector('.search-overlay'),
        close = document.querySelector('.close'),
        mobsearh = document.querySelector('.mobile-searh'),
        chamgeFont = document.querySelector('.font-resize'),
        article = document.querySelector('article');
    var arr = [seacrhBtn, mobsearh];
    menu.addEventListener('click', function() {
        overlay.classList.toggle('show');
        nav.classList.toggle('show');
        menu.classList.toggle('cross');
        body.classList.toggle('noscroll');
    })
    submenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        if (mobsubmenu.classList.contains('slideOut')) {
            mobsubmenu.classList.toggle('slideIN');
        } else {
            mobsubmenu.classList.toggle('slideOut');
        }

    })
    mobsubmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');

    })
    arr.forEach(function(ele) {
        ele.addEventListener('click', function(e) {
            e.preventDefault();
            body.classList.toggle('noscroll');
            search.classList.toggle('show');
        })
    })

    close.addEventListener('click', function(e) {
        e.preventDefault();
        search.classList.remove('show');
        body.classList.remove('noscroll');
    })
    if (chamgeFont) {
        chamgeFont.addEventListener('click', function(e) {
            e.preventDefault();
            article.classList.toggle('bigger');
        })
    }


    window.addEventListener('scroll', function() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {} else {
            var header = document.querySelector('header');
            var logo = document.querySelector('h1.logo');
            var menu = document.querySelector('nav .main-content ul');
            var mainNav = document.querySelector('header nav');
            //first step global header
            if (window.pageYOffset > 10) {

                header.classList.add('sticky');
                //secound step logo
                if (window.pageYOffset > 70) {
                    //nav.classList.add('fixed');
                    //logo.classList.add('scaleD');
                    mainNav.setAttribute('style', 'top=' + window.pageYOffset + 'px');
                    if (window.pageYOffset > 200) {
                        // logo.classList.remove('scaleD');
                        //logo.classList.add('scaleU');
                        mainNav.classList.add('moveR');
                        body.classList.add('margintop');
                        if (window.pageYOffset > 250) {
                            mainNav.classList.add('moveD');
                        } else {
                            mainNav.classList.remove('moveD');
                        }
                    } else {
                        mainNav.classList.remove('moveR');
                        body.classList.remove('margintop');
                    }
                } else {
                    //logo.classList.remove('scaleU');
                    mainNav.classList.remove('moveR');
                    //logo.classList.remove('scaleD');
                }
            } else {
                header.classList.remove('sticky');

            }
        }
    })
    //moveOneStep('slider1');
    //moveOneStep('slider');
    window.onscroll = function() {
        isScrolledIntoView('slider1', moveOneStep);
        isScrolledIntoView('slider', moveOneStep);
        isScrolledIntoView('dateSlider', moveOneStep);

    };


})()
//arr varilble to save the called slider before
var arr = [];

function isScrolledIntoView(el, fun) {
    var el = document.getElementById(el);
    if (el) {
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        if (isVisible) {
            if (arr.indexOf(el) === -1) {
                arr.push(el);
                fun(el);
            }
        }

    }

}


function checkVisible(elm) {
    var elem = document.getElementById(elm);
    var parentPos = elem.getBoundingClientRect(),
        childrenPos = elem.querySelector('#last').getBoundingClientRect(),
        relativePos = {};
    relativePos.top = childrenPos.top - parentPos.top,
    relativePos.right = childrenPos.right - parentPos.right,
    relativePos.bottom = childrenPos.bottom - parentPos.bottom,
    relativePos.left = childrenPos.left - parentPos.left;
    if (Math.abs(relativePos.right) <= parentPos.width) {
        return relativePos.left;
    }
}

function sliderStep(elem, step) {
    elem.style.transform = "translate3d(" + step + "px, 0px, 0px)";
    elem.style.webkitTransform = "translate3d(" + step + "px, 0px, 0px)";
    elem.style.MozTransform = "translate3d(" + step + "px, 0px, 0px)";
    elem.style.msTransform = "translate3d(" + step + "px, 0px, 0px)";
    elem.setAttribute('step', step);
}

function transitionEndEventName() {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }

    //TODO: throw 'TransitionEnd event is not supported in this browser'; 
}

function moveOneStep(elem) {
    var slider = elem.querySelector('.slider'),
        ss = slider.children,
        ff = slider.querySelector('.active'),
        initalActiveElIndex = Array.prototype.indexOf.call(ss, ff),
        startingPoint = 0,
        lastmove = 0,
        next = elem.querySelector('#next'),
        prev = elem.querySelector('#prev'),
        last = elem.querySelector('#last');
    if (ff) {
        //calculating the starging point
        for (var i = 0; i < initalActiveElIndex - 1; i++) {
            startingPoint += ss[i].offsetWidth;

        }
        //moving slider to startingpoint
        sliderStep(slider, startingPoint);

        //current edge set the one before the active
        var current = initalActiveElIndex - 1;
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            var swipe_det = {};
            swipe_det.sX = 0;
            swipe_det.eX = 0;
            var min_x = 20; //min x swipe for horizontal swipe
            var max_x = 40; //max x difference for vertical swipe
            function dd(e) {
                var t = e.touches[0];
                swipe_det.sX = t.screenX;
            }
            slider.addEventListener('touchstart', dd, false);

            slider.addEventListener('touchmove', function(e) {

                var t = e.touches[0];
                swipe_det.eX = t.screenX;
            }, false);

            slider.addEventListener('touchend', function(e) {
                //check if last visisble
                var uu = checkVisible(elem.id);
                var nextobj = startingPoint + ss[current].offsetWidth;
                //var vis= true;

                if ((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) {
                    if (swipe_det.eX > swipe_det.sX) {
                        if (!uu) {
                            if (current < ss.length - 1) {
                                startingPoint = nextobj;
                                sliderStep(slider, nextobj);
                                current += 1;
                            }

                        } else {
                            slider.removeEventListener("touchMove", dd);
                            var laststep = parseInt(slider.getAttribute('step')) + Math.abs(last.getBoundingClientRect().left);
                            sliderStep(slider, laststep);

                        }
                    } else {

                        if (current >= 1) {
                            current -= 1;
                            var prevobj = startingPoint - ss[current].offsetWidth;
                            startingPoint = prevobj;
                            sliderStep(slider, prevobj);
                        }

                    }

                }

            }, false);
        } else {
            next.addEventListener('click', function(e) {
                if (elem.querySelector('#prev').disabled === true) {
                    elem.querySelector('#prev').disabled = false;
                }

                //get the last element position	(recentleft)
                var recentleft = last.getBoundingClientRect();
                var nextobj = startingPoint + ss[current].offsetWidth;
                startingPoint = nextobj;
                current += 1;
                var uu = checkVisible(elem.id);
                if (uu) {
                    elem.querySelector('#next').disabled = true;
                } else {
                    var transitionEnd = transitionEndEventName();
                    slider.addEventListener(transitionEnd, function() {
                        if (checkVisible(elem.id)) {
                            var finalmove = nextobj + Math.abs(checkVisible(elem.id));
                            sliderStep(slider, finalmove)
                            elem.querySelector('#next').disabled = true;
                        }
                    })


                    sliderStep(slider, nextobj);
                    elem.querySelector('#next').disabled = true;
                    setTimeout(function() {
                        elem.querySelector('#next').disabled = false;
                    }, 250);
                }

            }, true);
            prev.addEventListener('click', function(e) {
                current -= 1;
                if (current > 0) {

                    if (elem.querySelector('#next').disabled === true) {
                        elem.querySelector('#next').disabled = false;
                    }

                    var prevobj = startingPoint - ss[current].offsetWidth;
                    sliderStep(slider, prevobj);
                    startingPoint = prevobj;
                    elem.querySelector('#prev').disabled = true;
                    setTimeout(function() {
                        elem.querySelector('#prev').disabled = false;
                    }, 250);
                } else if (current === 0) {
                    prevobj = startingPoint - ss[current].offsetWidth;
                    sliderStep(slider, prevobj);
                    startingPoint = prevobj;
                    elem.querySelector('#prev').disabled = true;
                }
            }, false);

        }

        //if no active		
    } else {
        console.log('please set active');
    }
}
$(document).ready(function() {
    function showNews() {
        $('.breaking-news').slideDown(300).css('visibility', 'visible');
    };

    function hideNews() {
        $('.breaking-news').slideUp(300);
        window.setTimeout(showNews, 30000);
    };

    function breakingClose() {
        $('.breaking-news').click(function() {
            $(this).slideUp(300);
        });
    };
    $('.breaking-news').hide();
    hideNews();
    breakingClose();
    $('.font-resize a, .prnt a').removeAttr("href");


    // Tabs
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(this).parent().parent().siblings().children().not(tab).css("display", "none");
        $(tab).fadeIn();
    });

    // Side Showing Now Box
    $(".aa-live .close").click(
        function() {
            $(".aa-live").addClass("hide-live");
        });
    $(".live-open").click(
        function() {
            $(".aa-live").removeClass("hide-live");
        });

});