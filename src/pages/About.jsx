import React from 'react';

import Breadcrumbs from '../components/Breadcrumbs'
import LeftMenu from '../components/LeftMenu'

const About = () => {
  return (
    <section className="about__container">
      <LeftMenu />
      <div className="about__content">
        <Breadcrumbs titleBlock={'Про нас'} />
        <h2 class="about__title">Про нас</h2>
      </div>
    </section>
  );
}

export default About;