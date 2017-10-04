import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const resolve = {
    alias: {
        '~': path.resolve(__dirname, 'src/js')
    }
};

const output = {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/build'),
};

const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            ]
        },
    ]
};

export default [
    {
        entry: './src/js/index.js',
        resolve,
        module,
        output,
        devServer: {
            hot: true,
            before: app => {

                // Remap the bundles to root
                app.get('*', (req, res, next) => {
                    req.url = path.join('/dist/build/', req.url);
                    next('route');
                })

            },
            compress: true,
            port: 9000
        },
        devtool: 'source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin()
        ]
    },
    {
        entry: {
            clientNode: './src/js/client/index.js'
        },
        resolve,
        module,
        output: {
            filename: 'templates.js',
            path: path.resolve(__dirname, 'functions'),
            libraryTarget: 'commonjs2'
        },
        target: 'node'
    }
]
