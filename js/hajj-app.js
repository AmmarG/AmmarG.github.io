"use strict";
(function() {
  var menu = document.querySelector(".mobile-menu"),
    overlay = document.querySelector(".overlay") || "",
    nav = document.querySelector("nav .main-content"),
    body = document.querySelector("body"),
    submenu = document.querySelectorAll(".menu-icon"),
    mobsubmenu = document.querySelectorAll(".submenu"),
    searchBtn = document.querySelectorAll(".btn-search"),
    search = document.querySelector(".search-overlay"),
    close = document.querySelector(".search-overlay .close"),
    mobsearh = document.querySelector(".mobile-search"),
    chamgeFont = document.querySelector(".font-resize"),
    article = document.querySelector("article"),
    breakingNews = document.querySelector(".breaking-news"),
    breakingTxt = document.querySelector(".breaking-news p"),
    megaMenu = document.querySelector(".mega-menu"),
    articleVideo = document.getElementById("main-video");
  menu.addEventListener("click", function() {
    overlay.classList.toggle("show");
    nav.classList.toggle("show");
    menu.classList.toggle("cross");
    body.classList.toggle("noscroll");
  });
  if (overlay != "") {
    overlay.addEventListener(
      "touchstart",
      function(e) {
        e.preventDefault();
        overlay.classList.toggle("show");
        nav.classList.toggle("show");
        menu.classList.toggle("cross");
        body.classList.toggle("noscroll");
      },
      false
    );
  }
  submenu.forEach(function(sub) {
    sub.addEventListener("click", function(e) {
      e.preventDefault();
      megaMenu.classList.toggle("show");
      this.classList.toggle("active");
    });
  }, false);
  searchBtn.forEach(function(ele) {
    if (typeof ele !== "undefined" && ele !== null) {
      ele.addEventListener("click", searchToggle, false);
    }
  });
  mobsearh.addEventListener("click", searchToggle, false);

  function searchToggle(event) {
    event.preventDefault();
    body.classList.toggle("noscroll");
    search.classList.toggle("show");
    nav.classList.toggle("overflowfix");
  }
  document.addEventListener(
    "keyup",
    function(e) {
      if (search.classList.contains("show")) {
        document.addEventListener("keyup", escapeToClose, false);
      } else {
        document.removeEventListener("keyup", escapeToClose);
      }
    },
    false
  );

  function escapeToClose(event) {
    event = event || window.event;
    if (event.keyCode == 27 && search.classList.contains("show")) {
      body.classList.remove("noscroll");
      search.classList.remove("show");
      nav.classList.remove("overflowfix");
    }
  }
  close.addEventListener("click", function(e) {
    e.preventDefault();
    search.classList.remove("show");
    body.classList.remove("noscroll");
    nav.classList.remove("overflowfix");
  });
  if (chamgeFont) {
    chamgeFont.addEventListener("click", function(e) {
      e.preventDefault();
      article.classList.toggle("bigger");
    });
  }
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    navigator.userAgent.match(/Firefox/i)
  ) {
    mobsubmenu.forEach(function(meun) {
      meun.addEventListener(
        "click",
        function(e) {
          if (e.target.tagName.toLowerCase() !== "a") {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle("active");
            var Siblings = getSiblings(this);
            for (var i = 0; i < Siblings.length; i++) {
              if (Siblings[i].classList.contains("active")) {
                Siblings[i].classList.remove("active");
              }
            }
          }
        },
        false
      );
    });
  }
  //stiky video
  if (articleVideo) {
    var videoPlace = articleVideo.getBoundingClientRect().top;
    var startSticky = Math.floor(
      videoPlace + articleVideo.offsetHeight + window.pageYOffset
    );
  }
  window.onload = setTimeout(function() {
    var sliders = ["slider", "dateSlider", "slider1"];
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
  }, 0);

  var xmlhttp = new XMLHttpRequest(),
    current = "",
    previous = "";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      current = myObj.result.text;
      if (current != "") {
        if (current != previous) {
          breakingTxt.innerText = current;
          breakingNews.classList.add("show");
          previous = current;
        }
      } else {
        if (breakingNews.classList.contains("show")) {
          breakingNews.classList.remove("show");
        }
      }
    }
  };
  var __breakingnewsLink =
    typeof breakingnewsLink !== "undefined"
      ? breakingnewsLink
      : "https://feed.alarabiya.net/breakingNews/ar.json";
  xmlhttp.open("GET", __breakingnewsLink, true);
  xmlhttp.send();
  setInterval(function() {
    xmlhttp.open("GET", __breakingnewsLink, true);
    xmlhttp.send();
  }, 30000);

  /**Search Form submit***/
  var atag = document.querySelector(".search-icon");
  if (atag) {
    atag.addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("search-form").submit();
    });
  }
  /**Moving thumbnail**/
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var isMobile =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 &&
      navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 &&
      navigator.userAgent.match(/webOS/i))
      ? true
      : false;
  if (!isSafari && !isMobile) {
    var videoWrappers = document.querySelectorAll(".teaser-video") || "";
    if (videoWrappers.length > 0) {
      videoWrappers.forEach(function(videoWrapper) {
        var video = videoWrapper.querySelector("video");
        var stopPlayingInterval;
        videoWrapper.addEventListener("mouseenter", function(e) {
          if (stopPlayingInterval) {
            clearInterval(stopPlayingInterval);
          }
          var videoSrc = videoWrapper.dataset.video;
          video.src = videoSrc;
          video.play();
          video.muted = true;
          videoWrapper.classList.add("playing");
          stopPlayingInterval = setInterval(function() {
            videoWrapper.classList.remove("playing");
            video.pause();
          }, 3000);
        });
        videoWrapper.addEventListener("mouseleave", function(e) {
          video.pause();
          video.currentTime = 0;
          videoWrapper.classList.remove("playing");
          if (stopPlayingInterval) {
            clearInterval(stopPlayingInterval);
          }
        });
      });
    }
  }
  /**Moving thumbnail**/
  (function() {
    var closeBtn = document.querySelector(".main-streaming__close") || "";
    if (closeBtn != "") {
      closeBtn.addEventListener("click", function(e) {
        e.target.closest(".main-streaming").remove();
      });
    }
    var vidCaro = document.querySelector(".vid-caro") || "";
    if (vidCaro != "") {
      var indicators = vidCaro.querySelectorAll("li");
      indicators.forEach(function(ele) {
        ele.addEventListener("click", function(e) {
          var id = e.target.parentNode.getAttribute("for");
          //var vidSrc = e.target.parentNode.dataset.video;
          //console.log(id, vidSrc);
          var videoEle = document.getElementById(id);
          var vidSrc = videoEle.dataset.video;
          var videoTag = document.querySelector("[data-for=" + id + "] video");
          videoTag.src = vidSrc;
          var others = vidCaro.querySelectorAll("video");
          others.forEach(function(vid) {
            if (vid != videoTag) {
              vid.pause();
              vid.currentTime = 0;
            }
          });
        });
      });
    }
  })();
  (function() {
    var host = document.querySelector(".info_js_handle"),
      video = document.querySelector(".inpage-video-teaser_js video"),
      title = document.querySelector(".ttl_js");
    if (host) {
      host.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var videoURL = e.target.dataset.vidUrl,
          videoIMG = e.target.dataset.vidImg,
          videTitle = e.target.dataset.vidTitle,
          videoText = e.target.dataset.vidText;
        video.src = videoURL;
        video.setAttribute("poster", videoIMG);
        title.innerText = videTitle;
        var paragraph = document.querySelector(".info_js div");
        if (videoText) {
          paragraph.innerHTML = videoText;
        } else {
          paragraph.innerHTML = "";
        }
      });
    }
  })();
  (function() {
    try {
      var clickHandel = document.querySelectorAll(".hajj-lang a");
      var closeHandel = document.querySelectorAll(".close-lang-js");
      var langOverlay;
      clickHandel.forEach(function(ele) {
        ele.addEventListener("click", function(e) {
          e.preventDefault();
          langOverlay = document.querySelector(".language-overlay");
          if (langOverlay.classList.contains("hide")) {
            langOverlay.classList.remove("hide");
          }
        });
      });
      closeHandel.forEach(function(ele) {
        ele.addEventListener("click", function(e) {
          e.preventDefault();
          langOverlay = document.querySelector(".language-overlay");
          if (!langOverlay.classList.contains("hide")) {
            langOverlay.classList.add("hide");
            setCookie(hajjCooke, "close", 1);
          }
        });
      });
    } catch (e) {
      console.log(error);
    }
  })();
  (function() {
    try {
      var clickHandel = document.querySelector(".streaming-js-handle");
      clickHandel.addEventListener("click", function(e) {
        e.preventDefault();
        window.open("/live-stream", "live streaming", "width=1100,height=800");
        return false;
        console.log(e);
      });
    } catch (e) {}
  })();
  /** Latest news component **/
  function createEle(element, classname) {
    if (!classname) {
      return document.createElement(element);
    } else {
      var ele = document.createElement(element);
      ele.setAttribute("class", classname);
      return ele;
    }
  }

  function appendCh(parent, el) {
    return parent.appendChild(el);
  }

  function arraysCompare(ar1, ar2) {
    return (
      ar1.length === ar2.length &&
      ar1.sort().every(function(value, index) {
        return ObjectsCompare(value, ar2.sort()[index]);
      })
    );
  }

  function ObjectsCompare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  var previousData = [];
  //var latestNewsFeed = "https://feed.alarabiya.net/latestEvents/alhadath.json";
  //var latestNewsLimit = 6;
  function LatestNewsComponent() {
    var latestNewsHTMLAll = document.querySelectorAll(".latest-news-js");
    if (latestNewsHTMLAll.length > 0 && typeof latestNewsFeed !== "undefined") {
      var __latestNewsLimit =
        typeof latestNewsLimit == "undefined" ? 6 : latestNewsLimit;
      var xmlhttpLatestNews = new XMLHttpRequest();
      xmlhttpLatestNews.open("GET", latestNewsFeed, true);
      xmlhttpLatestNews.send();
      xmlhttpLatestNews.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var that = this;
          var myObj = JSON.parse(that.responseText);
          var news = myObj.latestEvents;
          if (!arraysCompare(news, previousData)) {
            previousData = news;
            latestNewsHTMLAll.forEach(function(latestNewsHTML) {
              var Ul = latestNewsHTML.querySelector("ul");
              Ul.innerHTML = "";
              for (var i = 0; i < __latestNewsLimit; i++) {
                var li = createEle("li"),
                  wrapperSpan = createEle("span"),
                  timeSpan = createEle("span", "time"),
                  firstSpan = createEle("span"),
                  secondSpan = createEle("span", "region"),
                  ttlSpan = createEle("span", "ttl");
                wrapperSpan.classList.add("latest-news__wrapper");
                firstSpan.innerText = news[i].creationDate.split("-")[1];
                secondSpan.innerText = "GMT";
                ttlSpan.innerText = news[i].text;
                appendCh(timeSpan, firstSpan);
                appendCh(timeSpan, secondSpan);
                appendCh(wrapperSpan, timeSpan);
                appendCh(wrapperSpan, ttlSpan);
                appendCh(li, wrapperSpan);
                appendCh(Ul, li);
              }
            });
          }
        }
      };
    }
  }
  if (typeof latestNewsFeed != "undefined") {
    LatestNewsComponent();
    setInterval(function() {
      LatestNewsComponent();
    }, 30000);
  }
  /** Latest news component **/
})();

