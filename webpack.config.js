const webpack = require("@nativescript/webpack");
const { join } = require("path");
module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  webpack.chainWebpack((config) => {
    // Allow RN plugins
    config.resolve.alias.set("react-native", "@open-native/core");
    // react hooks polyfills
    config.resolve.alias.set(
      "react",
      require.resolve(
        join(__dirname, "./src/react-polyfills.js")
      )
    );

	config.module
      .rule('rnmodules')
      .include.add(/node_modules(.*[/\\])+react-native-razorpay*/)
      .end()
      .use('babel-loader')
      .before('ts-loader')
      .loader('babel-loader')
      .options({
        babelrc: false,
        presets: ['module:metro-react-native-babel-preset'],
      });
  });

  return webpack.resolveConfig();
};
