module.exports = {
  devServer: {
    // 自动更新
    hot:true,  
    //自动启动
    open : true, 
    // // host:'localhost',
    // // port:8080,
    // proxy: {
    //   '/api': {
    //     target: 'http://mall-pre.springboot.cn',
    //     // ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api':''
    //     }
    //   }
    // }
  }
}