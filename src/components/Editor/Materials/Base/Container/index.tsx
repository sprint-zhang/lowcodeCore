import { memo, useMemo } from 'react';
import { connect } from 'dva';
import Core from '../../../index';
import RenderCore from '../../../../../lowcodeCore/renderCore';
import logo from '../../../assets/compant.png';

const Container = memo((props: any) => {
  const { id, notDraggble, isTpl, layouts, userData, backgroundColor, dispatch } = props;

  const modUserData = useMemo(() => {
    return (payload: any) => {
      dispatch({
        type: 'Editor/modUserData',
        payload: payload,
      });
    };
  }, []);
  const delData = useMemo(() => {
    return (payload: any) => {
      dispatch({
        type: 'Editor/delContainerData',
        payload: payload,
      });
    };
  }, []);

  const itemClick = useMemo(() => {
    return (data: any) => {
      delData({
        parentId: id,
        id: data.id,
      });
    };
  }, []);

  const onDrop = useMemo(() => {
    return (layout: any, layoutItem: any, _event: any) => {
      if (!layoutItem) return true;
      const localUserDataString = localStorage.getItem('userData') || '[]';
      let localUserData = JSON.parse(localUserDataString);

      const data = JSON.parse(_event.dataTransfer.getData('dragData'));
      if (data.template.type == 'Container') {
        alert('暂不支持，容器组件嵌套容器组件');
        return;
      }
      let uuid = Core.uuid(36, 10);
      localUserData.map((item: any) => {
        if (item.id == id) {
          item.compantData.config.layouts.push({
            i: uuid,
            x: layoutItem.x,
            y: layoutItem.y + 1 - 5,
            w: 24,
            h: 5,
            minW: 2,
            minH: 2,
            isDraggable: data.template.type == 'Container' ? false : true,
            static: false,
          });
          item.compantData.config.userData.push({
            id: uuid,
            compantData: {
              ...data,
            },
          });
        }
        return item;
      });
      modUserData({
        userData: localUserData,
      });
    };
  }, []);

  const onLayoutChange = useMemo(() => {
    return (layout: any, layout2: any, layout3: any) => {
      let localUserDataString = localStorage.getItem('userData') || '[]';
      let localUserData = JSON.parse(localUserDataString);
      localUserData.map((item: any) => {
        if (item.id == id) {
          item.compantData.config.layouts = layout2['xxs'];
        }
        return item;
      });
      localStorage.setItem('userData', JSON.stringify(localUserData));
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
      if (e.path.length <= 10) {
        if (delData)
          delData({
            parentId: id,
            id: newItem.i,
          });
      }
    };
  }, []);

  const renderCore = useMemo(() => {
    return (
      <RenderCore
        notDraggble={notDraggble}
        containerId={id}
        gridLayoutProps={{
          cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
          containerPadding: [0, 0],
          rowHeight: 5,
          compactType: 'vertical',
          droppingItem: {
            i: 'top',
            h: 2,
            w: 24,
          },
        }}
        onDrop={onDrop}
        onLayoutChang={onLayoutChange}
        onDragStart={onDragStart}
        onDragStop={onDragStop}
        layouts={layouts}
        userData={userData}
        itemClick={itemClick}
      />
    );
  }, [props]);

  return isTpl ? (
    <div>
      <img src={logo} alt=""></img>
    </div>
  ) : (
    <div className={`scrollbar`} style={{ height: '100%', backgroundColor: backgroundColor }}>
      {renderCore}
    </div>
  );
});

export default connect(({ Editor }: any) => ({
  curPoint: Editor.curPoint,
}))(Container);
