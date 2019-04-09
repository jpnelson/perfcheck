const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const crypto = require("crypto");

const { cacheDir } = require("./find-cache-dir");
const pkg = require("../package.json");

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
      harness: path.join(__dirname, "harness.jsx"),
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
          //   meta: { files: JSON.stringify(files) },
          filename: `${entryName}.html`,
          chunks: [entryName, "harness"],
          chunksSortMode: "manual"
        });
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
