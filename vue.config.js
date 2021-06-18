const path = require("path");

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 8009,
    hot: true,
  },
  pluginOptions: {
    // 将要patterns解析到的文件，自动导入到每个组件中
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/styles/_*.less")],
    },
  },
  chainWebpack: config => {
    config.module.rule("svg").uses.clear();
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
  // 生产环境 srouceMap，默认是开启的
  productionSourceMap: false,
};
