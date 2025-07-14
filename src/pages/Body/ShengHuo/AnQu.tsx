import { FC } from 'react';
import styles from './index.module.less';
import { Row, Col } from 'antd';

type AnQuProps = {};

const AnQu: FC<AnQuProps> = ({}) => {
  return (
    <Row gutter={[16, 16]} className={styles.anQu} align="top">
      <Col span={6} key={0}>
        {/* <DefaultCard title="卡片0" active={active === 0} cdTime={4} onClick={() => setActive(0)} /> */}
      </Col>
      <Col span={6} key={1}>
        {/* <DefaultCard title="卡片1" active={active === 1} cdTime={2} onClick={() => setActive(1)} /> */}
      </Col>
    </Row>
  );
};

export default AnQu;
