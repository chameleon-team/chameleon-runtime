
const path = require('path');

cml.config.merge({
  templateLang: "cml",
  templateType: "smarty",
  enableGlobalCheck: false,
  wx: {
    dev: {
    },
    build: {
    },
    export: {
      entry: ['index.js'],
      publicPath: '/',
      outputPath: path.resolve(__dirname, 'dist/wx'),
      hash: false
    }
  },
  web: {
    dev: {
      analysis: false,
      console: false,
      babelPolyfill: true
    },
    build: {
      analysis: false,
      babelPolyfill: true
    },
    export: {
      entry: ['index.js'],
      publicPath: '/',
      outputPath: path.resolve(__dirname, 'dist/web'),
      hash: false,
      externals: {
        'chameleon-api': 'chameleon-api'
      }
    }
  },
  weex: {
    dev: {
    },
    build: {
    },
    export: {
      entry: ['index.js'],
      publicPath: '/',
      outputPath: path.resolve(__dirname, 'dist/weex'),
      hash: false
    }
  }
})

cml.utils.plugin('webpackConfig', function({ type, media, webpackConfig }, cb) {

  // cb函数用于设置修改后的配置
  if (type === 'weex') {
    webpackConfig.resolve.alias['chameleon-runtime'] = path.resolve(__dirname, 'index.js');
  }
  if (type === 'wx') {
    delete webpackConfig.target;
    delete webpackConfig.output.jsonpFunction;
    webpackConfig.output.libraryTarget = 'umd';
    webpackConfig.output.filename = '[name].js';
    let index  = webpackConfig.plugins.findIndex(item => item.constructor.name === 'CommonsChunkPlugin')
    webpackConfig.plugins.splice(index, 1);
    webpackConfig.externals = {
      'mobx': 'mobx'
    }
  }
  webpackConfig.entry = {
    'index': path.resolve(__dirname, 'index.js')
  }
  webpackConfig.module.rules.push({
    test: /\.js$/,
    // 不能babel babel-runtime
    include: [path.join(cml.projectRoot, 'src'), path.join(cml.projectRoot, 'index.js')],
    use: [{
      loader: 'babel-loader',
      options: {
        'filename': path.join(cml.root, 'chameleon.js')
      }
    }]
  });
  cb({
    type,
    media,
    webpackConfig
  });
});