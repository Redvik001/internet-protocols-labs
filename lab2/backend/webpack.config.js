const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: NODE_ENV,
    entry: {
        "main": './main.ts'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV === 'development' ? "eval" : "source-map",
    watchOptions: {
        ignored: /node_modules/
    },
    // node: {  // __dirname был равен "/" без этого
    //     __filename: false,
    //     __dirname: false
    // },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ],
    },
    plugins: []
};