/* eslint-disable no-unused-vars */
const path = require('path');
const { host, keyPrefix } = require('./build/config');
const configData = require('./build/exportConfig');

console.log('configData===', configData);
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  // 关闭生产环境下的资源映射
  productionSourceMap: false,
  // 环境变量中存储的是开发环境是生产环境
  publicPath: isProduction && process.env.VUE_APP_StagingBundle ? `https:${host}${keyPrefix}` : './',
  // 设置一些webpack配置项，用这些配置项和默认的配置项合并 
  configureWebpack: {
    stats: {
      timings: true,
    },
    plugins: [new CompressionWebpackPlugin({
      filename: info => `${info.path}.gz${info.query}`,
      algorithm: 'gzip', 
      threshold: 10240,
      test: new RegExp(`\\.(${ 
        ['js'].join('|') 
      })$`),
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
    ],
  },
  // 生产环境下是 true，开发环境下是 false 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
  css: {
    extract: isProduction,
  },
  // 直接去修改内置的webpack配置项
  chainWebpack: (config) => {
    // config.module.rules.delete('js'); //直接关掉js编译
    config.plugins.delete('preload'); 
    config.plugins.delete('prefetch');
    config.resolve.alias
      .set('views', path.resolve('src/views'))
      .set('common', path.resolve('src/common'));
    config.externals({
      moment: 'moment',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
    });
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
      .end();
    // manifest
    const opt = config.optimization;
    // minimize 压缩js代码
    opt.minimize(true);
    opt.runtimeChunk({ name: 'manifest' });
    opt.minimizer = [
      new UglifyPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true, // console
            drop_debugger: false,
            pure_funcs: ['console.log'], // 移除console
          },
        },
      }),
    ];
    opt.splitChunks(Object.assign({}, opt.get('splitChunks'), {
      // （缺省值5）按需加载时的最大并行请求数
      maxAsyncRequests: 16,
      // （默认值3）入口点上的最大并行请求数
      maxInitialRequests: 16,
      // （默认值：1）分割前共享模块的最小块数
      minChunks: 1,
      // （默认值：30000）块的最小大小
      minSize: 30000,
      // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
      automaticNameDelimiter: '~',
      // cacheGroups is an object where keys are the cache group names.
      name: true,
      cacheGroups: {
        default: false,
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        async: {
          name: 'chunk-async',
          minChunks: 2,
          priority: -30,
          chunks: 'async',
          reuseExistingChunk: true,
        },
      },
    }));
  },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      globDirectory: 'dist',
      globPatterns: ['**/*.{js,png,jpg,gif,ico,html,css,eot,svg,ttf,json}'],
      exclude: [/\.html$/],
      manifestTransforms: [
        // Basic transformation to remove a certain URL:
        (originalManifest) => {
          const manifest = [{
            url: './index.html',
            revision: Date.now(),
          }];
          // Optionally, set warning messages.
          const warnings = [];
          return { manifest, warnings };
        },
      ],
      // swSrc is required in InjectManifest mode.
      // swSrc: 'public/workbox-sw.js',
      importWorkboxFrom: 'local',
      // ...other Workbox options...
    },
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    // 本地开发用mock
    before: configData.Mocks ? require('./mock.config') : () => {},
    // 联调用proxy
    proxy: {
      '/api': {
        target: 'http://fengcao1.toutiaovideo.cn/',
        // target: configData.proxy ? 'http://192.168.240.192:8096' : 'localhost',
        changeOrigin: true,
        // pathRewrite: { '/api': '' },
      },
    },
  },
};
