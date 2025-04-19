export const menuListObj = {
  catalog: "Каталог",
  about: "Про нас",
  pay_and_delivery: "Оплата та доставка",
  return: "Обмін та повернення",
  contacts: "Контактна інформація",
  blog: "Блог",
  services: "Послуги",
};

export const menuListArr = [
  { link: "catalog", name: "Каталог" },
  { link: "about", name: "Про нас" },
  { link: "pay_and_delivery", name: "Оплата та доставка" },
  { link: "return", name: "Обмін та повернення" },
  { link: "contacts", name: "Контактна інформація" },
  { link: "blog", name: "Блог" },
  { link: "services", name: "Послуги" },
  { link: "price_list", name: "PDF-каталог" },
];

export const categoriesList = [
  { name: "scrubber", value: "Підлогомийні машини" },
  { name: "rotary", value: "Роторні машини" },
  { name: "vacuum", value: "Пилососи" },
  { name: "extractor", value: "Екстрактори" },
  { name: "sweeping", value: "Підмітальні машини" },
  { name: "fan", value: "Сушильні вентилятори" },
  { name: "accessories", value: "Комплектуючі" },
];

export const filterList = [
  { name: "availability", value: "У навності" },
  { name: "promo", value: "Акція" },
  { name: "popular", value: "Хіт" },
  { name: "new", value: "Новинка" },
];

export const tabsPromo = [
  { name: "availability" as const, value: "У навності" },
  { name: "popular" as const, value: "Хіти" },
  { name: "new" as const, value: "Новинки" },
];

export const tabsItem = ["Доставка", "Оплата", "Гарантія"];

export const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};
