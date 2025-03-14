const pool = require("./pool");

// Books queries
async function getBooks() {
  const { rows } = await pool.query(
    `SELECT b.id, b.title, b.pages, b.release_date, g.genre_name, w.author_name FROM books b 
      JOIN writers w ON b.author_id = w.id 
        JOIN genres g ON b.genre_id = g.id`
  );

  return rows;
}

async function getBookById(id) {
  const { rows } = await pool.query(
    `SELECT  b.id, b.title, b.pages, b.release_date, g.genre_name, w.author_name FROM books b 
      JOIN writers w ON b.author_id = w.id 
        JOIN genres g ON b.genre_id = g.id 
          WHERE b.id = $1`,
    [id]
  );

  return rows[0];
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
  return rows[0];
}

async function addGenre(name, description) {
  const { rows } = await pool.query(
    "INSERT INTO genres (genre_name, description) VALUES ($1, $2)",
    [name, description]
  );

  return rows;
}

async function editGenreById(id, name, description) {
  await pool.query(
    "UPDATE books SET genre_name = $1, description = $2 WHERE id = $3",
    [name, description, id]
  );
}

async function deleteGenreById(id) {
  // Remove references first
  await pool.query("UPDATE books SET genre_id=NULL WHERE genre_id = $1", [id]);
  // Then, delete the genre
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

  return rows[0];
}

async function addAuthor(name, bio, nationality, birthDate, deathDate) {
  const { rows } = await pool.query(
    "INSERT INTO writers (author_name, bio, nationality, birth_date, death_date) VALUES ($1, $2, $3, $4, $5)",
    [name, bio, nationality, birthDate, deathDate]
  );

  return rows;
}

async function editAuthorById(
  id,
  name,
  bio,
  nationality,
  birthDate,
  deathDate
) {
  await pool.query(
    `UPDATE writers 
      SET author_name = $1, bio = $2, nationality = $3, 
      birth_date = $4, death_date = $5 
        WHERE id = $6`,
    [name, bio, nationality, birthDate, deathDate, id]
  );
}

async function deleteAuthorById(id) {
  // Remove references first
  await pool.query("UPDATE books SET author_id=NULL WHERE author_id = $1", [
    id,
  ]);
  // Then, delete
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
