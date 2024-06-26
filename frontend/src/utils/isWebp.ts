// Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
  //Проверка поддержки webp
  function testWebP(callback: (el: boolean) => void) {
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