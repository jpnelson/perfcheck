const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const crypto = require("crypto");

const { cacheDir } = require("../find-cache-dir");

function getEntryName(fileName) {
  let hash = crypto
    .createHash("md5")
    .update(path.resolve(fileName))
    .digest("hex")
    .substr(0, 6);

  return `${path.basename(fileName)}~${hash}`;
}

module.exports.buildAssets = async ({ files }) => {
  let entries = {};

  files.forEach(file => {
    entries[getEntryName(file)] = file;
  });

  const compiler = webpack({
    mode: "production",
    entry: {
      app: path.join(__dirname, "../app/index.jsx"),
      harness: path.join(__dirname, "../runtime/harness.jsx"),
      ...entries
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
    plugins: [
      ...Object.keys(entries).map(entryName => {
        return new HtmlWebpackPlugin({
          filename: `${entryName}.html`,
          chunks: [entryName, "harness"],
          chunksSortMode: "manual"
        });
      }),
      new HtmlWebpackPlugin({
        meta: [{ entries: Object.keys(entries) }],
        filename: `index.html`,
        chunks: ["app"]
      })
    ],
    output: {
      filename: "[name].js",
      path: cacheDir
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react-and-react-dom",
            chunks: "all"
          }
        }
      }
    }
  });

  compiler.watch({}, (err, stats) => {
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

  return entries;
};
