const { Router } = require("express");
const booksController = require("../controllers/booksController");

const booksRouter = Router();

booksRouter.get("/add", booksController.getBookAdd);
booksRouter.post("/", booksController.postBook)

module.exports = booksRouter;
