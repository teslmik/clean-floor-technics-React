import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import LeftMenu from '../components/LeftMenu';

const Contacts = () => {
  return (
    <section className="contacts__container">
      <LeftMenu />
      <div className="contacts__content">
        <Breadcrumbs titleBlock={'Контактна інформація'} />
        <h2 className="contacts__title">Контактна інформація</h2>
        <div className="contacts__wrapper">
          <div className="contacts__text">
            <div className="contacts__adress">
              <p>Адреса:</p>
              <span>м. Одеса, вул. Маршала Говорова 7а</span>
            </div>
            <div className="contacts__phones-list">
              <div className="contacts__phones-item">
                <a className="_icon-phone" href="tel:+380970948777">
                  097 094-87-77
                </a>
              </div>
              <div className="contacts__phones-item">
                <a className="_icon-viber" href="viber://chat?number=%2B380661416662/">
                  066 141-66-62
                </a>
              </div>
              <div className="contacts__phones-item">
                <a className="_icon-mail" href="mailto:info@cleanfloor.com.ua">
                  info@cleanfloor.com.ua
                </a>
              </div>
            </div>
          </div>
          <div className="contacts__maps">
            <iframe
              title="Rout map to store"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d76146.40358453275!2d30.67880170764194!3d46.44377216920573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x31c1a26f6c14b640!2z0JTQuNGB0YLRgNC40LEn0Y7RgtC-0YAgVHJ1dm94INCyINCj0LrRgNCw0ZfQvdGW!5e0!3m2!1suk!2sua!4v1671447885911!5m2!1suk!2sua"
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
