const pool = require("./pool");

// Books queries
async function getBooks() {
  const { rows } = await pool.query(
    `SELECT * FROM books b 
      JOIN writers w ON b.id = w.id 
        JOIN genres g ON b.id = g.id`
  );

  return rows;
}

async function getBookById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM books b 
      JOIN writers w ON b.author_id = w.id 
        JOIN genres g ON b.genre_id = g.id 
          WHERE id = $1`,
    [id]
  );

  return rows;
}

async function addBook(title, authorId, genreId, pages, releaseDate) {
  await pool.query(
    `INSERT INTO books (title, author_id, genre_id, pages, release_date) 
    VALUES ($1, $2, $3, $4, $5)`,
    [title, authorId, genreId, pages, releaseDate]
  );
}

async function editBookById(id, title, authorId, genreId, pages, releaseDate) {
  await pool.query(
    `UPDATE books SET title = $1, author_id = $2, genre_id = $3, pages = $4, release_date = $5
      WHERE id = $6;`,
    [title, authorId, genreId, pages, releaseDate, id]
  );
}

async function deleteBookById(id) {
  await pool.query(`DELETE FROM books WHERE id = $1`, [id]);
}

// Genres queries
async function getGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function getGenreById(id) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
  return rows;
}

async function addGenre(name) {
  const { rows } = await pool.query("INSERT INTO genres (genre_name) VALUES ($1)", [
    name,
  ]);

  return rows;
}

async function editGenreById(id, name) {
  await pool.query("UPDATE books SET genre_name = $1 WHERE id = $2", [name, id]);
}

async function deleteGenreById(id) {
  await pool.query("DELETE FROM genres WHERE id = $1", [id]);
}

// Writers queries
async function getAuthors() {
  const { rows } = await pool.query("SELECT * FROM writers");
  return rows;
}

async function getAuthorById(id) {
  const { rows } = await pool.query("SELECT * FROM writers WHERE id = $1", [
    id,
  ]);
}

async function addAuthor(name) {
  const { rows } = await pool.query("INSERT INTO writers (author_name) VALUES ($1)", [
    name,
  ]);

  return rows;
}

async function editAuthorById(id, name) {
  await pool.query("UPDATE writers SET author_name = $1 WHERE id = $2", [name, id]);
}

async function deleteAuthorById(id) {
  await pool.query("DELETE FROM writers WHERE id = $1", [id]);
}

module.exports = {
  getBooks,
  getBookById,
  addBook,
  editBookById,
  deleteBookById,
  getGenres,
  getGenreById,
  addGenre,
  editGenreById,
  deleteGenreById,
  getAuthors,
  getAuthorById,
  addAuthor,
  editAuthorById,
  deleteAuthorById,
};
