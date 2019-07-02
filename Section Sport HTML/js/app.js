'use strict';
(function() {
    var menu = document.querySelector('.mobile-menu'),
        overlay = document.querySelector('.overlay'),
        nav = document.querySelector('nav .main-content'),
        ss = nav.querySelector('main-content'),
        slider = document.getElementById('slider'),
        body = document.querySelector('body'),
        submenu = document.querySelectorAll('.menu-icon'),
        mobsubmenu = document.querySelectorAll('.submenu'),
        mobsubmenuD = document.querySelector('.submenu.current-section'),
        searchBtn = document.querySelectorAll('.btn-search'),
        search = document.querySelector('.search-overlay'),
        close = document.querySelector('.search-overlay .close'),
        mobsearh = document.querySelector('.mobile-search'),
        chamgeFont = document.querySelector('.font-resize'),
        article = document.querySelector('article'),
        breakingNews = document.querySelector('.breaking-news'),
        breakingTxt = document.querySelector('.breaking-news p'),
        megaMenu = document.querySelector('.mega-menu'),
        articleVideo =document.getElementById('main-video');
    menu.addEventListener('click', function() {
        overlay.classList.toggle('show');
        nav.classList.toggle('show');
        menu.classList.toggle('cross');
        body.classList.toggle('noscroll');
    });
    overlay.addEventListener('touchstart',function(e){
        e.preventDefault();
        overlay.classList.toggle('show');
        nav.classList.toggle('show');
        menu.classList.toggle('cross');
        body.classList.toggle('noscroll');
    },false);
    submenu.forEach(function(sub){
        sub.addEventListener('click', function(e) {
            e.preventDefault();
            megaMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
    },false);
    searchBtn.forEach(function(ele) {
        if(typeof ele !== 'undefined' && ele !== null){
            ele.addEventListener('click',searchToggle,false);
        }
    });
    mobsearh.addEventListener('click',searchToggle,false);
    function searchToggle(event){
        event.preventDefault();
        body.classList.toggle('noscroll');
        search.classList.toggle('show');
        nav.classList.toggle('overflowfix');
}
document.addEventListener('keyup',function(e){
    if (search.classList.contains('show')) {
        document.addEventListener('keyup',escapeToClose,false);
    }else{
        document.removeEventListener('keyup',escapeToClose);
    }
},false);
function escapeToClose(event){
    event = event || window.event;
    if (event.keyCode == 27 && search.classList.contains('show')) {
        body.classList.remove('noscroll');
        search.classList.remove('show');
        nav.classList.remove('overflowfix');
    }
}
    close.addEventListener('click', function(e) {
        e.preventDefault();
        search.classList.remove('show');
        body.classList.remove('noscroll');
        nav.classList.remove('overflowfix');
    });
    if (chamgeFont) {
        chamgeFont.addEventListener('click', function(e) {
            e.preventDefault();
            article.classList.toggle('bigger');
        });
    }
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)|| navigator.userAgent.match(/Firefox/i)) {
        mobsubmenu.forEach(function(meun){
            meun.addEventListener('click', function(e) {
                if(e.target.tagName.toLowerCase() !== 'a'){
                    e.preventDefault();    
                    e.stopPropagation();
                    this.classList.toggle('active');
                var Siblings = getSiblings(this);
                for(var i=0;i<Siblings.length;i++){
                    if(Siblings[i].classList.contains('active')){
                        Siblings[i].classList.remove('active');
                    }
                    }
                }
                
                
            }, false);
        })
     
    }else{
        /**only for desktop **/
          /**Alhdath nav**/
  var hadathnav = document.querySelector('.alhadath-nav');
  if(hadathnav){
    setInterval(function() {
        hadathnav.classList.toggle('switch');
    },10000);
    }
    }
    //stiky video
    if(articleVideo){
    var videoPlace = articleVideo.getBoundingClientRect().top;
    var startSticky=  Math.floor( videoPlace +  articleVideo.offsetHeight + window.pageYOffset );
    }
    window.addEventListener('scroll', function() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Firefox/i)) {} else {
            var header = document.querySelector('header');
            var logo = document.querySelector('h1.logo');
            // var menu = document.querySelector('nav .main-content ul');
            var mainNav = document.querySelector('header nav');
            //first step global header

            if (window.pageYOffset > 10) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            if (window.pageYOffset > 70) {
                mainNav.setAttribute('style', 'top=' + window.pageYOffset + 'px');
            } else {
                mainNav.classList.remove('moveR');
                body.classList.remove('margintop');
            }
            if (window.pageYOffset > 190) {
                mainNav.classList.add('moveR');
                body.classList.add('margintop');
            } else {
                mainNav.classList.remove('moveR');
                body.classList.remove('margintop');
            }
            if (window.pageYOffset > 190) {
                mainNav.classList.add('moveD');
                body.classList.add('margintop');
            } else {
                mainNav.classList.remove('moveD');
            }
            if(megaMenu.classList.contains('show')){
                megaMenu.classList.remove('show');
                submenu.forEach(function(ele){
                        ele.classList.remove('active');

                });
            }

            //stiky video//
            if(articleVideo){
                if(window.pageYOffset > startSticky){
                    articleVideo.classList.add('video-sticky');
                }
                if(window.pageYOffset < startSticky -200)
                {
                    articleVideo.classList.remove('video-sticky');
                }
            }
    }


    });
     window.onload=setTimeout(function() {
    var sliders = ['slider', 'dateSlider','slider1'];
    sliders.forEach(function(slider) {
        var ele = document.getElementById(slider);
        if (ele) {
            if (isVisible(ele)) {
                moveOneStep(ele);
            } else {
                window.onscroll = function() {
                    isScrolledIntoView(ele, moveOneStep);
                };
            }
        }
    });
     },0);

    var xmlhttp = new XMLHttpRequest(),
        current = '',
        previous = '';
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            current = myObj.result.text;
            if(current!='' ){
                if(current != previous){
                    breakingTxt.innerText = current;
                    breakingNews.classList.add('show'); 
                    previous = current;
                }
            }else{
                if(breakingNews.classList.contains('show')){
                    breakingNews.classList.remove('show');
                    
                }
               
            }


        }
    };
    xmlhttp.open("GET", "https://feed.alarabiya.net/breakingNews/ar.json", true);
    xmlhttp.send();
    setInterval(function() {
        xmlhttp.open("GET", "https://feed.alarabiya.net/breakingNews/ar.json", true);
        xmlhttp.send();
    }, 5000);

  /**Search Form submit***/ 
  var atag = document.querySelector('.search-icon');
    atag.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById('search-form').submit(); 
    })  

})();
//arr varilble to save the called slider before
var arr = [];



