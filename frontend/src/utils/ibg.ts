/* Адаптив картинок */
export const ibg = () => {
  let ibg = document.querySelectorAll<HTMLElement>('.ibg');
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i] && ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + (ibg[i] as any).querySelector('img').getAttribute('src') + ')';
    }
  }
};