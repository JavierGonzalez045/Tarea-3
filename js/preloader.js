jQuery(document).ready(function ($) {
  (function ($) {
    $(document).ready(function () {
      "use strict";

      // MAGNET EFFECT
      document.addEventListener("mousemove", function (e) {
        magnetize(".circle", e);
      });

      function magnetize(el, e) {
        var mX = e.pageX,
          mY = e.pageY;
        var items = document.querySelectorAll(el);

        [].forEach.call(items, function (item) {
          var customDist = item.getAttribute("dist") * 20 || 30;
          var centerX = item.offsetLeft + item.clientWidth / 2;
          var centerY = item.offsetTop + item.clientHeight / 2;

          var deltaX = Math.floor(centerX - mX) * -0.45;
          var deltaY = Math.floor(centerY - mY) * -0.45;

          var distance = calculateDistance(item, mX, mY);

          if (distance < customDist) {
            TweenMax.to(item, 0.3, {
              y: deltaY,
              x: deltaX,
              scale: 1,
            });
            item.classList.add("magnet");
          } else {
            TweenMax.to(item, 0.45, {
              y: 0,
              x: 0,
              scale: 1,
            });
            item.classList.remove("magnet");
          }
        });
      }

      function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(
          Math.sqrt(
            Math.pow(mouseX - (elem.offsetLeft + elem.clientWidth / 2), 2) +
              Math.pow(mouseY - (elem.offsetTop + elem.clientHeight / 2), 2)
          )
        );
      }

      // HAMBURGER SOUND
      $("#hamburger-btn").on("click", function () {
        var obj = document.createElement("audio");
        obj.src = "audio/link.mp3";
        obj.play();
      });

      // COUNTER
      $(document).scroll(function () {
        $(".odometer").each(function () {
          var parent_section_postion = $(this).closest("section").position();
          var parent_section_top = parent_section_postion.top;
          if ($(document).scrollTop() > parent_section_top - 300) {
            if ($(this).data("status") == "yes") {
              $(this).html($(this).data("count"));
              $(this).data("status", "no");
            }
          }
        });
      });

      // PAGE TRANSITION
      $("body a").on("click", function (e) {
        var target = $(this).attr("target");
        var fancybox = $(this).data("fancybox");
        var url = this.getAttribute("href");
        if (
          target != "_blank" &&
          typeof fancybox == "undefined" &&
          url.indexOf("#") < 0
        ) {
          e.preventDefault();
          var url = this.getAttribute("href");
          if (url.indexOf("#") != -1) {
            var hash = url.substring(url.indexOf("#"));

            if ($("body " + hash).length != 0) {
              $(".page-transition").removeClass("active");
            }
          } else {
            $(".page-transition").toggleClass("active");
            setTimeout(function () {
              window.location = url;
            }, 1300);
          }
        }
      });
    });
    // END JQUERY

    // PRELOADER
    var width = 100,
      perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      // time = parseInt((EstimatedTime / 1000) % 60, 10) * 100;
      // time = parseInt((EstimatedTime / 1) % 1, 1) * 1;
      // time = parseInt((EstimatedTime / 100) % 60, 10) * 70;
      //time = parseInt((EstimatedTime / 1000) % 60, 10) * 100000000;
      time = parseInt((EstimatedTime / 1000) % 60, 10) * 40;

    var PercentageID = $("#percentage"),
      start = 0,
      end = 100,
      durataion = time;
    animateValue(PercentageID, start, end, durataion);

    function animateValue(id, start, end, duration) {
      var range = end - start,
        current = start,
        increment = end > start ? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);

      var timer = setInterval(function () {
        current += increment;
        $(obj).text(current);
        //obj.innerHTML = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

    setInterval(function () {
      $(".page-loaded").addClass("header-ready");
    }, 3500);

    setInterval(function () {
      $("body").addClass("page-loaded");
    }, time);

    // WOW ANIMATION
    wow = new WOW({
      animateClass: "animated",
      offset: 100,
    });
    wow.init();

    // MENU SCROLL
    const el = document.querySelector(".main-menu");

    // Variables ~ Widths
    let elWidth = el.offsetWidth;
    let windowWidth = window.innerWidth;

    // Variables ~ Mouse
    let mouseX = 0;
    let prevMouseX = 0;

    // Target: value we want to animate to
    let skewTarget = 0;
    let translateTarget = 0;

    // WithEasing: value we use to animate
    let skewWithEasing = 0;
    let translateWithEasing = 0;

    // EasingFactor: determines how quick the animation/interpolation goes
    let skewEasingFactor = 0.1;
    let translateEasingFactor = 0.05;

    // Events
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleWindowResize);

    // Functions
    function handleMouseMove(e) {
      mouseX = e.pageX;
    }

    function handleWindowResize(e) {
      elWidth = el.offsetWidth;
      windowWidth = window.innerWidth;
    }

    function lerp(start, end, factor) {
      return (1 - factor) * start + factor * end;
    }

    function animateMe() {
      // Get difference between current and previous mouse position
      skewTarget = mouseX - prevMouseX;
      prevMouseX = mouseX;

      // Calc how much we need to translate our el
      translateTarget = ((elWidth - windowWidth) / windowWidth) * mouseX * -1;

      // Ease between start and target values (skew)
      skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);

      // Limit our skew to a range of 75 degrees so it doesn't "over-skew"
      skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -25), 25);

      // Ease between start and target values (translate)
      translateWithEasing = lerp(
        translateWithEasing,
        translateTarget,
        translateEasingFactor
      );

      el.style.transform = `
      translateX(${translateWithEasing}px)
      skewX(${skewWithEasing}deg)
    `;

      // RAF
      window.requestAnimationFrame(animateMe);
    }

    window.requestAnimationFrame(animateMe);
  })(jQuery);
});
