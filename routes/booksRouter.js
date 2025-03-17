const { Router } = require("express");
const booksController = require("../controllers/booksController");

const booksRouter = Router();

booksRouter.get("/", booksController.getBookIndex);
booksRouter.get("/add", booksController.getBookAdd);
booksRouter.get("/edit/:id", booksController.getBookEdit);
booksRouter.get("/view/:id", booksController.getBookView);
booksRouter.post("/", booksController.postBook);
booksRouter.put("/:id", booksController.putBook);
booksRouter.delete("/:id", booksController.deleteBook);

module.exports = booksRouter;
