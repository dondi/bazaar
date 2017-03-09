/* eslint indent: ["error", 2] */
module.exports = function (config) {
  config.set({
    frameworks: [
      "jasmine"
    ],

    files: [
      "*.js",
      "test/**/*.js"
    ],

    preprocessors: {
      "*.js": ["coverage"]
    },

    browsers: [
      "Chrome", "Firefox"
    ],

    reporters: [
      "dots",
      "coverage"
    ]
  });
};
