import React, { useState, useEffect, useMemo } from 'react';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Calibration, SourceLab } from '../../BusinessComponents';
import Core, { RenderBox, AttributeBox } from '../index';
import schemas from '../../Materials/materialschemas';
import styles from './index.less';
const EditorBox: React.FC<any> = (props) => {
  const {
    pointData,
    userData,
    addPointData,
    delData,
    modPointData,
    modUserData,
    curPoint,
    templateList,
    pageList,
  } = props;
  const [refresh, setRefresh] = useState(false);
  const [rightColla, setRightColla] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (window.onresize) window.onresize = null;
    window.onresize = Core.debounce(
      () => {
        setRefresh(!refresh);
      },
      2000,
      true,
    );
  }, [refresh]);

  const changeRightColla = useMemo(() => {
    return (c: boolean) => {
      setRightColla(c);
    };
  }, []);

  const handleFormSave = useMemo(() => {
    return (data: any) => {
      let nowUserData = userData.map((item: any) => {
        if (item.id == data.id) {
          return {
            ...item,
            compantData: {
              ...item.compantData,
              config: data.data,
            },
          };
        }
        if (item.compantData.config.userData) {
          item.compantData.config.userData.map((item2: any) => {
            if (item2.id == data.id) {
              return {
                ...item2,
                compantData: {
                  ...item2.compantData,
                  config: data.data,
                },
              };
            }
            return item2;
          });
        }
        return item;
      });

      modUserData({
        userData: nowUserData,
      });
    };
  }, [curPoint, userData]);

  const renderRight = useMemo(() => {
    return (
      <div className={styles.attrSetting}>
        {curPoint && curPoint.id ? (
          <>
            <div className={styles.tit}>属性设置</div>
            <AttributeBox
              config={schemas[curPoint.compantData.template.type].editData}
              uid={curPoint.id}
              defaultValue={curPoint.compantData.config}
              onSave={handleFormSave}
            />
          </>
        ) : (
          <div style={{ paddingTop: '100px' }}>还没有数据哟！！</div>
        )}
      </div>
    );
  }, [curPoint, rightColla]);

  const itemClick = useMemo(() => {
    return (data: any) => {
      if (delData) {
        delData({
          id: data.id,
        });
      }
    };
  }, []);

  const onDrop = useMemo(() => {
    return (layout: any, layoutItem: any, _event: any) => {
      // 防止容器事件冒泡，性能优化，减少不必须的渲染
      if (!layoutItem) return true;
      const data = JSON.parse(_event.dataTransfer.getData('dragData'));
      let id = Core.uuid(36, 10);
      if (addPointData)
        addPointData({
          userData: {
            id: id,
            compantData: {
              ...data,
            },
          },
          pointData: {
            i: id,
            x: layoutItem.x,
            y: layoutItem.y + 1 - 14,
            w: 24,
            h: 14,
            minW: 2,
            minH: 2,
            isDraggable: data.template.type == 'Container' ? false : true,
            static: false,
          },
        });
    };
  }, []);

  const onLayoutChange = useMemo(() => {
    return (layout: any, layout2: any, layout3: any) => {
      if (modPointData) modPointData(layout2['xxs']);
    };
  }, []);

  const onDragStart = useMemo(() => {
    return (data: any) => {
      if (modUserData)
        modUserData({
          curPoint: data,
        });
    };
  }, []);

  const onDragStop = useMemo(() => {
    return (newItem: any, e: MouseEvent) => {
      // path记录焦点所处层级,若少于10层则必在外层容器外
      if (e.path.length <= 10) {
        if (delData)
          delData({
            id: newItem.i,
          });
      }
    };
  }, []);

  return (
    <div className={styles.editorWrap}>
      <div
        className={styles.left}
        style={{ width: collapsed ? '50px' : '300px', minWidth: collapsed ? '50px' : '300px' }}
      >
        <SourceLab templateList={templateList} pageList={pageList}></SourceLab>
        <div className={styles.collapsed} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        </div>
      </div>
      <div className={styles.editor}>
        <div className={styles.calibration}>
          <Calibration direction="row" editRefresh={refresh} />
        </div>
        <div className={styles.calibration} style={{ top: 50 }}>
          <Calibration direction="col" editRefresh={refresh} />
        </div>
        <RenderBox
          containerId={'bigLayoutContainer'}
          gridLayoutProps={{
            cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
            containerPadding: [0, 0],
            rowHeight: 5,
            compactType: 'vertical',
          }}
          onDrop={onDrop}
          onLayoutChang={onLayoutChange}
          onDragStart={onDragStart}
          onDragStop={onDragStop}
          rightColla={rightColla}
          layouts={pointData}
          userData={userData}
          itemClick={itemClick}
        />
      </div>
      <div
        className={`${styles.right} scrollbar`}
        style={{
          right: rightColla ? 0 : -300,
        }}
      >
        {renderRight}
      </div>
      <div
        className={styles.rightcolla}
        style={{
          right: rightColla ? 300 : 0,
        }}
        onClick={() => changeRightColla(!rightColla)}
      >
        {rightColla ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>
    </div>
  );
};

export default EditorBox;
