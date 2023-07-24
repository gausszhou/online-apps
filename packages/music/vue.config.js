module.exports = {
  // 配置路径
  publicPath: process.env.NODE_ENV === "production" ? "/apps/music/" : "/",
  // dev
  devServer: {
    https: false,
    open: false
  },
  // build
  // 输出目录
  outputDir: '../../dist/music',
  assetsDir:'static',
  // 生成map文件
  productionSourceMap: false,
  // 文件哈希值
  filenameHashing: true
};
