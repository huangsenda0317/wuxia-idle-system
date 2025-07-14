import React, { useState } from 'react';
import styles from './index.module.less';
import logo from '@/assets/images/logo.png';
import { mainMenu } from '@/constants';
import classNames from 'classnames';

type PageProps = {
  firstMenuActive: string;
  setFirstMenuActive: (firstMenuActive: string) => void;
};

const Header: React.FC<PageProps> = ({ firstMenuActive, setFirstMenuActive }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        WuXia Idle
      </div>
      <div className={styles.menu}>
        {mainMenu.map((item) => (
          <div
            className={classNames(styles.menuItem, 'cursorPointer', {
              [styles.active]: firstMenuActive === item.id,
            })}
            key={item.id}
            onClick={() => setFirstMenuActive(item.id)}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className={styles.avatar}>用户名</div>
    </div>
  );
};

export default Header;
