const path = require("path");
const glob = require("glob");

module.exports = {
  mode: "production", // Optimized for production
  entry: () =>
    glob
      // include json file also
      .sync("./{src,utils}/**/*{.js,.json}") // Match JS files in `src` and `utils`
      .reduce((entries, filePath) => {
        const entryName = filePath
          .replace("./", "") // Remove the root "./"
          .replace(/\.js$/, ""); // Remove the .js suffix
        entries[entryName] = filePath; // Map entry name to the file path
        return entries;
      }, {}),
  output: {
    filename: "[name].js", // Output matches the folder structure
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Use modern JavaScript
          },
        },
      },
    ],
  },
  optimization: {
    usedExports: true, // Enable tree-shaking
  },
  resolve: {
    extensions: [".js", ".json"], // Add extensions to resolve
    preferRelative: true, // Treat module paths as relative first
  },
};
