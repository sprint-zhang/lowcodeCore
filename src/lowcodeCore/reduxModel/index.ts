const localPointData = localStorage.getItem('pointData') || '[]';
const localUserData = localStorage.getItem('userData') || '[]';
const templates = localStorage.getItem('templates') || '[]';
const pages = localStorage.getItem('pages') || '[]';

function overSave(name: string, data: {}) {
  localStorage.setItem(name, JSON.stringify(data));
}
const Model = {
  state: {
    pointData: JSON.parse(localPointData) || [],
    userData: JSON.parse(localUserData) || [],
    pageList: JSON.parse(pages) || [],
    templateList: JSON.parse(templates) || [],
    curPoint: null,
  },
  reducers: {
    addPointData(state: any, { payload }: any) {
      let data: any[] = [];
      let data2 = {};
      const localPointData = localStorage.getItem('pointData') || '[]';
      const localUserData = localStorage.getItem('userData') || '[]';
      data = [payload.pointData, ...JSON.parse(localPointData)];
      data2 = [payload.userData, ...JSON.parse(localUserData)];
      overSave('pointData', data);
      overSave('userData', data2);
      return {
        ...state,
        pointData: data,
        userData: data2,
        curPoint: payload,
      };
    },
    addAllPointData(state: any, { payload }: any) {
      return {
        ...state,
        pointData: payload.pointData,
        userData: payload.userData,
        curPoint: payload.curPoint,
      };
    },
    modPointData(state: any, { payload }: any) {
      let data = [...payload];
      overSave('pointData', data);
      return {
        ...state,
        pointData: data,
      };
    },
    modUserData(state: any, { payload }: any) {
      if (payload.userData) {
        overSave('userData', payload.userData);
        return {
          ...state,
          userData: payload.userData,
        };
      } else {
        return {
          ...state,
          curPoint: payload.curPoint,
        };
      }
    },
    delData(state: any, { payload }: any) {
      let data: any[] = [];
      let data2: any[] = [];
      const localPointData = localStorage.getItem('pointData') || '[]';
      const localUserData = localStorage.getItem('userData') || '[]';
      data = JSON.parse(localPointData);
      data2 = JSON.parse(localUserData);
      data = data.filter((item) => item.i != payload.id);
      data2 = data2.filter((item) => item.id != payload.id);
      overSave('pointData', data);
      overSave('userData', data2);

      return {
        ...state,
        userData: data2,
        pointData: data,
        curPoint: null,
      };
    },

    delContainerData(state: any, { payload }: any) {
      let data: any[] = [];
      const localUserData = localStorage.getItem('userData') || '[]';
      data = JSON.parse(localUserData);
      let data2 = data.filter((item) => item.id == payload.parentId);
      let layouts = data2[0].compantData.config.layouts.filter((item) => item.id != payload.id);
      let userData = data2[0].compantData.config.userData.filter((item) => item.id != payload.id);

      data.map((item) => {
        if (item.id == payload.parentId) {
          item.compantData.config.layouts = layouts;
          item.compantData.config.userData = userData;
        }
      });

      overSave('userData', data);
      return {
        ...state,
        userData: data,
        curPoint: null,
      };
    },
    clearAll(state: any) {
      overSave('userData', []);
      return {
        ...state,
        pointData: [],
        curPoint: null,
      };
    },
    updateTemplate(state: any, { payload }: any) {
      localStorage.setItem('templates', JSON.stringify(payload));
      return {
        ...state,
        templateList: payload,
      };
    },
    updatePages(state: any, { payload }: any) {
      localStorage.setItem('pages', JSON.stringify(payload));
      return {
        ...state,
        pageList: payload,
      };
    },
  },
  effects: {
    *addTemplate({ payload }, { put, call }) {
      const localTemplates = localStorage.getItem('templates') || '[]';

      let data = [payload, ...JSON.parse(localTemplates)];
      // yield call(addTodo, todo);
      yield put({ type: 'updateTemplate', payload: data });
    },
    *getTemplates({ payload: todo }, { put, call }) {
      // yield call(addTodo, todo);
      // yield put({ type: 'add', payload: todo });
    },
    *addPage({ payload }, { put, call }) {
      const localPages = localStorage.getItem('pages') || '[]';
      let data = [payload, ...JSON.parse(localPages)];
      yield put({ type: 'updatePages', payload: data });
      // yield call(addTodo, todo);
      // yield put({ type: 'add', payload: todo });
    },
    *getPages({ payload: todo }, { put, call }) {
      // yield call(addTodo, todo);
      // yield put({ type: 'add', payload: todo });
    },
  },
};

export default Model;
