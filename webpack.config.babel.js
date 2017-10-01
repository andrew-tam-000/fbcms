import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const entry = {
    core: './src/js/core/index.js',
    client: './src/js/client/index.js',
    app: './src/js/index.js'
}

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
        entry,
        resolve,
        module,
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/build/client'),
        },
        devServer: {
            contentBase: path.join(__dirname, 'src/js'),
            compress: true,
            port: 9000
        },
        devtool: 'source-map',
        plugins: [
            new HtmlWebpackPlugin()
        ]
    },
    {
        entry,
        resolve,
        module,
        output: {
            filename: '[name].node.js',
            path: path.resolve(__dirname, 'dist/build/node'),
            libraryTarget: 'commonjs2'
        },
    }
]
