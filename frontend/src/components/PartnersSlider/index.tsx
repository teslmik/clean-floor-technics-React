import React from "react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import client from "@cms/lib/sanitiClient";

type TPartner = {
  id: string;
  image: string;
  altText: string;
  url: string;
};

export const PartnersSlider: React.FC = () => {
  const [partners, setPartners] = React.useState<TPartner[]>([]);

  React.useEffect(() => {
    const fetchImages = async () => {
      const data = await client.fetch(`*[_type == "config"][0] {
        partnerSlider[]{
          "image": image.asset->url,
          "url": url,
          "alt": altText,
          "id": _key
        }
      }`);

      if (data.partnerSlider) setPartners(data.partnerSlider);
    };

    fetchImages();
  }, []);

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
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partners__item"
                >
                  <img src={partner.image} alt={partner.altText} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
