import {
  ICardPickerConfigType,
  IColorConfigType,
  ITextConfigType,
  INumberConfigType,
  ISwitchConfigType,
  TCardPickerDefaultType,
  TColorDefaultType,
  TNumberDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
  TCardType,
  TUerDataType,
} from '../../types';
import Core from '../../../Core';
export type TIconEditData = Array<
  IColorConfigType | INumberConfigType | ISwitchConfigType | ITextConfigType
>;
interface col {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;
}
export interface IIconConfig {
  height: TNumberDefaultType;
  backgroundColor: TColorDefaultType;
  layouts: TCardType[];
  cols: col;
  rowHeight: number;
  containerPadding: [number, number];
  userData: [];
}

export interface IIconSchema {
  editData: TIconEditData;
  config: IIconConfig;
}

const Container: IIconSchema = {
  editData: [
    {
      key: 'backgroundColor',
      name: '背景颜色',
      type: 'Color',
    },
  ],
  config: {
    backgroundColor: '#endregion',
    height: 200,
    layouts: [],
    cols: {
      lg: 24,
      md: 24,
      sm: 24,
      xs: 24,
      xxs: 3,
    },
    rowHeight: 5,
    containerPadding: [10, 10],
    userData: [],
  },
};

export default Container;
