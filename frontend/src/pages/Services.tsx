import React from 'react';
import { useLocation } from 'react-router-dom';

import { Breadcrumbs, LeftMenu } from '../components';
import Head from '../layouts/Head';

const Services: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <section className="services__container">
      <Head title={'Послуги'} url={pathname} />
      <LeftMenu />
      <div className="services__content">
        <Breadcrumbs titleBlock={'Послуги'} />
        <h2 className="services__title">Послуги</h2>
        <h3 className="services__subtitle">Надаємо послуги з чищення твердих та м'яких підлогових покриттів</h3>
        <div className="services__text">
          <p><strong>Чистка твердих підлогових покриттів</strong> спеціальними засобами необхідна в тих випадках, коли бруд настільки міцно в'ївся в поверхню, що звичайного миття підлоги вже недостатньо.</p>
          <p>Щоб вивести застарілі забруднення, видалити плями і пил, що накопичилися в порах і мікротріщинах матеріалу за роки активного використання покриття, роблять розмивання підлоги, або глибоке чищення.</p>
          <p>Для цих цілей використовують спецтехніку: роторні машини, водозбори та спеціальні засоби для чищення глибокої дії, які здатні проникнути в пори твердого покриття, захопити забруднення і вивести його на поверхню для подальшого очищення.</p>
          <p>Для дерев'яних покриттів використовують щадні технології.</p>
          <p>Регулярне чищення професійними засобами потребують: плитка для підлоги, натуральний камінь, лінолеум, бетон, наливна підлога.</p>
        </div>
        <div className="services__text">
          <p><strong>Чистка м'яких покриттів</strong>, таких як ковролін або килимове покриття, проводиться у чотири етапи:</p>
            <ul>
              <li>- знепилення спеціальним пилососом із щіткою, яка вичісує пил та бруд зсередини покриття;</li>
              <li>- нанесення спеціальних засобів для чищення;</li>
              <li>- обробка покриття чистячою технікою, що забезпечує глибоку обробку та зняття забруднень з ворсу;</li>
              <li>- видалення забруднень та засобів чищення чистою водою за допомогою потужного екстрактора.</li>
            </ul>
          <p>За бажанням клієнта може бути проведено сушіння покриття спеціальним промисловим феном.</p>
        </div>
      </div>
    </section>
  )
}

export default Services;