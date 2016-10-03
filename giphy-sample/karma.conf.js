module.exports = function (config) {
  config.set({
    frameworks: [
      "jasmine",
      "fixture"
    ],

    files: [
      "*.js",
      "https://code.jquery.com/jquery-1.11.3.min.js",
      "test/**/*.js",
      "test/**/*.html"
    ],

    preprocessors: {
      "test/**/*.html": ["html2js"]
    },

    browsers: [
      "Firefox"
    ],

    reporters: ["dots"]
  });
};
