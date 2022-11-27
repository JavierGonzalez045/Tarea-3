const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector("#hamburger-btn"); //#menu-icon
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("open");
};

// HAMBURGER MENU

$(".menu-navigate").on("click", function (e) {
  if ($(".hamburger-menu").hasClass("active")) {
    $("body").toggleClass("overflow");
    $(".hamburger-menu").toggleClass("active");
    $(".navbar").toggleClass("open");
    $(".menu-container").toggleClass("active");
    $(".menu-container").css("transition-delay", "1s");
    $(".menu-navigation .layers").css("transition-delay", "0s");
    $(".navigation-menu.active .inner blockquote").css(
      "transition-delay",
      "10s"
    );
    $(".navigation-menu .bg-layers span").css("transition-delay", "0s");
  }
});

$(".hamburger-menu").on("click", function (e) {
  if (!$(".hamburger-menu").hasClass("active")) {
    $("body").toggleClass("overflow");
    $(".menu-container").toggleClass("active");
    $(".menu-navigation").removeClass("active");
    $(".menu-container").css("transition-delay", "0s");
    $(".menu-navigation .layers").css("transition-delay", "1s");
    $(".navigation-menu .bg-layers span").css("transition-delay", "0.3s");
  } else {
    $("body").toggleClass("overflow");
    $(".hamburger-menu").toggleClass("");
    $(".menu-container").toggleClass("active");
    $(".menu-container").css("transition-delay", "1s");
    $(".menu-navigation .layers").css("transition-delay", "0s");
    $(".navigation-menu.active .inner blockquote").css(
      "transition-delay",
      "10s"
    );
    $(".navigation-menu .bg-layers span").css("transition-delay", "0s");
  }
  $(this).toggleClass("active");
});

// $(".hamburger-menu").on("click", function (e) {
//   if ($(".menu-navigation").hasClass("active")) {
//     $("body").toggleClass("overflow");
//     $(".menu-container").toggleClass("active");
//     $(".menu-navigation").removeClass("active");
//     $(".menu-container").css("transition-delay", "0s");
//     $(".menu-navigation .layers").css("transition-delay", "1s");
//     $(".navigation-menu .bg-layers span").css("transition-delay", "0.3s");
//   } else {
//     $("body").toggleClass("overflow");
//     $(".menu-navigation").toggleClass("active");
//     $(".menu-container").toggleClass("active");
//     $(".menu-container").css("transition-delay", "1s");
//     $(".menu-navigation .layers").css("transition-delay", "0s");
//     $(".navigation-menu.active .inner blockquote").css(
//       "transition-delay",
//       "10s"
//     );
//     $(".navigation-menu .bg-layers span").css("transition-delay", "0s");
//   }
//   $(this).toggleClass("active");
// });
