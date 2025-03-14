const db = require("../db/queries");

exports.getIndex = async (req, res) => {
  const books = await db.getBooks();
  const genres = await db.getGenres();
  const authors = await db.getAuthors();

  res.render("index", {
    title: "Index Page",
    books: books,
    genres: genres,
    authors: authors,
  });
};
