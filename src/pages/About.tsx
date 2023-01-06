import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import LeftMenu from '../components/LeftMenu';
import Head from '../layouts/Head';

const About: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <section className="about__container">
      <Head title={'Про нас'} url={pathname} />
      <LeftMenu />
      <div className="about__content">
        <Breadcrumbs titleBlock={'Про нас'} />
        <h2 className="about__title">Про нас</h2>
        <img src="/assets/img/MadeInBritainWebPagePhoto.png" alt="Made In Britain" />
        <div className="content-about__text">
          <ReactMarkdown>
            **Truvox International** — провідний постачальник комерційних і промислових машин
            для обслуговування підлог. Компанія заснована в Саутгемптоні (Southampton),
            Великобританія. З дня виробництва нашого першого електричного полірувальника на
            початку 1960-х років Truvox успішно розширила як асортимент, так і території
            поширення продукції, в даний час, кількість країн досягає більш ніж 70 по всьому
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
    </section>
  );
};

export default About;
