import React, { useMemo } from 'react';
import Editor from '@components/Editor';
import Core from '@components/Editor/Core';
import { connect } from 'dva';
import styles from './index.less';

function deepFind(init: any, arr: [], payload: any, type: any) {
  arr.forEach((item: any) => {
    if (type == 'user') {
      if (item.id == payload.parentId) {
        if (!item.userData) {
          item.userData = [];
          item.userData.push(payload.userData);
          init.push(item);
        } else {
          item.userData.push(payload.userData);
          init.push(item);
        }
      } else {
        init.push(item);
        if (item.userData) {
          init.userData = [];
          deepFind(init.userData, item.userData, payload, type);
        }
      }
    } else {
      if (item.i == payload.parentId) {
        if (!item.pointData) {
          item.pointData = [];
          item.pointData.push(payload.pointData);
          init.push(item);
        } else {
          item.pointData.push(payload.pointData);
          init.push(item);
        }
      } else {
        init.push(item);
        if (item.pointData) {
          init.pointData = [];
          deepFind(init.pointData, item.pointData, payload, type);
        }
      }
    }
  });
}

const myfavoriteView: React.FC<any> = (props) => {
  const { pointData, userData, templateList, pageList, curPoint, dispatch, location } = props;

  let params = location.query.id || '';
  const addPointData = useMemo(() => {
    return (payload: any) => {
      dispatch({
        type: 'Editor/addPointData',
        payload: {
          parentId: 'top',
          userData: payload.userData,
          pointData: payload.pointData,
        },
      });

      // if (payload.parentId == 'top') {
      //   dispatch({
      //     type: 'Editor/addPointData',
      //     payload: {
      //       parentId: 'top',
      //       userData: payload.userData,
      //       pointData: payload.pointData
      //     },
      //   });
      // } else {
      //   const localPointData = localStorage.getItem('pointData') || '[]';
      //   const localUserData = localStorage.getItem('userData') || '[]';
      //   let newPointData: any = [];
      //   let newUserData: any = [];
      //   deepFind(newPointData, JSON.parse(localPointData), payload, 'point');
      //   deepFind(newUserData, JSON.parse(localUserData), payload, 'user');

      //   dispatch({
      //     type: 'Editor/addAllPointData',
      //     payload: {
      //       userData: payload.newUserData,
      //       pointData: payload.newPointData,
      //       curPoint: curPoint
      //     },
      //   });
      // }
    };
  }, []);
  const modPointData = useMemo(() => {
    return (payload: any) => {
      Core.overSave('pointData', payload);
      // dispatch({
      //   type: 'Editor/modPointData',
      //   payload: payload,
      // });
    };
  }, []);
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
        type: 'Editor/delData',
        payload: payload,
      });
    };
  }, []);
  const addTemplate = useMemo(() => {
    return (payload: any) => {
      dispatch({
        type: 'Editor/addTemplate',
        payload: payload,
      });
    };
  }, []);
  const addPage = useMemo(() => {
    return (payload: any) => {
      dispatch({
        type: 'Editor/addPage',
        payload: payload,
      });
    };
  }, []);
  return (
    <div className={styles.myFavorite}>
      <Editor
        templateList={templateList}
        pageList={pageList}
        pointData={pointData}
        curPoint={curPoint}
        userData={userData}
        addTemplate={addTemplate}
        addPage={addPage}
        addPointData={addPointData}
        modPointData={modPointData}
        modUserData={modUserData}
        delData={delData}
      ></Editor>
    </div>
  );
};

export default connect(({ Editor }: any) => ({
  curPoint: Editor.curPoint,
  pointData: Editor.pointData,
  userData: Editor.userData,
  templateList: Editor.templateList,
  pageList: Editor.pageList,
}))(myfavoriteView);
