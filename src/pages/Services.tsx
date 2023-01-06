import React from 'react';
import { useLocation } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs'
import LeftMenu from '../components/LeftMenu'
import Head from '../layouts/Head'

const Services = () => {
  const { pathname } = useLocation();

  return (
    <section className="services__container">
      <Head title={'Послуги'} url={pathname} />
      <LeftMenu />
      <div className="services__content">
        <Breadcrumbs titleBlock={'Послуги'} />
        <h2 className="services__title">Послуги</h2>
      </div>
    </section>
  )
}

export default Services