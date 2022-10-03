const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //This property defines where the application starts
    entry: './src/index.js',

    //This property defines the file path and the file name which will be used for deploying the bundled file
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    //Setup loaders
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(gif|png|jpeg|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
        ],
    },

    // Setup plugin to use a HTML file for serving bundled js files
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]
}