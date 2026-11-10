import { existsSync } from 'node:fs';
import path from 'node:path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { type Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const root = import.meta.dirname;

// Node reads .env natively (no dotenv). Only PUBLIC_* keys reach the browser.
const envFile = path.join(root, '.env');
if (existsSync(envFile)) process.loadEnvFile(envFile);

const publicEnv = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith('PUBLIC_'))
);

type Env = { WEBPACK_SERVE?: boolean };
type Argv = { mode?: Configuration['mode'] };

export default (env: Env, argv: Argv): Configuration => {
  const isProd = argv.mode === 'production';
  const isDevServer = Boolean(env.WEBPACK_SERVE);

  // SWC transpiles TS/TSX (no type checking — `tsc --noEmit` does that).
  const swc = (tsx: boolean) => ({
    test: tsx ? /\.tsx$/ : /\.ts$/,
    exclude: /node_modules/,
    use: {
      loader: 'swc-loader',
      options: {
        jsc: {
          target: 'es2024',
          parser: { syntax: 'typescript', tsx },
          transform: {
            react: {
              runtime: 'automatic',
              development: !isProd,
              refresh: isDevServer
            }
          }
        }
      }
    }
  });

  const devServer: DevServerConfiguration = {
    port: 7890,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    static: false,
    client: { overlay: { errors: true, warnings: false } },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:7891',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    ]
  };

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',

    output: {
      path: path.resolve(root, 'dist'),
      publicPath: '/',
      clean: true,
      filename: isProd ? 'js/[name].[contenthash:8].js' : '[name].js',
      chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : '[name].js'
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      // Aliases come straight from tsconfig.json `paths` — one source of truth.
      tsconfig: true
    },

    module: {
      rules: [
        swc(true),
        swc(false),
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                // *.module.css → CSS Modules with `import styles from '...'`
                modules: {
                  auto: true,
                  namedExport: false,
                  exportLocalsConvention: 'as-is'
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
          type: 'asset',
          generator: { filename: 'assets/images/[name].[contenthash:8][ext]' }
        },
        {
          test: /\.(woff2?|ttf|otf)$/i,
          type: 'asset/resource',
          generator: { filename: 'assets/fonts/[name].[contenthash:8][ext]' }
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/microsoft.svg'
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(publicEnv)
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css'
        }),
      isDevServer && new ReactRefreshWebpackPlugin()
    ],

    optimization: {
      runtimeChunk: 'single',
      splitChunks: { chunks: 'all' }
    },

    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [import.meta.filename, path.join(root, 'tsconfig.json')]
      }
    },

    devServer
  };
};
