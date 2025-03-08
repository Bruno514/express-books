const db = require("../db/queries");

async function indexGet(req, res) {
  res.render("index", {
    title: "Index Page",
    format: format,
  });
}

module.exports = { indexGet };
