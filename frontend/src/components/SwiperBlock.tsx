import React from "react";
import { Autoplay, EffectFade, Lazy, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import client from "@cms/lib/sanitiClient";
import "swiper/css/bundle";

export const SwiperBlock: React.FC = () => {
  const [images, setImages] = React.useState<
    { url: string; alt: string; id: string }[]
  >([]);

  const lazyOptions = {
    enabled: true,
    onTransitionStart: false,
    loadPrevNext: true,
  };

  React.useEffect(() => {
    const fetchImages = async () => {
      const data = await client.fetch(`*[_type == "config"][0] {
        mainSliderImages[]{
          "url": image.asset->url,
          "alt": altText,
          "id": _key
        }
      }`);

      if (data.mainSliderImages) setImages(data.mainSliderImages);
    };

    fetchImages();
  }, []);

  return (
    <Swiper
      tag={"section"}
      modules={[Navigation, Pagination, EffectFade, Autoplay, Lazy]}
      autoplay={{ delay: 4000 }}
      loop={true}
      effect="fade"
      pagination={{ type: "progressbar" }}
      navigation
      preloadImages={false}
      lazy={lazyOptions}
      watchSlidesProgress={true}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <div className="swiper__img">
            <img
              data-src={image.url}
              src={
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              }
              alt={image.alt}
              className="swiper-lazy"
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
