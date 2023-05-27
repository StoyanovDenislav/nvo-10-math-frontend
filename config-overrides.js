const webpack = require("webpack");
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    url: require.resolve("url"),
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    fs: false, // or replace with appropriate polyfill if needed
    path: require.resolve("path-browserify"),
    process: require.resolve("process/browser"),
    dns: require.resolve("dns"),
    net: require.resolve("net"),
    tls: require.resolve("tls"),
    timers: require.resolve("timers-browserify"),
    zlib: require.resolve("browserify-zlib"),
    process: require.resolve("process/browser"),
    dgram: false,
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
