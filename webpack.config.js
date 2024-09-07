import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 7890,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:7891',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false
      }
    ]
  },
  module: {
    rules: [
      {
        test:/\.(j|t)sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, 'src')
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          },
          to: 'assets'
        }
      ]
    }),
    new ESLintWebpackPlugin({ 
      context: path.resolve(__dirname, 'src'),
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules',
      configType: 'flat'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
};
