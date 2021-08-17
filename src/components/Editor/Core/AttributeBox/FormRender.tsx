import { Form } from 'antd';

const FormItem = (props: any) => {
  const { item, itemTypes, antBase } = props;
  const Panent = antBase[itemTypes[item.type]];
  let formProps = {
    label: item.name,
    name: item.key,
    valuePropName: 'value',
  };

  // 自定义某属性为value,antd默认value为表单项取值
  if (item.notAntd) {
    formProps = {
      ...formProps,
      valuePropName: item.notAntd,
    };
  }

  if (!Panent)
    return (
      <Form.Item {...formProps}>{item.renderCompant ? item.renderCompant : '暂无组件'}</Form.Item>
    );

  return (
    <Form.Item {...formProps}>
      <Panent {...item.range} {...props.customProps}></Panent>
    </Form.Item>
  );
};

export default FormItem;
