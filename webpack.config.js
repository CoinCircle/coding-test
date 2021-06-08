const webpack = require('webpack');
const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { ESBuildPlugin } = require('esbuild-loader')

const glob = require('glob');

const ROOT = path.resolve(__dirname);



 /* =============================================================================
 =  Shared
 ============================================================================= */
 const shared = {
   mode: 'development',
   resolve: {
     // Allows us to leave off file extensions in imports
     extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.mjs'],

     // resolve.modules tells webpack where to look when we import modules into a file
     modules: ['node_modules'],

     // resolve.alias allows us to import modules using these keywords
     alias: {
       client: path.join(ROOT, './src/client'),
       server: path.join(ROOT, './src/server'),
       shared: path.join(ROOT, './src/shared'),
     },
   },

   plugins: [
     new ESBuildPlugin(),
   ]
 };

 /* =============================================================================
 =  Client
 ============================================================================= */
 const client = merge(shared, {
   name: 'client',
   // Entry tells webpack where to start
   entry: path.join(ROOT, './src/client/index.ts'),

   watchOptions: {
     ignored: /node_modules/,
   },

   // Output tells webpack where the results should go
   output: {
     path: path.resolve(ROOT, 'public/bundles'),
     publicPath: '/bundles/',
     filename: `main.bundle.js`,
     chunkFilename: '[name].bundle.js'
   },

   resolve: {
     modules: [path.join(ROOT, './src/client')],

     alias: {
       client: path.join(ROOT, './src/client'),
       shared: path.join(ROOT, './src/shared')
     },

     // polyfill node libs used by some client-side js libs
     // @todo remove these and update libs accordingly
     fallback: {
       util: require.resolve("util/"),
      //  crypto: require.resolve('crypto-browserify'),
      //  stream: require.resolve('stream-browserify'),
      //  assert: require.resolve('assert/'),
      //  https: require.resolve('https-browserify'),
      //  http: require.resolve('stream-http'),
      //  path: require.resolve('path-browserify')
     }
   },

   module: {
     rules: [
       {
         test: /(node_modules\/mocha\/.*\.js)$/,
         loader: 'shebang-loader'
       },
       {
         test: /\.tsx?$/,
         exclude: /(node_modules|bower_components)/,
         use: [
           {
             loader: 'esbuild-loader',
             options: {
               loader: 'tsx',
               logLevel: 'info',
             }
           }
         ]
       },
       {
         test: /\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         use: [
           {
             loader: 'esbuild-loader',
             options: {
               loader: 'jsx',
               target: 'es2015'
             }
           }
         ]
       },
       {
         test: /\.mjs$/,
         include: /node_modules/,
         type: "javascript/auto",
       }
     ]
   },

   plugins: [
     new webpack.IgnorePlugin(/^fs$/),
     new webpack.ProvidePlugin({
       Buffer: ['buffer', 'Buffer'],
       process: 'process/browser'
     }),
   ]
 });

 /* =============================================================================
 =  Server
 ============================================================================= */
 const server = merge(shared, {
   name: 'server',
   // The server config also builds the workers
   entry: {
     server: path.join(ROOT, './src/server/index.ts')
   },

   output: {
     path: path.resolve(ROOT, 'dist'),
     filename: '[name].js',
     globalObject: 'this'
   },

   module: {
     rules: [
       {
         test: /(node_modules\/mocha\/.*\.js)$/,
         loader: 'shebang-loader'
       },
       {
         test: /\.tsx?$|\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         use: [{
           loader: 'esbuild-loader',
           options: {
             loader: 'tsx',
             logLevel: 'info',
           }
         }]
       }
     ]
   },

   // Target tells webpack that we intend to run this code in a Node.js environment
   target: 'node12',

   // nodeExternals function tells webpack not to bundle dependencies from node_modules
   externals: [
     nodeExternals(),
     function({context, request}, callback) {
       if (/^(fsevents|util)$/.test(request)) {
         return callback(null, 'commonjs ' + request);
       }
       callback();
     }
   ],


   resolve: {
     modules: [path.join(ROOT, './src/server')],

     alias: {
       server: path.join(ROOT, './src/server'),
     }
   },

   plugins: [
     new webpack.ProvidePlugin({
       Promise: 'bluebird'
     }),
   ]
 });

 module.exports = [client, server];
