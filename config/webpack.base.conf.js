const path = require('path');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const webpackConfig = {
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.ts', '.json', '.vue', '.scss'],
  },
  module: {
    rules:[
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: { appendTsxSuffixTo: [/\.vue$/] }
          },
          {
            loader: 'tslint-loader'
          }
        ]
      }
    ]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

module.exports = webpackConfig;
