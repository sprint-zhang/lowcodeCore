import { FC } from 'react';
import { Button } from 'antd';
import styles from './index.less';
const Template: FC<any> = (props) => {
  return (
    <div className={styles.temp} ondragstart="return false" onselectstart="return false;">
      <img src={require('../../assets/inbizcomplate.png')} alt="" />
      <div className={styles.btnGroup}>
        <Button type={'primary'} style={{ marginBottom: 10 }}>
          立即使用
        </Button>
        <Button>复制链接</Button>
      </div>
    </div>
  );
};

export default Template;
