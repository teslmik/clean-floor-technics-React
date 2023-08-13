import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../hook/useGlobalContext';
import { cartSelector } from '../../redux/cart/selectors';
import { addToCart } from '../../redux/cart/slice';
import { ICartItem } from '../../redux/cart/types';
import { IProductItem } from '../../redux/products/types';
import { euroToHrivna, ibg } from '../../utils';

export const CardItem: React.FC<IProductItem> = ({ id, label, imageUrl, article, title, oldPrice, price, category }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);
  const [isOnCart, setIsOnCart] = React.useState(false);
  const { setIsOpenCart, isWebpImg } = useGlobalContext();

  React.useEffect(() => {
    items.find((obj) => obj.id === id) ? setIsOnCart(true) : setIsOnCart(false);
  }, [id, isOnCart, items]);

  React.useEffect(() => {
    ibg();
  }, []);

  const onClickAdd = () => {
    const item: ICartItem = {
      id,
      category,
      imageUrl,
      title,
      oldPrice,
      price,
      count: 1,
    };
    dispatch(addToCart(item));
    setIsOpenCart(true);
  };

  return (
    <div className="catalog__item">
      <article className="catalog__card card">
        <div className="card__labels labels">
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
                -{Math.round((100 * (Number(oldPrice) - euroToHrivna(price))) / Number(oldPrice))}%
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
        <Link to={`/products/${category}/${id}`} className="card__image ibg" title={title}>
          <img src={`/assets/img/products/${imageUrl}${isWebpImg ? '.webp' : '.png'}`} alt={title} />
        </Link>
        <div className="card__content">
          <div className="card__article">Артикул: {article}</div>
          <Link to={`/products/${category}/${id}`} className="card__title" title={title}>
            {title}
          </Link>
          <div className="card__cost">
            <div className="card__price">
              {oldPrice !== '' && (
                <div className="card__old-price">{oldPrice.toLocaleString()} ₴</div>
              )}
              <div className="card__actual-price">{euroToHrivna(price).toLocaleString()} ₴</div>
            </div>
            <button
              onClick={onClickAdd}
              className={isOnCart ? 'card__btn inCart' : 'card__btn'}
              disabled={isOnCart && true}>
              <span>{isOnCart ? 'У кошику' : 'Купити'}</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};