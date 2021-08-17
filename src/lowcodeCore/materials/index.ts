/**
 * 材料库类型
 * **/
export interface IUploadConfigType {
  key: string;
  name: string;
  type: 'Upload';
  isCrop?: boolean;
  cropRate?: number;
}

export interface ITextConfigType {
  key: string;
  name: string;
  type: 'Text';
}

export interface ITextAreaConfigType {
  key: string;
  name: string;
  type: 'TextArea';
}

export interface INumberConfigType {
  key: string;
  name: string;
  type: 'Number';
  range?: [number, number];
  step?: number;
}

export interface IColorConfigType {
  key: string;
  name: string;
  type: 'Color';
}

export interface ISelectConfigType<KeyType> {
  key: string;
  name: string;
  type: 'Select';
  range: {
    options: Array<{
      label: string;
      value: KeyType;
    }>;
  };
}

export interface IRadioConfigType<KeyType> {
  key: string;
  name: string;
  type: 'Radio';
  range: Array<{
    key: KeyType;
    text: string;
  }>;
}

export interface ISwitchConfigType {
  key: string;
  name: string;
  notAntd: string;
  type: 'Switch';
}

export interface ICardPickerConfigType<T> {
  key: string;
  name: string;
  type: 'CardPicker';
  notAntd: string;
  range: {
    icons: Array<T>;
  };
}

export interface TCardType {
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

export interface TUerDataType {
  id: 'string';
  compantData: any;
}

export interface IFormItemsConfigType {
  key: string;
  name: string;
  type: 'FormItems';
}

export type baseFormOptionsType = {
  label: string;
  value: string;
};

interface schemaType {
  editData: Array<
    | IUploadConfigType
    | ITextAreaConfigType
    | IDataListConfigType
    | TDataListDefaultTypeItem
    | IRadioConfigType<KeyType>
    | ISelectConfigType<KeyType>
    | IColorConfigType
    | INumberConfigType
    | ISwitchConfigType
    | ICardPickerConfigType<any>
    | ITextConfigType
  >;
  config: any;
}

interface tempalateType {
  type: string;
  displayName: string;
}

type compontsFactory = {
  schema: schemaType;
  tempalate: tempalateType;
};
export default compontsFactory;
