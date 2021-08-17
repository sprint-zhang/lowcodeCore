/**
 *坐标尺组件
 * code bu chunyuan.zhang
 *
 * **/

import React, { useRef, useEffect, useState } from 'react';
import styles from './index.less';

interface CalibrationPropsType {
  direction: 'row' | 'col';
  editRefresh: boolean;
}

const Calibration: React.FC<CalibrationPropsType> = (props) => {
  const CalibrationRef = useRef<any>(null);
  const [coins, setCoins] = useState<any>([]);

  let renderView = () => {
    let code =
      props.direction == 'col'
        ? CalibrationRef.current.clientHeight
        : CalibrationRef.current.clientWidth;
    code = code || 0;
    let newcoins = [];
    while (code > 1) {
      newcoins.push(code);
      code--;
    }

    if (code <= 1) {
      setCoins(newcoins);
    }
  };

  useEffect(() => {
    renderView();
  }, [props.editRefresh]);

  return (
    <div
      className={props.direction == 'col' ? styles.colCalibrationBox : styles.rowCalibrationBox}
      ref={CalibrationRef}
    >
      {coins.map((item: any, i: number) => {
        return (
          <div className={styles.coinBox} key={item + 'px'}>
            {i % 10 == 0 ? <div className={styles.coin} /> : <div />}
            <span className={styles.coinText}>{i % 50 == 0 ? i : ''}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Calibration;
