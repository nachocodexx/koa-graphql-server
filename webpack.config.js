const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
    node: {
        __dirname: true
    },
    stats: "errors-only",
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.ts'),
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // {
            //     exclude: /node_modules/,
            //     test: /\.gql$/,
            //     use: 'graphql-import-loader'
            // }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.gql']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
        })
    ]





}

module.exports = config

