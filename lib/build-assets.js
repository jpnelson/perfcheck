const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { cacheDir } = require("./find-cache-dir");
const pkg = require("../package.json");

module.exports.buildAssets = async ({ perfcheck }) => {
  const compiler = webpack({
    mode: "production",
    entry: {
      perfcheck: perfcheck,
      harness: path.join(__dirname, "harness.jsx")
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin()],
    output: {
      filename: "[name].js",
      path: cacheDir
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    }
  });

  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true // Shows colors in the console
      })
    );
  });
};
