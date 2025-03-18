const { redirect } = require("express/lib/response");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const emptyError = "can not be empty.";
const lengthError = "can not be too long.";
const dateError = "is an invalid date format.";
const numericError = "can only be a number.";

const bookValidator = [
  body("title")
    .trim()
    .isLength({ max: 255 })
    .withMessage(`Title ${lengthError}`)
    .notEmpty()
    .withMessage(`Title ${emptyError}`)
    .escape(),
  body("summary")
    .trim()
    .isLength({ max: 512 })
    .withMessage(`Summary ${lengthError}`)
    .notEmpty()
    .withMessage(`Summary ${emptyError}`)
    .escape(),
  body("authorId").trim().isNumeric().withMessage(`Author ID is invalid.`),
  body("genreId").trim().isNumeric().withMessage(`Genre ID is invalid.`),
  body("releaseDate")
    .trim()
    .escape()
    .isDate({ format: "yyyy-mm-dd" })
    .withMessage(`Release date ${dateError}`)
    .optional({ values: "falsy" }),
  body("pages")
    .trim()
    .isNumeric()
    .withMessage(`Pages ${numericError}`)
    .optional({ values: "falsy" }),
];

exports.getBookAdd = [
  async function getBookAdd(req, res) {
    res.render("books/add", {
      title: "Add new book",
      authors: await db.getAuthors(),
      genres: await db.getGenres(),
    });
  },
];

exports.getBookEdit = [
  async (req, res) => {
    const { id } = req.params;

    res.render("books/edit", {
      title: "Edit book",
      book: await db.getBookById(id),
      authors: await db.getAuthors(),
      genres: await db.getGenres(),
    });
  },
];

exports.getBookView = [
  async (req, res) => {
    const { id } = req.params;

    res.render("books/view", {
      title: "Viewing book",
      book: await db.getBookById(id),
    });
  },
];

exports.getBookIndex = [
  async (req, res) => {
    res.render("books/index", {
      title: "All books",
      books: await db.getBooks(),
    });
  },
];

exports.postBook = [
  bookValidator,
  async function postBook(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("books/add", {
        title: "Invalid book, try again",
        authors: await db.getAuthors(),
        genres: await db.getGenres(),
        errors: errors.array(),
      });
    }

    const { title, summary, authorId, genreId, pages, releaseDate } = req.body;
    await db.addBook(
      title,
      summary,
      authorId,
      genreId,
      pages || null,
      releaseDate || null
    );

    res.redirect("/");
  },
];

exports.putBook = [
  bookValidator,
  async function putBook(req, res) {
    const { id } = req.params;
    const { title, summary, authorId, genreId, pages, releaseDate } = req.body;

    await db.editBookById(
      id,
      title,
      summary,
      authorId,
      genreId,
      pages,
      releaseDate || null
    );

    res.redirect(`/books/view/${id}`);
  },
];

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  await db.deleteBookById(id);

  res.redirect("/");
};