function isVisible(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;
    var iselVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    if (iselVisible)
        return true;
    return false;
}

function getSiblings(elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for ( ; sibling; sibling = sibling.nextSibling ) {
			if ( sibling.nodeType === 1 && sibling !== elem ) {
					siblings.push( sibling );
			}
	}
	return siblings;
}
function isScrolledIntoView(el, fun) {
    if (isVisible(el)) {
        if (arr.indexOf(el) === -1) {
            arr.push(el);
            fun(el);
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
    function dd(e) {
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
    }
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
        var swipe_det = {};
        swipe_det.sX = 0;
        swipe_det.eX = 0;
        var min_x = 20; //min x swipe for horizontal swipe
        var max_x = 40; //max x difference for vertical swipe
        
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

        }, false);
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
        //if no active		
    } else {
        console.log('please set active');
    }
}



$(document).ready(function() {
    $('.font-resize a, .prnt a').removeAttr("href");
    // Tabs
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(this).parent().parent().siblings(".tab").children().not(tab).css("display", "none");
        $(tab).fadeIn();
    });

    // Side Showing Now Box
    $(".aa-live .close-btn").click(
        function() {
            $(".aa-live").addClass("hide-live");
        });
    $(".live-open").click(
        function() {
            $(".aa-live").removeClass("hide-live");
        });

    // Article Sharing Toggle
    $("article .teaser-tools .share").click(function() {
        $(this).toggleClass("show-icons");
    });
    
    // Related artiles show/hide on page scroll (will be activated later)
    // $(window).scroll(function() {
    //    if ($(window).scrollTop() > 300) { 
    //        $('.sticky-related').slideDown(500);
    //    }
    //    if ($(window).scrollTop() < 300) {
    //        $('.sticky-related').slideUp(500);
    //    }
    //    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    //        $('.sticky-related').slideUp(500);
    //    }
    // });
});

// Verical Carousel
var Carousel = {
    duration: 300, // Animation duration in milliseconds.
};

