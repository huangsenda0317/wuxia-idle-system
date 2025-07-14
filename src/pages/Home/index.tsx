import React, { useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import Body from '../Body';
import styles from './index.module.less';

const Home: React.FC = () => {
  const [firstMenuActive, setFirstMenuActive] = useState('集市');
  const [secondMenuActive, setSecondMenuActive] = useState('装备');

  return (
    <div className={styles.home}>
      <Header firstMenuActive={firstMenuActive} setFirstMenuActive={setFirstMenuActive} />
      <Menu
        firstMenuActive={firstMenuActive}
        secondMenuActive={secondMenuActive}
        setSecondMenuActive={setSecondMenuActive}
      />
      <Body secondMenuActive={secondMenuActive} />
    </div>
  );
};

export default Home;
