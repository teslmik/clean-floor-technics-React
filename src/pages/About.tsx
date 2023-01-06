import React from 'react';
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
      </div>
    </section>
  );
};

export default About;
