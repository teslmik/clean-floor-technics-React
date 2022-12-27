import React from 'react';

import { ibg } from '../js/modules/functions';
import { euroToHrivna } from '../utils/euroToHrivna';

const SwiperItem = ({ title, article, imageArr, label, oldPrice, price }) => {
  const [toggleState, setToggleState] = React.useState(0);

  React.useEffect(() => {
    ibg();
  }, [toggleState]);

  return (
    <div className="fullitem__img-block">
      <div className="img-block__img ibg">
        {toggleState === 0 && (
          <div className="img-block__labels labels">
            {label._promo && (
              <div className="labels__item _promo">
                <div className="label-content">Акція</div>
              </div>
            )}
            {label._popular && (
              <div className="labels__item _popular">
                <p className="label-content">Хіт</p>
              </div>
            )}
            {oldPrice !== '' ? (
              <div className="labels__item _discount">
                <div className="label-content">
                  -{Math.round((100 * (oldPrice - euroToHrivna(price))) / oldPrice)}%
                </div>
              </div>
            ) : (
              ''
            )}
            {label._new && (
              <div className="labels__item _new">
                <div className="label-content">Новинка</div>
              </div>
            )}
          </div>
        )}
        <img src={`/assets/img/products/${article}/${imageArr[toggleState]}`} alt={title} />
      </div>
      <div className="img-block__tabs">
        {imageArr.map((image, i) => (
          <div
            key={image[i]}
            className={toggleState === i ? 'img-block__tab active' : 'img-block__tab'}
            onClick={() => setToggleState(i)}>
            <img src={`/assets/img/products/${article}/${image}`} alt={title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperItem;
