module.exports = {
    devServer:{
        port:8011,
        proxy:{
            '/api' : {
                // target:'http://www.lst8shy.top:8080/hwfyh/',
                target:'http://localhost:8080/',
                // target:'http://localhost:8080/hwfyh',
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    },
}
