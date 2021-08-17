/**
 * @description 全局变量配置
 *
 */
export const brandPrimary = '#108ee9'; // 全局品牌色 默认：#108ee9
export const brandSuccess = '#6abf47'; // 成功 默认：#6abf47
export const brandWarning = '#ffc600'; // 警告 默认：#ffc600
export const brandError = '#f4333c'; // 错误 默认：#f4333c
export const brandImportant = '#ff5b05'; // 重要 默认：#ff5b05（如小红点）
export const fillBody = '#f5f5f9'; // 背景 默认：#f5f5f9
export const themeColors = [
  brandPrimary,
  brandSuccess,
  brandWarning,
  brandError,
  brandImportant,
  fillBody,
]; // ['主色','成功','警告','错误','重要','背景']

export const routerMode = 'hash';
export const credentials = 'include';
export const proxyUrl = 'http://172.16.0.142:30016';
export const tokenName = 'token';
export const isRecordRoute = false;
export const isLoginInterception = false;
export const isProcessStrategy = false;
export const isLogo = true;
export const isTags = true;
export const messageDuration = 3000;
export const requestTimeout = 15000;
export const useCache = false;
export const ttl = 60000;
export const maxCache = 0;
export const successCode = 0;
export const proLayoutSettings = {
  navTheme: 'dark',
  fillBody: fillBody, // 页面背景
  brandPrimary: brandPrimary, // 全局品牌色 默认：#108ee9
  headerHeight: 72, // 此高度和上面isTags有一定关联，根据实际情况调整
  siderWidth: 220,
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'edoc2',
  pwa: false,
  iconfontUrl: '',
};

const settings = {
  // 路由模式，可选值为 browser | hash | memory
  routerMode,
  // 发送带凭据的请求，可选值 include > same-origin > omit
  credentials,
  // 开发环境接口
  proxyUrl,
  // token名称
  tokenName,
  // token失效，回退到登录页是否记录本次路由
  isRecordRoute,
  // 是否开启登录拦截
  isLoginInterception,
  // 是否启用流程策略
  isProcessStrategy,
  // 是否显示Logo
  isLogo,
  // 是否显示多标签页
  isTags,
  // 消息框消失时间
  messageDuration,
  // 最长请求时间
  requestTimeout,
  // 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存
  useCache,
  // 缓存时长（毫秒）， 0 为不过期
  ttl,
  // 最大缓存数， 0 为无限制
  maxCache,
  // 操作正常code
  successCode,
  // pro-layout setting
  proLayoutSettings,
};

export default settings;
