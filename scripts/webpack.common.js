const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const gbpWebPlugins = {
  stitch: path.join(process.cwd(), 'src', 'javascript', 'stitch', 'index.js'),
  customPixels: path.join(process.cwd(), 'src', 'javascript', 'customPixels', 'index.js'),
  svgize: path.join(process.cwd(), 'src', 'javascript', 'svgize', 'index.js'),
  exampleDummy: path.join(process.cwd(), 'src', 'javascript', 'examples', 'dummy.js'),
  exampleSkeleton: path.join(process.cwd(), 'src', 'javascript', 'examples', 'skeleton.js'),
  randomGeneratedBunch: path.join(process.cwd(), 'src', 'javascript', 'random-generated-bunch', 'index.js'),
  gbdkTiles: path.join(process.cwd(), 'src', 'javascript', 'gbdk-tiles', 'index.js'),
  toSav: path.join(process.cwd(), 'src', 'javascript', 'to-sav', 'index.js'),
  average: path.join(process.cwd(), 'src', 'javascript', 'average', 'index.js'),
  gcode: path.join(process.cwd(), 'src', 'javascript', 'gcode', 'index.js'),
};

module.exports = () => ({
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  entry: gbpWebPlugins,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: path.join(process.cwd(), 'src'),
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        include: path.join(process.cwd(), 'src'),
      },
      {
        test: /\.(png|jpg|gif|sav)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {},
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: /^\**!|@preserve|@license|@cc_on/i,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gameboy Printer Web Plugins',
      pluginList: Object.keys(gbpWebPlugins)
        .map((name) => (
          `<li>
            <a href="./${name}.js">${name}</a>
            <a class="install" target="webapp" data-name="${encodeURIComponent(`${name}.js`)}">🔗 install</a>
          </li>`
        ))
        .join(''),
      template: './src/assets/index.html',
      filename: 'index.html',
      favicon: './src/assets/images/favicon.png',
      chunks: [],
    }),
  ],
});