function iframeGenerator() {
  var elements =
    document.querySelectorAll(".ifram-data").length > 0
      ? document.querySelectorAll(".ifram-data")
      : null;
  if (elements != null) {
    elements.forEach(function(element) {
      var iframeDom = document.createElement("iframe");
      iframeDom.frameBorder = element.dataset.frameborder;
      iframeDom.src = element.dataset.src;
      iframeDom.scrolling = element.dataset.scrolling;
      iframeDom.title = element.dataset.title;
      iframeDom.width = element.dataset.width;
      iframeDom.height = element.dataset.height;
      iframeDom.id = element.dataset.id;
      element.parentNode.insertBefore(iframeDom, element.nextElementSibling);
    });
  }
}

//arr varilble to save the called slider before
var arr = [];

function isVisible(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var iselVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  if (iselVisible) return true;
  return false;
}

function getSiblings(elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
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
    childrenPos = elem.querySelector("#last").getBoundingClientRect(),
    relativePos = {};
  (relativePos.top = childrenPos.top - parentPos.top),
    (relativePos.right = childrenPos.right - parentPos.right),
    (relativePos.bottom = childrenPos.bottom - parentPos.bottom),
    (relativePos.left = childrenPos.left - parentPos.left);
  if (Math.abs(relativePos.right) <= parentPos.width) {
    return relativePos.left;
  }
}

