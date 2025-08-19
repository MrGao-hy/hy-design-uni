const path = require('path')

module.exports = {
  components: ['../src/package/components/**/**.vue'],
  outDir: 'dist/docs',
  apiOptions: {
    jsx: false,
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    babelParserPlugins: ['typescript'],
  },
}
