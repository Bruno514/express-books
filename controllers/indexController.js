const db = require("../db/queries");
const { countryCodeToFlag } = require("../misc/countryCodeToFlag");

exports.getIndex = async (req, res) => {
  const books = await db.getBooks();
  const genres = await db.getGenres();
  let authors = (await db.getAuthors()).map((author) => {
    return { ...author, flag: countryCodeToFlag(author.nationality) };
  });

  res.render("index", {
    title: "Index Page",
    books: books,
    genres: genres,
    authors: authors,
  });
};
