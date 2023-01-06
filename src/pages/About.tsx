import React from 'react';

import Breadcrumbs from '../components/Breadcrumbs';
import LeftMenu from '../components/LeftMenu';
import Head from '../layouts/Head';

const About: React.FC = () => {
  return (
    <section className="about__container">
      <Head title={'Про нас'} />
      <LeftMenu />
      <div className="about__content">
        <Breadcrumbs titleBlock={'Про нас'} />
        <h2 className="about__title">Про нас</h2>
      </div>
    </section>
  );
};

export default About;
