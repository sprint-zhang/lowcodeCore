import { FC } from 'react';
import DynamicEngine from './dynamicEngine';
import { RenderCoreType } from './index';
interface RenderCard extends RenderCoreType {
  notDraggble: boolean;
  lang: string;
}
export const RenderCard: FC<RenderCard> = ({ id, compantData, notDraggble, lang }) => {
  return (
    <DynamicEngine
      id={id}
      lang={lang}
      notDraggble={notDraggble}
      type={compantData.template.type}
      config={compantData.config}
      isTpl={false}
      category={compantData.template.category}
    />
  );
};
