import React from "react";

import { euroToHrivna, ibg } from "../utils";

interface ISwiperItem {
  imageArr: string[];
  label?: {
    promo?: boolean;
    popular?: boolean;
    new?: boolean;
  };
  oldPrice?: number | null;
  price?: number;
}

export const SwiperItem: React.FC<ISwiperItem> = ({
  imageArr = [],
  label,
  oldPrice,
  price,
}) => {
  const [toggleState, setToggleState] = React.useState(0);

  React.useEffect(() => {
    ibg();
  }, [toggleState]);

  return (
    <div className="fullitem__img-block">
      <div className="img-block__img ibg">
        {toggleState === 0 && (
          <div className="img-block__labels labels">
            {label?.promo && (
              <div className="labels__item _promo">
                <div className="label-content">Акція</div>
              </div>
            )}
            {label?.popular && (
              <div className="labels__item _popular">
                <p className="label-content">Хіт</p>
              </div>
            )}
            {oldPrice && Number(oldPrice) > euroToHrivna(price || 0) && (
              <div className="labels__item _discount">
                <div className="label-content">
                  -
                  {Math.round(
                    (100 * (Number(oldPrice) - euroToHrivna(price || 0))) /
                      Number(oldPrice),
                  )}
                  %
                </div>
              </div>
            )}
            {label?.new && (
              <div className="labels__item _new">
                <div className="label-content">Новинка</div>
              </div>
            )}
          </div>
        )}
        <img src={imageArr[toggleState]} alt={imageArr[toggleState]} />
      </div>
      <div className="img-block__tabs">
        {imageArr.map((url, i) => (
          <div
            key={url}
            className={
              toggleState === i ? "img-block__tab active" : "img-block__tab"
            }
            onClick={() => setToggleState(i)}
            role="button"
            tabIndex={0}
          >
            <img src={url} alt={url} />
          </div>
        ))}
      </div>
    </div>
  );
};
