import { memo, useRef } from 'react';
import { TriggerEvent, useContextMenu } from 'react-contexify';
import { Responsive, WidthProvider } from 'react-grid-layout';
import domtoimage from 'dom-to-image';
import { RenderCard } from './card';
const DropGridLayout = WidthProvider(Responsive);

export interface Card {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  isBounded?: any;
  isDraggable?: any;
  moved?: any;
  static?: any;
  maxH?: any;
  maxW?: any;
  minH?: any;
  minW?: any;
  resizeHandles?: any;
}
export interface RenderCoreType {
  id: string;
  compantData: any;
}
export interface colsTypes {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;
}

export interface droppingItem {
  i: string;
  h: number;
  w: number;
}

export interface gridLayoutProps {
  cols: colsTypes;
  containerPadding: [number, number];
  rowHeight: number;
  compactType: 'vertical' | 'horizontal';
  droppingItem?: droppingItem;
}
export interface RenderCoreTypes {
  gridLayoutProps: gridLayoutProps; //容器属性
  onDrop?: Function; //拖拽到容器
  onDragStart?: Function;
  onLayoutChang?: Function;
  onDragStop?: Function;
  containerId?: string; //容器唯一id
  layouts?: Card[]; //布局卡片数据
  userData?: RenderCoreType[]; //组件数据
  notDraggble?: boolean; //是否可拖拽
  propstyle?: CSSStyleDeclaration; //布局样式
  itemClick?: Function; //右键菜单点击函数
  lang?: string;
}

const RenderCore = memo((props: RenderCoreTypes) => {
  let {
    containerId,
    layouts,
    userData,
    onDrop,
    onLayoutChang,
    onDragStart,
    onDragStop,
    itemClick,
    notDraggble,
    propstyle,
    gridLayoutProps,
    lang,
  } = props;

  const { show } = useContextMenu({
    id: 'top',
  });

  const __onDrop = (layout: any, layoutItem: any, _event: any) => {
    if (onDrop) {
      onDrop(layout, layoutItem, _event);
    }
  };

  const __displayMenu = (e: TriggerEvent, data: RenderCoreType) => {
    e.stopPropagation();
    show(e, {
      props: {
        data: data,
        containerId: containerId,
        itemClick: itemClick,
      },
    });
  };

  //如果需要碰撞插入效果 此函数内部不能产生diff行为
  const __onLayoutChange = (layout: any, layout2: any, layout3: any) => {
    if (onLayoutChang) {
      onLayoutChang(layout, layout2, layout3);
    } else {
      console.warn('容器变更逻辑没有处理,布局变更将会无效');
    }
  };

  const __onDragStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement,
  ) => {
    let data = userData?.find((item: any) => item.id == newItem.i);
    if (onDragStart) {
      onDragStart(data);
    } else {
      console.warn('组件点击函数未传递,组件点击无操作');
    }
  };

  const __onDragStop = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement,
  ) => {
    if (onDragStop) {
      onDragStop(newItem, e);
    } else {
      console.warn('组件结束拖拽函数未传递,组件拖拽结束后无操作');
    }
  };

  const refImgDom = useRef<HTMLDivElement>(null);

  if (notDraggble == true) {
    window.generateImg = (callback: Function) => {
      domtoimage
        .toBlob(refImgDom.current, {
          bgcolor: '#fff',
          //  支持跨域截图
          cacheBust: true,
        })
        .then(function (blob: Blob) {
          callback(blob);
        })
        .catch(function (error: any) {
          console.error('oops, something went wrong!', error);
        });
    };
  }

  return (
    <div ref={refImgDom}>
      <DropGridLayout
        onDrop={__onDrop}
        onLayoutChange={__onLayoutChange}
        //拖动完成时调用。
        onDragStop={__onDragStop}
        // 调整大小完成时调用。
        // onResizeStop={onLayoutChange}
        onDragStart={__onDragStart}
        className="layout"
        style={{
          minHeight: propstyle?.minHeight || 664,
          height: '100%',
        }}
        layouts={{
          // @ts-ignore
          lg: layouts?.map((item) => {
            return {
              i: item.i,
              h: item.h,
              w: item.w,
              x: item.x,
              y: item.y,
              minW: item.minW,
              minH: item.minH,
              isDraggable: notDraggble ? false : item.isDraggable,
              static: notDraggble ? true : false,
              resizeHandles: false,
            };
          }),
          // @ts-ignore
          xxs: layouts?.map((item) => {
            return {
              i: item.i,
              h: item.h,
              w: item.w,
              x: item.x,
              y: item.y,
              minW: item.minW,
              minH: item.minH,
              isDraggable: notDraggble ? false : item.isDraggable,
              static: notDraggble ? true : false,
              resizeHandles: false,
            };
          }),
        }}
        droppingItem={{
          i: 'top',
          h: 13,
          w: 24,
        }}
        measureBeforeMount={true}
        useCSSTransforms={true}
        preventCollision={false}
        isDroppable={true}
        {...gridLayoutProps}
      >
        {userData && userData.length > 0 ? (
          userData.map((item: any, i: number) => (
            <div
              key={item.id}
              onContextMenu={(e) => __displayMenu(e, item)}
              style={{
                overflow: 'hidden',
                backgroundColor: '#fff',
                cursor:
                  item.compantData.template.type == 'Container' || notDraggble ? 'default' : 'move',
              }}
            >
              <RenderCard {...item} notDraggble={notDraggble} lang={lang} />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </DropGridLayout>
    </div>
  );
});

export default RenderCore;
