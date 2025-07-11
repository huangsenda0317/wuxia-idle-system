import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import User from './pages/User';
import Loading from './components/Loading';
import { initDB } from './db/database';
import './assets/font/index.css';

// 预加载字体
const preloadFont = () => {
  const font = new FontFace('三极泼墨体', `url(${require('./assets/font/SanJiPoMoTi-2.ttf')})`);
  font.load().then(() => {
    document.fonts.add(font);
  });
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    preloadFont();
    initDB().then(() => {
      setLoading(false);
    });
  }, []);

  return loading ? <Loading /> : player ? <Home /> : <User setPlayer={setPlayer} />;
};
export default App;
