const db = require("../db/queries");

exports.getIndex = async (req, res) => {
  const books = await db.getBooks();

  res.render("index", {
    title: "Index Page",
    books: books,
  });
};
