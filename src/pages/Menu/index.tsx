import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import { marketMenu, bagMenu, factionMenu, skillMenu, lifeMenu } from '@/constants';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tabs } from 'antd';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type PageProps = {
  firstMenuActive: string;
  secondMenuActive: string;
  setSecondMenuActive: (key: string) => void;
};

const Menu: React.FC<PageProps> = ({ firstMenuActive, secondMenuActive, setSecondMenuActive }) => {
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

  const items = useMemo(() => {
    return secondMenu?.map((item) => ({
      key: item.id,
      label: item.name,
    }));
  }, [secondMenu]);

  useEffect(() => {
    if (secondMenu && secondMenu.length > 0) {
      setSecondMenuActive(secondMenu[0].id);
    }
  }, [firstMenuActive, secondMenu, setSecondMenuActive]);

  const handleChange = (key: string) => {
    setSecondMenuActive(key);
  };

  return (
    <div className={styles.menu}>
      <Tabs items={items} activeKey={secondMenuActive} onChange={handleChange} />
    </div>
  );
};

export default Menu;
