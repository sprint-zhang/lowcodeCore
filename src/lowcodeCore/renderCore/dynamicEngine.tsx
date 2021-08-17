import { dynamic } from 'umi';
import { useMemo, memo, FC } from 'react';
const DynamicFunc = (type: string) => {
  return dynamic({
    loader: async function () {
      const { default: Graph } = await import(`@components/Editor/Materials/Base/${type}`);
      const Component = Graph;
      return (props: DynamicType) => {
        const { id, config, isTpl, notDraggble, lang } = props;
        return (
          <Component {...config} isTpl={isTpl} id={id} notDraggble={notDraggble} lang={lang} />
        );
      };
    },
    loading: () => <div style={{ paddingTop: 10, textAlign: 'center' }}>加载中...</div>,
  });
};

type DynamicType = {
  id: string;
  isTpl: boolean;
  notDraggble: boolean;
  config: { [key: string]: any };
  type: string;
  lang: string;
  category: string;
};
const DynamicEngine = memo((props: DynamicType) => {
  const { type, config } = props;
  const Dynamic = useMemo(() => {
    return DynamicFunc(type) as unknown as FC<DynamicType>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return <Dynamic {...props} />;
});

export default DynamicEngine;
