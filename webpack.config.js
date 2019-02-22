const path = require('path');
const webpack = require('webpack');

module.exports = function config(env) {
    let opts = {
        entry: {
            main: path.join(__dirname, 'ts', 'app.tsx'),
            seeder: path.join(__dirname, 'ts', 'services', 'seeder.ts'),
        },
        output: {
            filename: '[name].js',
            sourceMapFilename: '[name].js.map',
            path: path.join(__dirname, 'docs'),
        },
        resolve: {
            extensions: ['.wasm', '.mjs', '.js', '.json', '.tsx', '.ts', '.jsx']
          },
        module: {
            rules: [{
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: 'ts-loader'
            }]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
        }
    };
    opts.devtool = 'source-map';
    if (env === 'prod') {
        opts.mode = 'production';
        opts.output.path = path.join(__dirname, 'docs');
    } else {
        opts.mode = 'development';
        opts.devServer = {
        }
    }
    return opts;
}