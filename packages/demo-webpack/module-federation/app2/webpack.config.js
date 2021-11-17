const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  mode: "development",
  target: "web",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      // library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/Widget",
        "./Store": "./src/Store",
      },
      shared: {
        moment: deps.moment,
        /* moment: {
          eager: true,
          requiredVersion: deps.moment,
        }, */
        react: {
          requiredVersion: deps.react,
          // requiredVersion: '16.14.0',
          // requiredVersion: '^16.11.0',
          // strictVersion: false,
          // version: '16.12.0',
          // requiredVersion: '16.10.0',
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          // singleton: true, // only a single version of the shared module is allowed
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
