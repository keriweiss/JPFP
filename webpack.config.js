module.exports = {
  entry: ['./client/index.js', '@babel/polyfill'],
  output: {
    path: __dirname,
    filename: './dist/main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};
