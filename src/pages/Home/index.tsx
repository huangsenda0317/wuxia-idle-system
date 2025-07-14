import React, { useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import Body from '../Body';
import styles from './index.module.less';

const Home: React.FC = () => {
  const [firstMenuActive, setFirstMenuActive] = useState('集市');

  return (
    <div className={styles.home}>
      <Header firstMenuActive={firstMenuActive} setFirstMenuActive={setFirstMenuActive} />
      <Menu firstMenuActive={firstMenuActive} />
      <Body />
    </div>
  );
};

export default Home;
