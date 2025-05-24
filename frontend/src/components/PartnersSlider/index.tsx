import React from "react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

// Мокові дані для демонстрації
const mockPartners = [
  {
    _id: "1",
    name: "MAJO Юр Академія",
    logo: "https://static.tildacdn.one/tild3966-3964-4364-b965-313563376130/__1_5-1.png",
    url: "https://majo.ua",
  },
  {
    _id: "2",
    name: "Таврія В сади перемоги",
    logo: "https://allretail.ua/static/files/originals/3/23/a561111d8d7e77f95c61938d4fac0233.svg",
    url: "https://tavria-sad.com.ua",
  },
  {
    _id: "3",
    name: "НЕМО Одеса",
    logo: "https://nemo.ua/images/site/logo.png",
    url: "https://nemo.ua",
  },
  {
    _id: "4",
    name: "Mountain РЕЗИДЕНС БУКОВЕЛЬ",
    logo: "https://www.promo.mountain-residence.com/images/Logo.svg",
    url: "https://mountainresort.com.ua",
  },
  {
    _id: "5",
    name: "СПА ТРИ СТИХІЇ ЛЬВІВ",
    logo: "image.png",
    url: "https://spa3elements.com.ua",
  },
  {
    _id: "6",
    name: "VW Одеса",
    logo: "https://w7.pngwing.com/pngs/884/447/png-transparent-volkswagen-logo-volkswagen-group-car-logo-volkswagen-car-logo-brand-emblem-trademark-candle.png",
    url: "https://www.vw.ua",
  },
  {
    _id: "7",
    name: "Завод Немирофф",
    logo: "https://images.seeklogo.com/logo-png/9/3/nemiroff-vodka-logo-png_seeklogo-98091.png",
    url: "https://nemiroff.com",
  },
  {
    _id: "8",
    name: "Стадіон Чорноморець",
    logo: "https://upload.wikimedia.org/wikipedia/ru/7/74/%D0%AD%D0%BC%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0_%D1%81%D1%82%D0%B0%D0%B4%D0%B8%D0%BE%D0%BD%D0%B0_%D0%A7%D0%B5%D1%80%D0%BD%D0%BE%D0%BC%D0%BE%D1%80%D0%B5%D1%86_%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%B0.jpg",
    url: "https://chornomorets.odessa.ua",
  },
];

export const PartnersSlider: React.FC = () => {
  return (
    <section className="partners">
      <div className="partners__container">
        <h2 className="partners__title">Наші партнери</h2>
        <div className="partners__slider">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={8}
            slidesPerView={6}
            navigation
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 4,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 6,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 8,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 8,
              },
            }}
          >
            {mockPartners.map((partner) => (
              <SwiperSlide key={partner._id}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partners__item"
                >
                  <img src={partner.logo} alt={partner.name} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
