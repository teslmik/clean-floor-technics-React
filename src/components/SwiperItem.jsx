import React from 'react';

import { ibg } from '../js/modules/functions';

const SwiperItem = ({ title, article, imageArr }) => {
  const [toggleState, setToggleState] = React.useState(0);

  React.useEffect(() => {
    ibg();
  }, [toggleState]);

  return (
    <div className="fullitem__img-block">
      <div className="img-block__img ibg">
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
