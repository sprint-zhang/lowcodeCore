import e from 'react';
import { IntlProvider as t, FormattedMessage as r } from 'react-intl';
var o,
  a,
  n =
    ((function (e) {
      (e.exports = function (e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }),
        (e.exports.default = e.exports),
        (e.exports.__esModule = !0);
    })((o = { exports: {} }), o.exports),
    o.exports),
  i = (a = n) && a.__esModule && Object.prototype.hasOwnProperty.call(a, 'default') ? a.default : a,
  l = { type: 'BaseHtml', h: 40, displayName: 'html组件' },
  p = {
    editData: [
      { key: 'type', name: '类型', type: 'Number' },
      { key: 'text', name: '文字', type: 'Text' },
    ],
    config: { type: 'primary', text: 'cctv bjtv cqtv 奥运直播~' },
  };
var c = 'style_baseHtmlBox__2w5hz';
!(function (e, t) {
  void 0 === t && (t = {});
  var r = t.insertAt;
  if (e && 'undefined' != typeof document) {
    var o = document.head || document.getElementsByTagName('head')[0],
      a = document.createElement('style');
    (a.type = 'text/css'),
      'top' === r && o.firstChild ? o.insertBefore(a, o.firstChild) : o.appendChild(a),
      a.styleSheet ? (a.styleSheet.cssText = e) : a.appendChild(document.createTextNode(e));
  }
})(
  '[data-testid=mountNode]{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;margin:30px auto;border-radius:32px;overflow:hidden;width:320px;min-width:320px;height:693px;box-shadow:0 0 0 14px #090a0d,0 0 0 16px #9fa3a8,0 4px 20px 16px rgba(0,0,0,.1);padding:20px 0}.style_baseHtmlBox__2w5hz{padding:20px}.style_baseHtmlBox__2w5hz .style_error__1MFWf{font-size:14px;color:red}',
);
function s(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t &&
      (o = o.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      r.push.apply(r, o);
  }
  return r;
}
function d(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? s(Object(r), !0).forEach(function (t) {
          i(e, t, r[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : s(Object(r)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
        });
  }
  return e;
}
var u = {
    'zh-CN': d({}, { 'site.title': '站点 - 标题', 'about.title': '关于 - 标题' }),
    'en-US': d({}, { 'site.title': 'English Title', 'about.title': 'About - Title' }),
  },
  m = function (o) {
    return e.createElement(
      'div',
      { className: c },
      e.createElement(
        t,
        { locale: o.lang, messages: u[o.lang] },
        e.createElement(
          'div',
          { style: { background: 'red', color: 'white' } },
          e.createElement(r, { id: 'about.title' }),
        ),
        e.createElement('p', null, e.createElement(r, { id: 'site.title' })),
      ),
    );
  };
m.defaultProps = { type: 'primary', text: '文本内容...', color: 'red', lang: 'zh-CN' };
export { m as default, p as schema, l as template };
