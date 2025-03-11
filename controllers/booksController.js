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
  body("authorId").trim().isNumeric().withMessage(`Author ID is invalid.`),
  body("genreId").trim().isNumeric().withMessage(`Genre ID is invalid.`),
  body("releaseDate")
    .trim()
    .isDate({ format: "yyyy-mm-dd" })
    .withMessage(`Release date ${dateError}`)
    .escape(),
  body("pages").trim().isNumeric().withMessage(`Pages ${numericError}`),
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

    const { title, authorId, genreId, pages, releaseDate } = req.body;
    db.addBook(title, authorId, genreId, pages, releaseDate);

    res.redirect("/");
  },
];
