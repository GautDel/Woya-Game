module.exports = {
  entry: "./src/assets/js/index.js",

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "/src/assets/imgs"
          }
        }
      }
    ]
  }
};
