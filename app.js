require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const booksRouter = require("./routes/booksRouter");
const genresRouter = require("./routes/genresRouter");

const PORT = process.env.PORT || 3000;

const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
