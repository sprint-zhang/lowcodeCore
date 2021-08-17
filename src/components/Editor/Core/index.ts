/**
 * code by chunyuan.zhang
 * 编辑器核心
 * **/
import EditorBox from './EditorBox';
import RenderBox from './RenderBox';
import AttributeBox from './AttributeBox';

let Core = {
  debounce: function (func: any, threshold: number, execAsap: boolean) {
    let timeout: any | null = null;
    return function debounced() {
      var args = arguments;
      function delayed() {
        if (!execAsap) func.apply(window, args);
        timeout = null;
      }
      if (timeout) clearTimeout(timeout);
      else if (execAsap) func.apply(window, args);
      timeout = setTimeout(delayed, threshold || 100);
    };
  },
  // 生成uuid
  uuid(len: number, radix: number) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  overSave: function (name: string, data: {}) {
    localStorage.setItem(name, JSON.stringify(data));
  },
};
export default Core;
export { EditorBox, RenderBox, AttributeBox };
