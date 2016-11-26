/* eslint indent: ["error", 2] */
module.exports = function (config) {
  config.set({
    frameworks: [
      "jasmine",
      "fixture"
    ],

    files: [
      "https://code.jquery.com/jquery-latest.min.js",
      "https://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
      "jquery.in-place-editor.js",
      "jquery.dropdown-select.js",
      "jquery.swivel.js",
      "test/**/*.js",
      "test/**/*.html"
    ],

    preprocessors: {
      "test/**/*.html": ["html2js"],
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
