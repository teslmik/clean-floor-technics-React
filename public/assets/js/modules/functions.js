// Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
  //Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWP";
  }
  //Добавление класса webp или no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

isWebp();

/* ================================================================== */

/* Адаптив картинок */

export function ibg() {

  let ibg = document.querySelectorAll(".ibg");
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();

/* ================================================================== */
/* Слайдер Swiper */

// import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

// Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

// export const swiper = new Swiper('.swiper', {

//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },

//   direction: 'horizontal',
//   loop: true,
//   effect: 'fade',
//   grabCursor: true,

//   fadeEffect: { crossFade: true },

//   pagination: {
//     el: '.swiper-pagination',
//     type: 'progressbar',
//     clickable: true,
//   },

//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });

/* ================================================================== */