function sliderStep(elem, step) {
  elem.style.transform = "translate3d(" + step + "px, 0px, 0px)";
  elem.style.webkitTransform = "translate3d(" + step + "px, 0px, 0px)";
  elem.style.MozTransform = "translate3d(" + step + "px, 0px, 0px)";
  elem.style.msTransform = "translate3d(" + step + "px, 0px, 0px)";
  elem.setAttribute("step", step);
}

function transitionEndEventName() {
  var i,
    undefined,
    el = document.createElement("div"),
    transitions = {
      transition: "transitionend",
      OTransition: "otransitionend", // oTransitionEnd in very old Opera
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
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
  var slider = elem.querySelector(".slider"),
    ss = slider.children,
    ff = slider.querySelector(".active"),
    initalActiveElIndex = Array.prototype.indexOf.call(ss, ff),
    startingPoint = 0,
    lastmove = 0,
    next = elem.querySelector("#next"),
    prev = elem.querySelector("#prev"),
    last = elem.querySelector("#last");
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

    slider.addEventListener("touchstart", dd, false);

    slider.addEventListener(
      "touchmove",
      function(e) {
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
      },
      false
    );

    slider.addEventListener(
      "touchend",
      function(e) {
        //check if last visisble
        var uu = checkVisible(elem.id);
        var nextobj = startingPoint + ss[current].offsetWidth;
        //var vis= true;

        if (
          swipe_det.eX - min_x > swipe_det.sX ||
          swipe_det.eX + min_x < swipe_det.sX
        ) {
          if (swipe_det.eX > swipe_det.sX) {
            if (!uu) {
              if (current < ss.length - 1) {
                startingPoint = nextobj;
                sliderStep(slider, nextobj);
                current += 1;
              }
            } else {
              slider.removeEventListener("touchMove", dd);
              var laststep =
                parseInt(slider.getAttribute("step")) +
                Math.abs(last.getBoundingClientRect().left);
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
      },
      false
    );
    next.addEventListener(
      "click",
      function(e) {
        if (elem.querySelector("#prev").disabled === true) {
          elem.querySelector("#prev").disabled = false;
        }

        //get the last element position	(recentleft)
        var recentleft = last.getBoundingClientRect();
        var nextobj = startingPoint + ss[current].offsetWidth;
        startingPoint = nextobj;
        current += 1;
        var uu = checkVisible(elem.id);
        if (uu) {
          elem.querySelector("#next").disabled = true;
        } else {
          var transitionEnd = transitionEndEventName();
          slider.addEventListener(transitionEnd, function() {
            if (checkVisible(elem.id)) {
              var finalmove = nextobj + Math.abs(checkVisible(elem.id));
              sliderStep(slider, finalmove);
              elem.querySelector("#next").disabled = true;
            }
          });

          sliderStep(slider, nextobj);
          elem.querySelector("#next").disabled = true;
          setTimeout(function() {
            elem.querySelector("#next").disabled = false;
          }, 250);
        }
      },
      false
    );
    prev.addEventListener(
      "click",
      function(e) {
        current -= 1;
        if (current > 0) {
          if (elem.querySelector("#next").disabled === true) {
            elem.querySelector("#next").disabled = false;
          }

          var prevobj = startingPoint - ss[current].offsetWidth;
          sliderStep(slider, prevobj);
          startingPoint = prevobj;
          elem.querySelector("#prev").disabled = true;
          setTimeout(function() {
            elem.querySelector("#prev").disabled = false;
          }, 250);
        } else if (current === 0) {
          prevobj = startingPoint - ss[current].offsetWidth;
          sliderStep(slider, prevobj);
          startingPoint = prevobj;
          elem.querySelector("#prev").disabled = true;
        }
      },
      false
    );
    //if no active
  } else {
    console.log("please set active");
  }
}

$(document).ready(function() {
  $(".font-resize a, .prnt a").removeAttr("href");
  // Tabs
  $(".tabs-menu a").click(function(event) {
    event.preventDefault();
    $(this)
      .parent()
      .addClass("current");
    $(this)
      .parent()
      .siblings()
      .removeClass("current");
    var tab = $(this).attr("href");
    $(this)
      .parent()
      .parent()
      .siblings(".tab")
      .children()
      .not(tab)
      .css("display", "none");
    $(tab).fadeIn();
  });

  // Side Showing Now Box
  $(".aa-live .close-btn").click(function() {
    $(".aa-live").addClass("hide-live");
  });
  $(".live-open").click(function() {
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
  duration: 300 // Animation duration in milliseconds.
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
  carousel.style.top = begin + "px";
  var animateInterval = window.setInterval(function() {
    var t = Date.now() - startTime;
    if (t >= duration) {
      window.clearInterval(animateInterval);
      finalTask();
      return;
    }
    t /= duration / 2;
    var top =
      begin +
      (t < 1
        ? (change / 2) * Math.pow(t, 3)
        : (change / 2) * (Math.pow(t - 2, 3) + 2));
    carousel.style.top = top + "px";
  }, 1000 / 60);
}
window.onload = function() {
  try {
    var carousel = (Carousel.carousel = document.getElementById(
        "ver-carousel"
      )),
      listItems = carousel.getElementsByTagName("li"),
      numItems = listItems.length,
      itemWidth = Carousel.width,
      rowHeight = listItems.height;
    carousel.style.width = itemWidth + "px";
    for (var i = 0; i < numItems; ++i) {
      var list = listItems[i];
    }
    Carousel.rowHeight = carousel.getElementsByTagName("li")[0].offsetHeight;
    carousel.style.visibility = "visible";
    var wrapper = (Carousel.wrapper = document.createElement("div"));
    wrapper.id = "carouselWrapper";
    wrapper.style.width = carousel.offsetWidth + "px";
    wrapper.style.height = carousel.offsetHeight + "px";
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);
    var prevButton = document.getElementById("caro-prev"),
      nextButton = document.getElementById("caro-next");
    prevButton.onclick = function() {
      prevButton.disabled = nextButton.disabled = true;
      rotateForward();
      animate(-Carousel.rowHeight, 0, function() {
        carousel.style.top = "0";
        prevButton.disabled = nextButton.disabled = false;
      });
    };
    nextButton.onclick = function() {
      prevButton.disabled = nextButton.disabled = true;
      animate(0, -Carousel.rowHeight, function() {
        rotateBackward();
        carousel.style.top = "0";
        prevButton.disabled = nextButton.disabled = false;
      });
    };
  } catch (err) {
    console.log("error in windowLoad" + err.message);
  }

  try {
    iframeGenerator();
    iFrameResize({
      log: false,
      checkOrigin: false
    });
  } catch (err) {
    console.log("error in initalizing Iframes" + err.message);
  }
};

///////////////Hajj  Local Overlay///////////////////////////
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var hajjCooke = "hajjLanguage";

function checkHajjLanguage() {
  var hajjoverlay = document.querySelector(".language-overlay");
  if (hajjoverlay !== null) {
    var hajjParamLocal = getParameterByName(hajjCooke);
    if (hajjParamLocal == null || hajjParamLocal.length == 0) {
      var hcookie = getCookie(hajjCooke);
      if (hcookie == null || hcookie === "undefined") {
        hajjoverlay.classList.remove("hide");
      }
    } else {
      setCookie(hajjCooke, hajjParamLocal, 365);
    }
  }
}

function setHajjLanguage(hlocal) {
  setCookie(hajjCooke, hlocal, 365);
}

checkHajjLanguage();

///////////////////////////////////////////

//aswaq Search For companies

function iniSearchAutoComplete() {
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu(
        "option",
        "items",
        "> :not(.ui-autocomplete-category)"
      );
    },
    _renderMenu: function(ul, items) {
      var that = this,
        currentCategory = "";
      ul.append('<li class="search_news"><a>البحث في الأخبار</a></li>');
      $.each(items, function(index, item) {
        var li;
        if (item.category != currentCategory) {
          ul.append(
            "<li class='ui-autocomplete-category'>" + item.category + "</li>"
          );
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
      var regex = new RegExp(request.term, "i");
      if (xhr) {
        xhr.abort();
      }
      xhr = $.ajax({
        url:
          "/.resources/aa-templating-lm/webresources/static/aswaq/market-data.json",
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
            resArr = [
              {
                label: "",
                category: "",
                url: ""
              }
            ];
          }
          response(resArr);
        }
      });
    },
    minlength: 0,
    select: function(event, ui) {
      console.log("select");
      if (typeof ui.item === "undefined") {
        var searchVal = $(".section-aswaq .search-input").val();
        window.location.href = seartchPageLink + "?lang=ar&q=" + searchVal;
      } else {
        window.location.href = ui.item.url;
      }
    }
  });
}
//END iniSearch AutoComplete
$(document).ready(function() {
  // init Search for aswaq companies
  try {
    if ($(".section-aswaq  .search-input").length) {
      iniSearchAutoComplete();
      loadSearch();
    }
  } catch (err) {
    console.log(err.message);
  }
});
// Fixed Takeover on Scroll
$(document).ready(function() {
  $(window).scroll(function() {
    var distanceFromTop = $(document).scrollTop();
    if (distanceFromTop >= $("header.sticky").height()) {
      $(".takeover_outer").addClass("fixed");
      $(".takeover_outer").css("top", 64 + "px");
    } else {
      $(".takeover_outer").removeClass("fixed");
      $(".takeover_outer").css("top", 262 + "px");
      $(".section-page .takeover_outer").css("top", 325 + "px");
    }
  });
});
var isMobile =
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i) ||
  (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 &&
    navigator.userAgent.match(/Android/i)) ||
  (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 &&
    navigator.userAgent.match(/webOS/i))
    ? true
    : false;

var debounce = function debounce(lazyImages) {
  return setTimeout(function() {
    var scrollTop = window.pageYOffset;
    lazyImages.forEach(function(img) {
      if (img.offsetTop < window.innerHeight + scrollTop) {
        var dataSrc = isMobile ? img.dataset.srcMobile : img.dataset.srcDesktop;
        img.src = dataSrc;
        img.classList.remove("lazy");
      }
    });
  }, 20);
};
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = document.querySelectorAll("img.lazy");
  var lazyloadingTimeout;

  function lazyload() {
    if (lazyloadingTimeout) {
      clearTimeout(lazyloadingTimeout);
    }
    lazyloadingTimeout = debounce(lazyImages);
  }
  lazyImages.forEach(function(image) {
    if (isVisible(image)) {
      lazyload();
    }
  });
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
  if (lazyImages.length == 0) {
    document.removeEventListener("scroll", lazyload);
    window.removeEventListener("resize", lazyload);
    window.removeEventListener("orientationChange", lazyload);
  }
});

// Article Timeline
$(document).ready(function() {
  // Timeline nav active class
  $("ul.tm-nav li").on("click", function() {
    $(this)
      .parent()
      .find("li.active")
      .removeClass("active");
    $(this).addClass("active");
  });
  // Timeline smooth scrolling
  $(".tm-sequence ul li a").click(function(e) {
    e.preventDefault();
    var target = $($(this).attr("href"));
    if (target.length) {
      var scrollTo = target.offset().top;
      $("body, html").animate(
        {
          scrollTop: scrollTo - 90 + "px"
        },
        600
      );
    }
  });
  // Timeline sticky nav
  if ($(".tm-sequence").length > 0) {
    var $window = $(window);
    var $sidebar = $(".tm-sequence");
    var $sidebarHeight = $sidebar.innerHeight();
    var $footerOffsetTop = $("footer").offset().top;
    var $sidebarOffset = $sidebar.offset();

    $window.scroll(function() {
      if ($window.scrollTop() > $sidebarOffset.top) {
        $sidebar.addClass("fixed");
      } else {
        $sidebar.removeClass("fixed");
      }
      if ($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
        $sidebar.css({
          top: -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)
        });
      } else {
        $sidebar.css({
          top: "80"
        });
      }
    });
  }
});
