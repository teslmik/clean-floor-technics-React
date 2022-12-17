export const mobileHeight = () => {
  let vh = window.innerHeight * 0.01;

  return document.documentElement.style.setProperty('--vh', `${vh}px`);
}
