import React, { FC, useEffect } from 'react';
import { Select, InputNumber, Input, Switch, Radio, Form } from 'antd';
const { TextArea } = Input;
import FormItem from '../../../../lowcodeCore/form/renderEngine';
import Color from '../../FormComponents/Color';
import CardPicker from '../../FormComponents/CardPicker';
const antBase = {
  Select,
  InputNumber,
  Input,
  Switch,
  Radio,
  Color,
  TextArea,
  CardPicker,
};
const itemTypes = {
  Text: 'Input',
  Color: 'Color',
  Number: 'InputNumber',
  Select: 'Select',
  TextArea: 'TextArea',
  Switch: 'Switch',
  CardPicker: 'CardPicker',
};
interface AttributeBoxPropsType {
  uid: string;
  onSave?: Function;
  onDel?: Function;
  defaultValue: { [key: string]: any };
  config: Array<any>;
}

const AttributeBox: FC<AttributeBoxPropsType> = (props) => {
  const { uid, config, defaultValue, onSave, onDel } = props;
  let formItem = {};
  const onFinish = (values: any) => {
    onSave &&
      onSave({
        id: uid,
        data: values,
      });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [uid, form]);

  const handlechange = () => {
    onFinish(form.getFieldsValue());
  };

  return (
    <div style={{ width: '100%' }}>
      <Form
        form={form}
        name="AttributeBox"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={defaultValue}
        onValuesChange={handlechange}
      >
        {config.map((item, i) => {
          formItem = item;
          if (item.type == 'CardPicker') {
            formItem = {
              ...item,
              range: {
                ...item.range,
                type: defaultValue['type'],
              },
            };
          }
          return (
            <React.Fragment key={i}>
              <FormItem item={formItem} antBase={antBase} itemTypes={itemTypes} />
            </React.Fragment>
          );
        })}
      </Form>
    </div>
  );
};

export default AttributeBox;
