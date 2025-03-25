const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const { getCountries } = require("libphonenumber-js");
const { countryCodeToFlag } = require("../misc/countryCodeToFlag");

const emptyError = "can not be empty";
const lengthError = "can not be too long";
const dateError = "is an invalid date format";
const coutryError = "Not a valid country";

const authorValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Name ${emptyError}.`)
    .isLength({ max: 255 })
    .withMessage(`Name ${lengthError}.`),
  body("bio")
    .trim()
    .notEmpty()
    .withMessage(`Bio ${emptyError}.`)
    .isLength({ max: 1000 })
    .withMessage(`Bio ${lengthError}. 1000 characters max.`)
    .escape(),
  body("nationality")
    .trim()
    .isLength({ max: 3 })
    .withMessage(`Nationality ${lengthError}.`)
    .isIn(getCountries())
    .withMessage(coutryError)
    .escape()
    .optional(),
  body("birthDate")
    .trim()
    .isDate()
    .withMessage(`Birth date ${dateError}.`)
    .optional({ values: "falsy" }),
  body("deathDate")
    .trim()
    .isDate()
    .withMessage(`Death date ${dateError}.`)
    .optional({ values: "falsy" }),
];

exports.getAuthorsIndex = async (req, res) => {
  res.render("authors/index", {
    title: "All authors",
    authors: await db.getAuthors(),
  });
};

exports.getAuthorsView = async (req, res) => {
  const { id } = req.params;
  const author = await db.getAuthorById(id);
  const books = await db.getBookByAuthorId(id);

  res.render("authors/view", {
    title: "Viewing author",
    author: { ...author, flag: countryCodeToFlag(author.nationality) },
    books: books,
  });
};

exports.getAuthorsAdd = async (req, res) => {
  res.render("authors/add", {
    title: "Add new author",
    countries: getCountries(),
  });
};

exports.getAuthorsEdit = async (req, res) => {
  const { id } = req.params;

  res.render("authors/edit", {
    title: "Edit author",
    author: await db.getAuthorById(id),
    countries: getCountries(),
  });
};

exports.postAuthor = [
  authorValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("authors/add", {
        title: "Invalid author fields, try again",
        countries: getCountries(),
        errors: errors.array(),
      });
    }

    const { name, bio, country, birthDate, deathDate } = req.body;

    await db.addAuthor(
      name,
      bio,
      country,
      birthDate || null,
      deathDate || null
    );

    res.redirect("/");
  },
];

exports.putAuthor = [
  authorValidator,
  async (req, res) => {
    const { id } = req.params;
    const { name, bio, country, birthDate, deathDate } = req.body;

    await db.editAuthorById(
      id,
      name,
      bio,
      country,
      birthDate || null,
      deathDate || null
    );

    res.redirect(`/authors/view/${id}`);
  },
];

exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (password === "Bruno123") {
    await db.deleteAuthorById(id);
  }

  res.redirect("/");
};