function rotateForward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(lastChild, firstChild);
}

function rotateBackward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(firstChild, lastChild.nextSibling);
}

function animate(begin, end, finalTask) {
    var wrapper = Carousel.wrapper,
        carousel = Carousel.carousel,
        change = end - begin,
        duration = Carousel.duration,
        startTime = Date.now();
    carousel.style.top = begin + 'px';
    var animateInterval = window.setInterval(function() {
        var t = Date.now() - startTime;
        if (t >= duration) {
            window.clearInterval(animateInterval);
            finalTask();
            return;
        }
        t /= (duration / 2);
        var top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
            change / 2 * (Math.pow(t - 2, 3) + 2));
        carousel.style.top = top + 'px';
    }, 1000 / 60);
}
window.onload = function() {
    try {
            var carousel = Carousel.carousel = document.getElementById('ver-carousel'),
            listItems = carousel.getElementsByTagName('li'),
            numItems = listItems.length,
            itemWidth = Carousel.width,
            rowHeight = listItems.height;
            carousel.style.width = itemWidth + 'px';
        for (var i = 0; i < numItems; ++i) {
            var list = listItems[i];
        }
        Carousel.rowHeight = carousel.getElementsByTagName('li')[0].offsetHeight;
        carousel.style.visibility = 'visible';
        var wrapper = Carousel.wrapper = document.createElement('div');
        wrapper.id = 'carouselWrapper';
        wrapper.style.width = carousel.offsetWidth + 'px';
        wrapper.style.height = carousel.offsetHeight + 'px';
        carousel.parentNode.insertBefore(wrapper, carousel);
        wrapper.appendChild(carousel);
        var prevButton = document.getElementById('caro-prev'),
            nextButton = document.getElementById('caro-next');
        prevButton.onclick = function() {
            prevButton.disabled = nextButton.disabled = true;
            rotateForward();
            animate(-Carousel.rowHeight, 0, function() {
                carousel.style.top = '0';
                prevButton.disabled = nextButton.disabled = false;
            });
        };
        nextButton.onclick = function() {
            prevButton.disabled = nextButton.disabled = true;
            animate(0, -Carousel.rowHeight, function() {
                rotateBackward();
                carousel.style.top = '0';
                prevButton.disabled = nextButton.disabled = false;
            });
        };
    } catch(err){
		console.log("error in windowLoad" + err.message)
	}
};

//aswaq Search For companies

function iniSearchAutoComplete() {
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function(ul, items) {
            var that = this,
                currentCategory = "";
            ul.append('<li class="search_news"><a>البحث في الأخبار</a></li>');
            $.each(items, function(index, item) {
                var li;
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                    li.attr("aria-link", item.url);
                }
            });
        }

    });
}

function loadSearch() {
    var xhr;
    $(".section-aswaq .search-input").catcomplete({
        delay: 0,
        source: function(request, response) {
            var regex = new RegExp(request.term, 'i');
            if (xhr) {
                xhr.abort();
            }
            xhr = $.ajax({
                url: "/.resources/aa-templating-lm/webresources/static/aswaq/market-data.json",
                dataType: "json",
                cache: false,
                success: function(data) {
    
                    var resArr = $.map(data.list, function(item) {
                        if (regex.test(item.label)) {
                            return {
                                label: item.label,
                                category: item.category,
                                url: item.url
                            };
                        }
                    });
                    if (resArr.length == 0) {
                        resArr = [{
                            label: "",
                            category: "",
                            url: ""
                        }];
                    }
                    response(resArr);
                }
            });
        },
        minlength: 0,
        select: function(event, ui) {
            console.log("select");
            if (typeof ui.item === "undefined") {
                console.log("select undefined");
                var searchVal = $('.section-aswaq .search-input').val();
                window.location.href = seartchPageLink + "?lang=ar&q=" + searchVal
            } else {
                console.log(ui.item.url);
                window.location.href = ui.item.url;
            }
        }
    });
}
//END iniSearch AutoComplete
$(document).ready(function() {

    // init Search for aswaq companies
    try {
    if($('.section-aswaq  .search-input').length){
    console.log("start init search");
            iniSearchAutoComplete();
            loadSearch();
            console.log("end init search");
    }
    } catch (err) {
        console.log(err.message);
    }
        iFrameResize({
            log: false,
            checkOrigin: false
        });
});