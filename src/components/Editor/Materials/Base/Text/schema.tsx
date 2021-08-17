import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TTextDefaultType,
} from '../../types';
import { Input } from 'antd';
export type TTextSelectKeyType = 'left' | 'right' | 'center';
export type TTextEditData = Array<
  | ITextConfigType
  | IColorConfigType
  | INumberConfigType
  | ISelectConfigType<TTextSelectKeyType>
  | any
>;
export interface ITextConfig {
  text: TTextDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  align: TSelectDefaultType<TTextSelectKeyType>;
  lineHeight: TNumberDefaultType;
  height: TNumberDefaultType;
}

export interface ITextSchema {
  editData: TTextEditData;
  config: ITextConfig;
}
const Text: ITextSchema = {
  editData: [
    {
      key: 'text',
      name: '文字',
      type: 'Text',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    // {
    //   key: 'testText',
    //   name: '测试属性',
    //   type: 'TestText',
    //   renderCompant: <Input />
    // },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    {
      key: 'align',
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
      key: 'height',
      name: '高度',
      type: 'Number',
    },
  ],
  config: {
    text: '欢迎使用inbiz文本组件',
    color: 'rgba(60,60,60,1)',
    fontSize: 18,
    align: 'center',
    lineHeight: 3,
    height: 50,
  },
};
export default Text;
