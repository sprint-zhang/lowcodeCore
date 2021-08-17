import { memo } from 'react';
import { ITextConfig } from './schema';
import logo from '../../../assets/compant.png';
import { FormattedMessage } from 'react-intl';

const Text = memo((props: ITextConfig & { isTpl: boolean }) => {
  const { align, text, fontSize, color, lineHeight, height, isTpl } = props;
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt=""></img>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'yellow',
            overflow: 'hidden',
            textAlign: align,
            fontSize,
            color,
            lineHeight,
            height,
          }}
        >
          <FormattedMessage id="app.preview.down.block" />
          {text}
        </div>
      )}
    </>
  );
});
export default Text;
