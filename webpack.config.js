var webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: './src/js/ts/app.ts',
    output: {
        filename: './src/js/bundle.js',
        //path: path.join(__dirname, "dist"),
        //publicPath: "./src/",

        //chunkFilename: "[chunkhash].js"
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    //   // Add minification
    //   plugins: [
    //     new webpack.optimize.UglifyJsPlugin()
    //   ],
    module: {
        loaders: [
            //typescript loader
            { test: /\.ts$/, loader: 'ts' },
            
            // required for bootstrap icons
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },
        ]
    }
}
