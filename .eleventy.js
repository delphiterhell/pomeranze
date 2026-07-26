module.exports = function (eleventyConfig) {
  // Passthrough: static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");

  // Passthrough: static HTML pages (non toccate da Eleventy)
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("chi-sono.html");
  eleventyConfig.addPassthroughCopy("prodotti.html");
  eleventyConfig.addPassthroughCopy("workshop.html");
  eleventyConfig.addPassthroughCopy("contatti.html");

  // Filtro data in italiano
  eleventyConfig.addFilter("dataItaliana", function (date) {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Ordina articoli blog dal più recente
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
