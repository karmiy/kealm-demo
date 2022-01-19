module.exports = {
  lintOnSave: false,
  configureWebpack: {
    output: {
      library: "singleVue",
      libraryTarget: "umd",
    },
    devServer: {
      port: 10000,
    },
  },
};
