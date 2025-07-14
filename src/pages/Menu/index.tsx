import React, { useMemo, useState } from 'react';
import styles from './index.module.less';
import { marketMenu, bagMenu, factionMenu, skillMenu, lifeMenu } from '@/constants';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type PageProps = {
  firstMenuActive: string;
};

const Menu: React.FC<PageProps> = ({ firstMenuActive }) => {
  const [secondMenuActive, setSecondMenuActive] = useState('');
  const secondMenu = useMemo(() => {
    switch (firstMenuActive) {
      case '集市':
        return marketMenu;
      case '行囊':
        return bagMenu;
      case '门派':
        return factionMenu;
      case '江湖':
        return skillMenu;
      case '生活':
        return lifeMenu;
    }
  }, [firstMenuActive]);

  return (
    <div className={styles.menu}>
      <Swiper freeMode={true} slidesPerView="auto">
        {secondMenu &&
          secondMenu.map((item) => (
            <SwiperSlide
              key={item.id}
              className={classNames(styles.menuItem, 'cursorPointer', {
                [styles.active]: secondMenuActive === item.id,
              })}
              onClick={() => setSecondMenuActive(item.id)}
            >
              <span>{item.name}</span>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Menu;
