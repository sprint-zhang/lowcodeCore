/**
 * code by chunyuan.zhang
 * 编辑器组件 后续独立组件 可在此扩展数据
 * **/
import { FC } from 'react';
import { EditorBox } from './Core';
import { HeaderMenu } from './BusinessComponents';

interface EditorPropsType {
  pointData?: any;
  userData?: any;
  addTemplate: Function;
  addPage: Function;
}
const Editor: FC<EditorPropsType> = (props) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HeaderMenu addTemplate={props.addTemplate} addPage={props.addPage} />
      <EditorBox {...props} />
    </div>
  );
};

export default Editor;
