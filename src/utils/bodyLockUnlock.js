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
  body.style.overflowY = 'hidden';
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
    body.style.overflowY = 'visible';
    body.classList.remove('lockPadding');
  }, 0);
}