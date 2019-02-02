module.exports = function(config) {

  // config.addFilter("dateDisplay", require("./filters/dates.js") );
  // config.addFilter("timestamp", require("./filters/timestamp.js") );
  // config.addFilter("squash", require("./filters/squash.js") );

  return {
    dir: {
      input: "src/html",
      output: "site",
      includes: "_includes"
    },
    templateFormats : ["njk", "md", "html"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };

};
