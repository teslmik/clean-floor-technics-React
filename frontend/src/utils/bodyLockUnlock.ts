// Робота з блокування body та padding-right

const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

export const bodyLock = () => {

  const wrapper = document.querySelector('.wrapper');
  
  const lockPaddingValue = window.innerWidth - (wrapper as HTMLDivElement).offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      (el as HTMLDivElement).style.paddingRight = lockPaddingValue;
      (el as HTMLDivElement).style.transition = 'none';
    }
  }

  (body as HTMLBodyElement).style.paddingRight = lockPaddingValue;
  (body as HTMLBodyElement).style.overflowY = 'hidden';
  (body as HTMLBodyElement).classList.add('lockPadding');
}

export const bodyUnlock = () => {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        (el as HTMLDivElement).style.paddingRight = '0px';
        setTimeout(function () {
          (el as HTMLDivElement).style.transition = '';
        }, 0);
      }
    }
    (body as HTMLBodyElement).style.paddingRight = '0px';
    (body as HTMLBodyElement).style.overflowY = 'visible';
    (body as HTMLBodyElement).classList.remove('lockPadding');
  }, 0);
}