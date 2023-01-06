import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';

import BlogItem from '../components/BlogItem';
import TabsPromo from '../components/TabsPromo';
import SwiperBlock from '../components/SwiperBlock';
import Categories from '../components/Categories';
import { useSelector } from 'react-redux';
import { fetchPosts, postsSelector } from '../redux/slices/postsSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useSelector(postsSelector);

  React.useEffect(() => {
    dispatch(fetchPosts({}));
  }, []);

  return (
    <>
      <Helmet>
        <meta property="og:title" content="Промислові та комерційні машини Truvox для миття будь-якого типу підлоги" />
        <meta property="og:url" content="https://cleanfloor.com.ua/" />
        <meta property="og:image" content="https://cleanfloor.com.ua/assets/img/logo/logo_insta.png" />
      </Helmet>
      <SwiperBlock />
      <TabsPromo />
      <Categories />
      <section className="benefits">
        <div className="benefits__container">
          <div className="benefits__items">
            <div className="benefits__item">
              <img src="assets/img/benefits/1.webp" alt="" />
              <p>Доставка у будь-яке місто України</p>
            </div>
            <div className="benefits__item">
              <img src="assets/img/benefits/2.webp" alt="" />
              <p>Оплата зручним для вас способом</p>
            </div>
            <div className="benefits__item">
              <img src="assets/img/benefits/3.webp" alt="" />
              <p>Широкий вибір саме під ваші потреби</p>
            </div>
            <div className="benefits__item">
              <img src="assets/img/benefits/4.webp" alt="" />
              <p>Висока якість та гарантія</p>
            </div>
          </div>
        </div>
      </section>
      <section className="about__container">
        <div className="about__block">
          <div className="about__content content-about">
            <h2 className="content-about__title">Про магазин</h2>
            <div className="content-about__text">
              <ReactMarkdown>
                **Truvox International** — провідний постачальник комерційних і промислових машин
                для обслуговування підлог. Компанія заснована в Саутгемптоні (Southampton),
                Великобританія. З дня виробництва нашого першого електричного полірувальника на
                початку 1960-х років Truvox успішно розширила як асортимент, так і території
                поширення продукції, в даний час, кількість країн досягає більш ніж 60 по всьому
                світу.
              </ReactMarkdown>
              <ReactMarkdown>
                Truvox пропонує широкий асортимент брендів, що добре зарекомендували себе, включаючи
                полірувальники **Orbis**, килимові екстрактори **Hydromist**, пилососи **Valet**,
                підлогонатирачі **Multiwash** і роторні машини **Cimex** з трьома дисковими щітками.
              </ReactMarkdown>
              <ReactMarkdown>
                Офіційним дистриб'ютером **Truvox International** в Україні є інтернет-магазин
                **Clean Floor Techics**. Ми на ринку клінінгу та хімчистки більше 10 років та маємо
                дуже великий досвід в чищені підлог усіх видів, а також знаємось на різноманітних
                видах прибиральної техніки.
              </ReactMarkdown>
            </div>
          </div>
          <div className="about__blog blog-about">
            <div className="blog-about__title">Блог</div>
            <div className="blog-about__items">
              {items.map((obj, i) => (
                <BlogItem
                  id={obj.id}
                  key={i}
                  image={`assets/img/blog/${obj.imageUrl}`}
                  date={obj.date}
                  title={obj.title}
                />
              ))}
            </div>
            <button onClick={() => navigate('/blog')} type="button" className="blog-about__btn">
              <span>Архів</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
