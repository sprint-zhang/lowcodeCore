import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ITextAreaConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TTextAreaDefaultType,
} from '../../types';
export type TLongTextSelectKeyType = 'left' | 'center' | 'right';

export type TLongTextEditData = Array<
  | ITextAreaConfigType
  | IColorConfigType
  | INumberConfigType
  | ISelectConfigType<TLongTextSelectKeyType>
>;
export interface ILongTextConfig {
  text: TTextAreaDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  indent: TNumberDefaultType;
  lineHeight: TNumberDefaultType;
  textAlign: TSelectDefaultType<TLongTextSelectKeyType>;
  bgColor: TColorDefaultType;
  padding: TNumberDefaultType;
  radius: TNumberDefaultType;
  height: TNumberDefaultType;
}

export interface ILongTextSchema {
  editData: TLongTextEditData;
  config: ILongTextConfig;
}

const LongText: ILongTextSchema = {
  editData: [
    {
      key: 'text',
      name: '文字',
      type: 'TextArea',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    {
      key: 'indent',
      name: '首行缩进',
      type: 'Number',
      range: {
        max: [0, 100],
      },
    },
    {
      key: 'textAlign',
      name: '对齐方式',
      type: 'Select',
      range: {
        options: [
          {
            label: '左对齐',
            value: 'left',
          },
          {
            label: '居中对齐',
            value: 'center',
          },
          {
            label: '右对齐',
            value: 'right',
          },
        ],
      },
    },
    {
      key: 'lineHeight',
      name: '行高',
      type: 'Number',
    },
    {
      key: 'bgColor',
      name: '背景颜色',
      type: 'Color',
    },
    {
      key: 'padding',
      name: '填充间距',
      type: 'Number',
    },
    {
      key: 'radius',
      name: '背景圆角',
      type: 'Number',
    },
  ],
  config: {
    text: '欢迎使用inbiz长文本组件',
    color: 'rgba(60,60,60,1)',
    fontSize: 14,
    indent: 20,
    lineHeight: 1.8,
    textAlign: 'left',
    bgColor: 'rgba(255,255,255,0)',
    padding: 0,
    radius: 0,
    height: 20,
  },
};

export default LongText;
