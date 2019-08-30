let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const vueConfig = {
  publicPath: process.env.VUE_APP_ROOT,
  configureWebpack: {
    plugins: [
      new FaviconsWebpackPlugin({
        logo: './src/assets/logo.png',
        config: {
          appName: 'КиберGe6',
          appDescription: 'Добавена реалност в нереална виртуалност',
          version: '1.0',
          cache: false,
          developerName: 'ZaraLab',
          developerURL: 'https://www.zaralab.org',
          appleStatusBarStyle: 'black-translucent',
          background: "#82aa45",
          theme_color: "#82aa45",
          lang: 'bg-BG',
          display: "standalone",
          orientation: "portrait",
          start_url: "https://bit.ly/cyberge6",
          icons: {
            android: true, // Create Android homescreen icon. boolean or { offset, background, shadow }
            appleIcon: true, // Create Apple touch icons. boolean or { offset, background }
            appleStartup: true, // Create Apple startup images. boolean or { offset, background }
            coast: { offset: 25 }, // Create Opera Coast icon with offset 25%. boolean or { offset, background }
          }
        }
      })
    ]
  }
};

if(process.env.NODE_ENV === 'production') {
  vueConfig.chainWebpack = (config) => {
    config.plugin('html').init((Plugin, args) => {
      const newArgs = {
        ...args[0],
      };
      newArgs.minify.removeAttributeQuotes = false;
      return new Plugin(newArgs);
    });
  };
}

module.exports = vueConfig;