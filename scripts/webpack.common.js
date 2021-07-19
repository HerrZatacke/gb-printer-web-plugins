const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const gbpWebPlugins = {
  customPixels: path.join(process.cwd(), 'src', 'javascript', 'customPixels', 'index.js'),
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
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: (fileData) => (
            // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
            `${fileData.filename}.l.txt${fileData.query}`
          ),
          banner: (licenseFile) => (
            `License information can be found in ${licenseFile}`
          ),
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gameboy Printer Web Plugins',
      pluginList: Object.keys(gbpWebPlugins).map((name) => (
        `<li><a href="./${name}.js">${name}</a></li>`
      )),
      template: './src/assets/index.html',
      filename: 'index.html',
      favicon: './src/assets/images/favicon.png',
      chunks: [],
    }),
    new NodePolyfillPlugin(),
  ],
});
