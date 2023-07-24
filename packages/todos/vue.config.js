module.exports = {
  // 配置相对路径
  publicPath: process.env.NODE_ENV === "production" ? "/apps/todos/" : "/",
    // dev
    devServer: {
      https: false,
      open: false
    },
  // 输出目录
  outputDir: '../../dist/todos',
  // js css img 的目录
  assetsDir: "static",
  // 是否生成生成map文件
  productionSourceMap: false,
  // 是否生成文件哈希值
  filenameHashing: true,
};
