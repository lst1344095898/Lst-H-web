module.exports = {
    devServer:{
        port:8011,
        proxy:{
            '/api' : {
                target:'localhost:8080/lst-hwfyh-api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    },
}
