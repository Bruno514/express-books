const { Router } = require("express");
const genresController = require("../controllers/genresController");

const genresRouter = Router();

genresRouter.get("/", genresController.getGenresIndex);
genresRouter.get("/add", genresController.getGenresAdd);
genresRouter.get("/view/:id", genresController.getGenreView);
genresRouter.get("/edit/:id", genresController.getGenreEdit);
genresRouter.post("/", genresController.postGenre);
genresRouter.put("/:id", genresController.putGenre);

module.exports = genresRouter;
