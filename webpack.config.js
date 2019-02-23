const path = require('path');

module.exports = {
    entry : {
        Vision:'./src/FrontEnd/Cognitive/Vision/DemoVision.js',
        Modal: './src/FrontEnd/Modal/Modal.js'},
    output : {
        path: path.join(__dirname , '/src/public/demos/js'),
        filename: '[name]/bundle.js'
    },
    module:{
        rules : [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'],
            }
        ]
    }
}
