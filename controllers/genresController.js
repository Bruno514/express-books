const { max } = require("date-fns");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const emptyError = "can not be empty.";
const lengthError = "can not be too long.";

const genreValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Genre name ${emptyError}`)
    .isLength({ max: 255 })
    .withMessage(`Genre name ${lengthError}`)
    .escape(),
  body("description")
    .trim()
    .isLength({ max: 255 })
    .withMessage(`Description ${lengthError}`)
    .optional()
    .escape(),
];

exports.getGenresIndex = async (req, res) => {
  res.render("genres/index", {
    title: "All genres",
    genres: await db.getGenres(),
  });
};

exports.getGenresAdd = async (req, res) => {
  res.render("genres/add", {
    title: "Add new genre",
  });
};

exports.getGenreEdit = async (req, res) => {
  const { id } = req.params;

  res.render("genres/edit", {
    title: "Edit genre",
    genre: await db.getGenreById(id),
  });
};

exports.getGenreView = async (req, res) => {
  const { id } = req.params;

  res.render("genres/view", {
    title: "Viewing genre",
    genre: await db.getGenreById(id),
  });
};

exports.postGenre = [
  genreValidator,
  async function postGenre(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("genres/add", {
        title: "invalid genre fields, try again",
        errors: errors.array(),
      });
    }

    const { name, descritpion } = req.body;
    await db.addGenre(name, descritpion);

    res.redirect("/");
  },
];

exports.putGenre = [
  genreValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("genres/edit", {
        title: "invalid genre fields, try again",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { name, descritpion } = req.body;

    await db.editGenreById(id, name, descritpion);

    res.redirect(`/genres/view/${id}`);
  },
];
