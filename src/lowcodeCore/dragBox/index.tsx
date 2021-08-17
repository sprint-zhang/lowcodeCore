import { FC, memo } from 'react';
import styles from './index.less';
export interface SourceBoxProps {
  tragData: any;
  logo: any;
}

export const DragBox: FC<SourceBoxProps> = memo(({ tragData, logo, children }) => {
  return (
    <div
      className={styles.droppableElement}
      draggable={true}
      unselectable="on"
      onDragStart={(e) => {
        return e.dataTransfer.setData('dragData', JSON.stringify(tragData));
      }}
    >
      <div
        unselectable="off"
        style={{
          display: 'flex',
          height: 72,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundImage: `url(${logo})`,
          backgroundSize: `100% 100%`,
        }}
      ></div>
      <div
        unselectable="off"
        style={{
          height: '30px',
          lineHeight: '30px',
          textAlign: 'center',
          backgroundColor: 'rgba(245, 245, 245, 1)',
          color: 'rgba(118, 118, 118, 1)',
        }}
      >
        {tragData.template.displayName}
      </div>
    </div>
  );
});

export default DragBox;
