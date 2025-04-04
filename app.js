require("dotenv").config();
const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");
const indexRouter = require("./routes/indexRouter");
const booksRouter = require("./routes/booksRouter");
const genresRouter = require("./routes/genresRouter");
const authorsRouter = require("./routes/authorsRouter");

const PORT = process.env.PORT || 3000;

const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  // You will see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(err.statusCode || 500).render("error", { title: "Unauthorized", error: err });
});
