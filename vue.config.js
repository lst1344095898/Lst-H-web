module.exports = {
    devServer:{
        port:8011,
        proxy:{
            '/api' : {
                target:'http://localhost:8022',
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    },
}