import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

const resolve = {
    alias: {
        '~': path.resolve(__dirname, 'src/js')
    }
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
                },
            ]
        },
    ]
};

export default [
    {
        entry: {
            core: './src/js/core/index.js',
            client: './src/js/client/index.js',
            app: './src/js/index.js'
        },
        resolve,
        module,
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/build'),
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist/build'),
            compress: true,
            port: 9000
        },
        devtool: 'source-map',
        plugins: [
            new HtmlWebpackPlugin({
                alwaysWriteToDisk: true
            }),
            new HtmlWebpackHarddiskPlugin()
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
    }
]
