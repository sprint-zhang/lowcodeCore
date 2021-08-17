/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

import { proxyUrl } from './settings';

export default {
  dev: {
    '/api/': {
      target: proxyUrl,
      changeOrigin: true,
    },
    '/WebCore': {
      target: proxyUrl,
      changeOrigin: true,
    },
    '/mock/': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: proxyUrl,
      changeOrigin: true,
    },
  },
  pre: {
    '/api/': {
      target: proxyUrl,
      changeOrigin: true,
    },
  },
};
