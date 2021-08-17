import React from 'react';
import RenderCore from '../../lowcodeCore/renderCore';
import { connect } from 'dva';
import styles from './index.less';

const previews: React.FC<any> = (props) => {
  const { location } = props;

  let params = location.query.id || '';
  let params2 = location.query.isH5 || false;
  let data = localStorage.getItem('pages');
  data = JSON.parse(data);
  let render = data.filter((item) => item.id == params);

  return (
    <div className={params2 ? styles.previewContainer : ''}>
      <div
        className={
          params2 ? `${styles.previewWrap} scrollbar` : `${styles.h5PreviewWrap} scrollbar`
        }
      >
        {render.length > 0 && (
          <RenderCore
            notDraggble={true}
            gridLayoutProps={{
              cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
              containerPadding: [0, 0],
              rowHeight: 5,
              compactType: 'vertical',
            }}
            layouts={render[0].children.pointData}
            userData={render[0].children.userData}
          />
        )}
      </div>
    </div>
  );
};

export default connect(({ Editor }: any) => ({
  curPoint: Editor.curPoint,
  pointData: Editor.pointData,
  userData: Editor.userData,
}))(previews);
