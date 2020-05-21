const path = require('path')
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')
const flow = require('rollup-plugin-flow-no-whitespace')
const version = process.env.VERSION || require('../package.json').version
const weexVersion = process.env.WEEX_VERSION || require('../packages/weex-vue-framework/package.json').version
const featureFlags = require('./feature-flags')

const banner =
  '/*!\n' +
  ` * chameleon-runtime.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} startheart\n` +
  ' * Released under the Apache License.\n' +
  ' */'

const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const genBuilds = platform => ({
  // bundlers: e.g. Webpack & Browserify & Rollup
  // cjs-dev  (for bundlers)
  'runtime-cjs-dev': {
    entry: resolve(`${platform}/index.js`),
    dest: resolve(`dist/${platform}/runtime.common.dev.js`),
    format: 'cjs',
    env: 'development',
    transpile: true, // 是否经过babel
    banner
    // moduleName: 'xxx',
    // plugins: [node(), cjs()],
    // alias: { he: './entity-decoder' },
    // external: Object.keys(require('../packages/vue-template-compiler/package.json').dependencies)
  },
  // cjs-prod (for bundlers)
  'runtime-cjs-prod': {
    entry: resolve(`${platform}/index.js`),
    dest: resolve(`dist/${platform}/runtime.common.prod.js`),
    format: 'cjs',
    env: 'production',
    transpile: true, // 是否经过babel
    banner
  },
  // esm (for bundlers)
  'runtime-esm': {
    entry: resolve(`${platform}/index.js`),
    dest: resolve(`dist/${platform}/runtime.esm.js`),
    format: 'es',
    transpile: true,
    banner
  },
  // esm-dev (for direct import in browser without transpile)
  'runtime-esm-browser-dev': {
    entry: resolve(`${platform}/index.js`),
    dest: resolve(`dist/${platform}/runtime.esm.browser.js`),
    format: 'es',
    transpile: false,
    env: 'development',
    banner
  },
  // esm-prod (for direct import in browser without transpile)
  'runtime-esm-browser-prod': {
    entry: resolve(`${platform}/index.js`),
    dest: resolve(`dist/${platform}/runtime.esm.browser.min.js`),
    format: 'es',
    transpile: false,
    env: 'production',
    banner
  },
  // umd-dev (for browser)
  'runtime-umd-dev': {
    entry: resolve(`${platform}/index.js`),
    dest: resolve(`dist/${platform}/runtime.umd.js`),
    format: 'umd',
    transpile: true,
    env: 'development',
    banner
  },
  // umd-prod (for browser)
  'runtime-umd-prod': {
    entry: resolve(`${platform}/index.js`),
    dest: resolve(`dist/${platform}/runtime.umd.min.js`),
    format: 'umd',
    transpile: true,
    env: 'production',
    banner
  }
})

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version
  }
  // feature flags
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${key}`] = featureFlags[key]
  })
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
