import { template as BaseHtml } from './BaseHtml';
let templetes = [
  {
    type: 'Text',
    h: 20,
    displayName: '文本组件',
  },
  {
    type: 'LongText',
    h: 220,
    displayName: '长文本组件',
  },
  {
    type: 'Icon',
    h: 36,
    displayName: '图标组件',
  },
  {
    type: 'Container',
    h: 36,
    displayName: '容器组件',
  },
  {
    type: 'WhiteTpl',
    h: 20,
    displayName: '空白组件',
  },
  BaseHtml,
];
const templates = templetes;
const baseTemplates = templates.map((v) => {
  return { ...v, category: 'Base' };
});

export default baseTemplates;
