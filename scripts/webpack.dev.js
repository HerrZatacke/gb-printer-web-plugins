const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const setupServer = require('./setupServer');
const common = require('./webpack.common');

module.exports = merge(common(), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    inline: true,
    hot: true,
    disableHostCheck: true,
    stats: {
      colors: true,
      assets: false,
      entrypoints: false,
      modules: false,
    },
    overlay: {
      warnings: false,
      errors: true,
    },
    contentBase: path.join(process.cwd(), 'src', 'assets'),
    port: 5000,
    watchContentBase: true,
    host: '0.0.0.0',
    before: setupServer,
  },
  target: 'web',
  optimization: {
    moduleIds: 'named',
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: '\'development\'',
    }),
  ],
});
