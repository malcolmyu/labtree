module.exports = {
    entry: 'entry.js',
    output: {
        path: __dirname,
        filename: 'main.js'
    },
    resolve: {
        extensions: ['', 'scss', '.coffee', '.js']
    },
    module: {
        loaders: [
            { test: /\.html/, loader: 'html-loader' },
            { test: /\.coffee$/, loader: 'coffee-loader' },
            { test: /\.scss/, loader: 'style!css!sass' }
        ]
    }
};