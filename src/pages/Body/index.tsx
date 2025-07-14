import React, { useMemo } from 'react';
import styles from './index.module.less';
import JiShi from './JiShi';
import XingNang from './XingNang';
import MenPaiAdd from './MenPai/Add';
import MenPaiCreate from './MenPai/Create';
import WuXue from './JiangHu/WuXue';
import ZhuangBei from './JiangHu/ZhuangBei';
import JingMai from './JiangHu/JingMai';
import ZhanDou from './JiangHu/ZhanDou';
import TiaoZhan from './JiangHu/TiaoZhan';
import TiGuan from './JiangHu/TiGuan';
import QiaoFu from './ShengHuo/QiaoFu';
import YuFu from './ShengHuo/YuFu';
import NongFu from './ShengHuo/NongFu';
import YaoNong from './ShengHuo/YaoNong';
import KuangGong from './ShengHuo/KuangGong';
import LieHu from './ShengHuo/LieHu';
import CaiFeng from './ShengHuo/CaiFeng';
import TieJiang from './ShengHuo/TieJiang';
import QiaoJiang from './ShengHuo/QiaoJiang';
import DuShi from './ShengHuo/DuShi';
import ChuShi from './ShengHuo/ChuShi';
import YaoShi from './ShengHuo/YaoShi';
import QinShi from './ShengHuo/QinShi';
import QiShi from './ShengHuo/QiShi';
import ShuSheng from './ShengHuo/ShuSheng';
import QiGai from './ShengHuo/QiGai';
import XunShou from './ShengHuo/XunShou';
import AnQu from './ShengHuo/AnQu';

type BodyProps = {
  secondMenuActive: string;
};

const Body: React.FC<BodyProps> = ({ secondMenuActive }) => {
  const Components = {
    集市: <JiShi />,
    行囊: <XingNang />,
    创立门派: <MenPaiCreate />,
    加入门派: <MenPaiAdd />,
    武学: <WuXue />,
    装备: <ZhuangBei />,
    经脉: <JingMai />,
    战斗: <ZhanDou />,
    挑战: <TiaoZhan />,
    踢馆: <TiGuan />,
    樵夫: <QiaoFu />,
    渔夫: <YuFu />,
    农夫: <NongFu />,
    药农: <YaoNong />,
    矿工: <KuangGong />,
    猎户: <LieHu />,
    裁缝: <CaiFeng />,
    铁匠: <TieJiang />,
    巧匠: <QiaoJiang />,
    毒师: <DuShi />,
    厨师: <ChuShi />,
    药师: <YaoShi />,
    琴师: <QinShi />,
    棋士: <QiShi />,
    书生: <ShuSheng />,
    乞丐: <QiGai />,
    驯兽: <XunShou />,
    暗取: <AnQu />,
  };

  const page = useMemo(() => {
    if (secondMenuActive.includes('集市')) {
      return '集市';
    }
    if (secondMenuActive.includes('行囊')) {
      return '行囊';
    }
    return secondMenuActive;
  }, [secondMenuActive]);

  const Component = Components[page as keyof typeof Components] || JiShi;

  return (
    <div className={styles.body}>
      <div className={styles.left}>{Component}</div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Body;
