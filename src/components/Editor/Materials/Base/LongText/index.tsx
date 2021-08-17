import React, { memo } from 'react';
import { Button } from 'antd-mobile';
import { ILongTextConfig } from './schema';
import logo from '../../../assets/compant.png';
import styles from './index.less';

const LongText = memo((props: ILongTextConfig & { isTpl: boolean }) => {
  const { text, fontSize, color, indent, lineHeight, textAlign, bgColor, padding, radius, isTpl } =
    props;

  return (
    <div className={styles.LongText}>
      {isTpl ? (
        <div>
          <img src={logo} alt=""></img>
        </div>
      ) : (
        <div
          style={{
            color,
            textIndent: indent + 'px',
            fontSize,
            lineHeight,
            textAlign,
            backgroundColor: bgColor,
            padding,
            borderRadius: radius,
          }}
        >
          {text}
          <p>可点击右上角换个风格按钮动态换肤</p>
          <p className={styles.brandSuccess}>brandSuccess</p>
          <p className={styles.brandWarning}>brandWarning</p>
          <p className={styles.brandError}>brandError</p>
          <p className={styles.brandImportant}>brandImportant</p>
          <p className={styles.brandPrimary}>brandPrimary</p>
        </div>
      )}
    </div>
  );
});
export default LongText;
