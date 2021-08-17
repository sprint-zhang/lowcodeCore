// https://umijs.org/config/
import { defineConfig } from 'umi';
// @ts-ignore
import {
  routerMode,
  themeColors,
  brandPrimary,
  brandSuccess,
  brandWarning,
  brandError,
  brandImportant,
  fillBody,
  proLayoutSettings,
} from './settings';
import proxy from './proxy';
import routes from './routes';
import { resolve } from 'path';

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const ThemeColorReplacer = require('webpack-theme-color-replacer');

export default defineConfig({
  publicPath: './',
  hash: true,
  // mfsu: {}, // https://github.com/umijs/umi/issues/6766
  antd: {},
  dva: {
    hmr: true,
    immer: {
      enableES5: true,
    },
  },
  history: {
    type: routerMode,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    // loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    '@brand-primary': brandPrimary,
    '@brand-success': brandSuccess,
    '@brand-warning': brandWarning,
    '@brand-error': brandError,
    '@brand-important': brandImportant,
    '@fill-body': fillBody,
  },
  title: proLayoutSettings.title,
  ignoreMomentLocale: true,
  proxy: proxy['dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {
    target: 'es5',
  },
  alias: {
    '@': resolve(__dirname, '../src'),
    // 组件库
    '@components': resolve(__dirname, '../src/components'),
    // config目录库
    '@config': resolve(__dirname, './'),
  },
  // 打包生成对应gzip文件，nginx开启gzip，减小文件体积，提高加载速度
  chainWebpack: (config) => {
    config.plugin('webpack-theme-color-replacer').use(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors.css',
        matchColors: getAntdSerials(brandPrimary), // 主色系列 108ee9
        isJsUgly: process.env.NODE_ENV !== 'development',
      }),
    );
    // 生产模式开启
    if (process.env.NODE_ENV === 'production') {
      config.merge({
        optimization: {
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 3,
            automaticNameDelimiter: '.',
            cacheGroups: {
              vendor: {
                name: 'vendors',
                // @ts-ignore
                test({ resource }) {
                  return /[\\/]node_modules[\\/]/.test(resource);
                },
                priority: 10,
              },
            },
          },
        },
      });

      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          // filename: 文件名称，这里不设置，让他保持和未压缩的文件同一个名称
          algorithm: 'gzip', // 指定生成gzip格式
          test: productionGzipExtensions, // 匹配对于格式文件进行压缩
          threshold: 10240, // 对超过10k的数据进行压缩
          minRatio: 0.6, // 压缩比例，值为0~1
        }),
      );
    }
  },
});

function getAntdSerials(color: any) {
  const lightens = new Array(9).fill().map((t, i) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / 10);
  });
  // 默认颜色 themeColors
  return [...themeColors, ...lightens];
}
