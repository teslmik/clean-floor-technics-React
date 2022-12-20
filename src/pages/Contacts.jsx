import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import LeftMenu from '../components/LeftMenu';

const Contacts = () => {
  return (
    <section className="contacts__container">
      <LeftMenu />
      <div className="contacts__content">
        <Breadcrumbs titleBlock={'Контактна інформація'} />
        <h2 className="contacts__title">Контактна інформація</h2>
      </div>
    </section>
  );
}

export default Contacts;