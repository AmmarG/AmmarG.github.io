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
     	body = document.querySelector('body');

    menu.addEventListener('click', function() {
        overlay.classList.toggle('show');
        nav.classList.toggle('show');
        menu.classList.toggle('cross');
        body.classList.toggle('noscroll');
    })

    //moveOneStep();
    window.onscroll = function() {
        isScrolledIntoView(slider, moveOneStep);
    };


})()

function isScrolledIntoView(el, fun) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    if (isVisible) {
        fun();
        window.onscroll = null;
    }

}


function checkVisible(elm) {
    var parentPos = document.getElementById('slider').getBoundingClientRect(),
        childrenPos = document.getElementById('last').getBoundingClientRect(),
        relativePos = {};
    relativePos.top = childrenPos.top - parentPos.top,
    relativePos.right = childrenPos.right - parentPos.right,
    relativePos.bottom = childrenPos.bottom - parentPos.bottom,
    relativePos.left = childrenPos.left - parentPos.left;
    if (Math.abs(relativePos.right) <= parentPos.width) {
        return true;
    }
}

function sliderStep(elem, step) {
    elem.style.transform = "translate3d(" + step + "px, 0px, 0px)";
    elem.style.webkitTransform = "translate3d(" + step + "px, 0px, 0px)";
    elem.style.MozTransform = "translate3d(" + step + "px, 0px, 0px)";
    elem.style.msTransform = "translate3d(" + step + "px, 0px, 0px)";
    elem.setAttribute('step', step);
}

function moveOneStep() {
    console.log('called');
    var slider = document.querySelector('.slider'),
        ss = slider.children,
        ff = slider.querySelector('.active'),
        initalActiveElIndex = Array.prototype.indexOf.call(ss, ff),
        startingPoint = 0,
        lastmove = 0,
        next = document.getElementById('next'),
        prev = document.getElementById('prev'),
        last = document.getElementById('last');
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
                console.log('statred');
                e.preventDefault();

                var t = e.touches[0];
                swipe_det.sX = t.screenX;
            }
            slider.addEventListener('touchstart', dd, false);

            slider.addEventListener('touchmove', function(e) {
                e.preventDefault();
                var t = e.touches[0];
                swipe_det.eX = t.screenX;
            }, false);

            slider.addEventListener('touchend', function(e) {
                //check if last visisble
                var uu = checkVisible(last);
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
                            //console.log(current);
                            slider.removeEventListener("touchMove", dd);
                            var laststep = parseInt(slider.getAttribute('step')) + Math.abs(last.getBoundingClientRect().left);
                            //console.log(Math.abs(last.getBoundingClientRect().left));
                            //console.log(slider.getAttribute('step'));
                            //console.log(laststep);
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
                if (document.getElementById('prev').disabled === true) {
                    document.getElementById('prev').disabled = false;
                }

                //get the last element position	(recentleft)
                var recentleft = last.getBoundingClientRect();
                var nextobj = startingPoint + ss[current].offsetWidth;
                startingPoint = nextobj;
                current += 1;
                var uu = checkVisible(last);
                //console.log('uu',uu)
                if (uu) {
                    document.getElementById('next').disabled = true;
                }else{
                	sliderStep(slider, nextobj);	
                }
                
            }, false);
            prev.addEventListener('click', function(e) {
                current -= 1;
                if (current > 0) {

                    if (document.getElementById('next').disabled === true) {
                        document.getElementById('next').disabled = false;
                    }

                    var prevobj = startingPoint - ss[current].offsetWidth;
                    sliderStep(slider, prevobj);
                    startingPoint = prevobj;
                } else if (current === 0) {
                    prevobj = startingPoint - ss[current].offsetWidth;
                    sliderStep(slider, prevobj);
                    startingPoint = prevobj;
                    document.getElementById('prev').disabled = true;
                }
            }, false);

        }

        //if no active		
    } else {
        console.log('please set active');
    }
}

/* Search Box | Breaking News */
$(document).ready(function() {
    $(".btn-search").click(function() {
        $("form").slideToggle("500", "easeInOutCirc");
    });

    function showNews() {
        $('.breaking-news').slideDown(300).css('visibility', 'visible');
    };

    function hideNews() {
        $('.breaking-news').slideUp(300);
        window.setTimeout(showNews, 30000);
    };

    function breakingClose() {
        $('.breaking-news .close').click(function() {
            $('.breaking-news').slideUp(300);
        });
    };
    $('.breaking-news').hide();
    hideNews();
    breakingClose();
});