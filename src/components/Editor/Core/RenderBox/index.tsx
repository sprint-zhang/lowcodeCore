/**
 * code by chunyuan.zhang
 * 容器盒子
 * **/
import { FC, memo, useMemo, useState } from 'react';
import { Menu, Item } from 'react-contexify';
import Cookies from 'js-cookie';
import { Button } from 'antd-mobile';
import { IntlProvider, FormattedMessage } from 'react-intl';
import RenderCore, { RenderCoreTypes } from '../../../../lowcodeCore/renderCore';
import zh from '@/locales/zh-CN';
import en from '@/locales/en-US';
import '../../../../lowcodeCore/renderCore/render.less';
import 'react-contexify/dist/ReactContexify.min.css';
import styles from './index.less';

const locales = {
  'zh-CN': { ...zh },
  'en-US': { ...en },
};

interface RenderBoxTypes extends RenderCoreTypes {
  rightColla: boolean;
}

const RenderBox: FC<RenderBoxTypes> = memo((props: RenderBoxTypes) => {
  const [lang, $lang] = useState(Cookies.get('lang') || 'zh-CN');

  // 多语言切换
  const handleChange = () => {
    $lang(lang == 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  const renderCore = useMemo(() => {
    return <RenderCore {...props} lang={lang}></RenderCore>;
  }, [props.userData, props.layouts, lang]);

  return (
    <div
      className={`${styles.renderBox} scrollbar`}
      style={{ marginLeft: props.rightColla ? '-337px' : '-187px' }}
    >
      <IntlProvider locale={lang} messages={locales[lang]}>
        <div>
          <FormattedMessage id="app.preview.down.block" />
          <br />
          <Button type="primary" size="small" onClick={handleChange}>
            多语言切换
          </Button>
        </div>
        <div className={styles.fillBody}>{renderCore}</div>
      </IntlProvider>
      <div>
        <Menu id={'top'}>
          <Item
            onClick={(ItemParams) => {
              console.log(ItemParams);
              ItemParams.props.itemClick(ItemParams.props.data);
            }}
          >
            {'删除'}
          </Item>
        </Menu>
      </div>
    </div>
  );
});

export default RenderBox;
