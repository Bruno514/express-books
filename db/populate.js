#! /usr/bin/env node
require("dotenv").config();

const url = process.argv[2];

if (!url) {
  return 1;
}

const { Client } = require("pg");

const sql = `
  CREATE TABLE IF NOT EXISTS genres (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR ( 255 ) UNIQUE
  );

  CREATE TABLE IF NOT EXISTS writers (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR ( 255 )
  );

  CREATE TABLE IF NOT EXISTS books (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title VARCHAR ( 255 ),
      author_id INTEGER REFERENCES writers ( id ) NULL ON DELETE CASCADE,
      genre_id INTEGER REFERENCES genres (id) NULL ON DELETE CASCADE,
      release_date DATE,
      pages INTEGER
  );

  INSERT INTO genres (name) 
    VALUES ("Novel", "Chronicle", "Sci-Fi");
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: url,
  });
  client.on("error", (err) => console.error("connection error", err));
  try {
    await client.connect();
    await client.query(sql);
    await client.end();

    console.log("done");
  } catch (err) {
    console.error(err);
  }
}

main();
