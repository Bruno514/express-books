const { Router } = require("express");
const authorsController = require("../controllers/authorsController");

const authorsRouter = Router();

authorsRouter.get("/", authorsController.getAuthorsIndex);
authorsRouter.get("/add", authorsController.getAuthorsAdd);
authorsRouter.get("/view/:id", authorsController.getAuthorsView);
authorsRouter.get("/edit/:id", authorsController.getAuthorsEdit);
authorsRouter.post("/", authorsController.postAuthor);
authorsRouter.put("/:id", authorsController.putAuthor);
authorsRouter.delete("/:id", authorsController.deleteAuthor);

module.exports = authorsRouter;
