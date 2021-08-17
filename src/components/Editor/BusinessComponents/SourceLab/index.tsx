import { FC, useMemo } from 'react';
import { Tabs } from 'antd';
import { HighlightOutlined, UserOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { DragBox } from '../../../../lowcodeCore/dragBox';
import { Template } from '../../BusinessComponents';
import materialSchemas from '../../Materials/materialschemas';
import baseTemplates from '../../Materials/Base/baseTemplates';
import { componentsType } from '../../Materials/types';

import styles from './index.less';
import logo from '../../assets/compant.png';
interface SourceLabType {
  templateList: any;
  pageList: any;
}
const { TabPane } = Tabs;
const CpIcon = {
  Base: <HighlightOutlined />,
  User: (
    <div>
      <UserOutlined />
    </div>
  ),
  model: (
    <div>
      <ReconciliationOutlined />
    </div>
  ),
};

let oldDataString = localStorage.getItem('userPage') || '[]';
let oldData = JSON.parse(oldDataString);
oldData.map((item: any) => {
  return {
    name: item.id,
    icon: 'DiffOutlined',
    path: item.path,
    component: './my-favorite',
  };
});

const SourceLab: FC<SourceLabType> = (props) => {
  const { templateList, pageList } = props;
  const generateHeader = useMemo(() => {
    return (type: componentsType, text: string) => {
      return (
        <div className={styles.tabTitle}>
          {CpIcon[type]}
          <div>{text}</div>
        </div>
      );
    };
  }, [CpIcon]);

  const tabRender = useMemo(() => {
    return (
      <>
        <TabPane tab={generateHeader('Base', '组件')} key="1">
          <div className={styles.paneItem}>
            {baseTemplates.map((value, i) => {
              return (
                <DragBox
                  tragData={{
                    template: value,
                    ...materialSchemas[value.type],
                  }}
                  logo={logo}
                  key={i + value.type}
                ></DragBox>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab={generateHeader('model', '模板')} key="2">
          <div>
            {templateList.map((item: any) => {
              return <Template key={item.id} />;
            })}
          </div>
        </TabPane>
        <TabPane tab={generateHeader('User', '我的')} key="3">
          <div>
            {pageList.map((item: any, i: number) => {
              return (
                <div
                  key={i + item.id}
                  onClick={() => {
                    window.open(
                      `${window.location.protocol}//${window.location.host}/#/${item.path}?id=${item.id}&isH5=true`,
                    );
                    // history.push({
                    //   pathname: item.path,
                    //   query: {
                    //     id: item.id,
                    //   },
                    // });
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div>
            <a>新增页面</a>
          </div>
        </TabPane>
      </>
    );
  }, [generateHeader, materialSchemas, baseTemplates, templateList, pageList]);

  return (
    <div className={styles.tabpane}>
      <Tabs
        defaultActiveKey="1"
        tabPosition={'left'}
        className="editorTabclass"
        style={{ marginTop: 10 }}
      >
        {tabRender}
      </Tabs>
    </div>
  );
};

export default SourceLab;
