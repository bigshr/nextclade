require('./config/dotenv')
const path = require('path')

const { findModuleRoot } = require('./lib/findModuleRoot')

const { moduleRoot } = findModuleRoot()

const development = process.env.NODE_ENV === 'development'
const production = process.env.NODE_ENV === 'production'
const analyze = process.env.ANALYZE === '1'
const debuggableProd = process.env.DEBUGGABLE_PROD === '1'

module.exports = (api) => {
  const web = api.caller((caller) => caller?.target === 'web')
  // const test = api.caller((caller) => caller?.name === 'babel-jest')
  const node = api.caller((caller) => caller?.name === '@babel/node')

  return {
    compact: false,
    presets: [
      [
        'next/babel',
        {
          'preset-env': {
            useBuiltIns: 'usage',
            corejs: '3',
            modules: web ? false : undefined,
          },
          // 'transform-runtime': {},
          // 'styled-jsx': {},
          // 'class-properties': { loose: true },
          // 'preset-typescript': {
          //   onlyRemoveTypeImports: true,
          // },
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      'babel-plugin-parameter-decorator',
      // ['@babel/plugin-proposal-decorators', { legacy: true }],
      // '@babel/plugin-proposal-class-properties',
      // 'babel-plugin-transform-typescript-metadata',
      '@babel/plugin-proposal-numeric-separator',
      'babel-plugin-styled-components',
      'babel-plugin-lodash',
      (development || debuggableProd) && web && !analyze && ['babel-plugin-typescript-to-proptypes', { typeCheck: './src/**/*.ts' }], // prettier-ignore
      (development || debuggableProd) && web && !analyze && 'babel-plugin-redux-saga', // prettier-ignore
      (development || analyze || debuggableProd) && web && 'babel-plugin-smart-webpack-import', // prettier-ignore
      production && web && ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }], // prettier-ignore
      production && web && '@babel/plugin-transform-flow-strip-types',
      !(development || debuggableProd) && web && '@babel/plugin-transform-react-inline-elements', // prettier-ignore
      !(development || debuggableProd) && web && '@babel/plugin-transform-react-constant-elements', // prettier-ignore
      node && [
        'babel-plugin-module-resolver',
        {
          root: [moduleRoot],
          removeImport: false,
          alias: {
            'src': path.join(moduleRoot, 'src'),
            '@extensions': moduleRoot,
          },
        },
      ],
    ].filter(Boolean),
  }
}
