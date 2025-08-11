export default {
  entry: "./src/index.js",
  module: {
    rules: [
      //...
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"], // Use @svgr/webpack for React components
          },
          {
            type: "asset/resource", // Fallback to asset/resource for other cases
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  //...
};