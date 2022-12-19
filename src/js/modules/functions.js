export const menuListObj = {
  catalog: 'Каталог',
  about: 'Про нас',
  pay_and_delivery: 'Оплата та доставка',
  return: 'Обмін та повернення',
  contacts: 'Контактна інформація',
  blog: 'Блог',
  services: 'Послуги'
};

export const categoriesList = [
  { name: 'scrubber', value: 'Підлогомийні машини' },
  { name: 'one-disk-machines', value: 'Oднодискові машини' },
  { name: 'vacuum-cleaner', value: 'Пилососи' },
  { name: 'extractor', value: 'Екстрактори' },
  { name: 'sweeping-machines', value: 'Підмітальні машини' },
  { name: 'air-fan', value: 'Сушильні вентилятори' },
  { name: 'accessories', value: 'Комплектуючі' },
];

export const filterList = [
  { name: '_promo', value: 'Акція' },
  { name: '_popular', value: 'Хіт' },
  { name: '_new', value: 'Новинка' },
];

export const tabsPromo = [
  { name: '_popular', value: 'Хіти' },
  { name: 'oldPrice', value: 'Розпродаж' },
  { name: '_new', value: 'Новинки' },
];

export const tabsItem = ['Доставка', 'Оплата', 'Гарантія'];

export const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

// Робота з блокування body та padding-right

const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

export const bodyLock = () => {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
      el.style.transition = 'none';
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lockPadding');
}

export const bodyUnlock = () => {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
        setTimeout(function () {
          el.style.transition = '';
        }, 0);
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lockPadding');
  }, 0);
}

// Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
  //Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src = "data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWP";
  }
  //Добавление класса webp или no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

/* Адаптив картинок */
export const ibg = () => {
  let ibg = document.querySelectorAll('.ibg');
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage =
        'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
};