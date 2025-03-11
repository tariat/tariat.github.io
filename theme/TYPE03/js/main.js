$("document").ready(function() {
  var swiperAnimation = new SwiperAnimation();
  var mainswiper = new Swiper('.swiper_visual', {
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    on: {
      slideChange: function() {},
      init: function() {
        swiperAnimation.init(this).animate();
      },
      slideChange: function() {
        swiperAnimation.init(this).animate();
      }
    },

    navigation: {
        nextEl: ".swiper-visual-next",
        prevEl: ".swiper-visual-prev",
      },

  });
});


$("document").ready(function() {
  var swiper = new Swiper('.products_Swiper', {
    slidesPerView: 2,
    // freeMode: true,
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
      },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      }
    }
  })
});
