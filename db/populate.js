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
      genre_name VARCHAR ( 255 ) UNIQUE NOT NULL,
      description VARCHAR ( 255) UNIQUE
  );

  CREATE TABLE IF NOT EXISTS writers (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      author_name VARCHAR ( 255 ) NOT NULL,
      bio VARCHAR (1000) NOT NULL,
      nationality VARCHAR (3),
      birth_date DATE,
      death_date DATE
  );

  CREATE TABLE IF NOT EXISTS books (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title VARCHAR ( 255 ),
      author_id INTEGER REFERENCES writers ( id ) ON DELETE CASCADE,
      genre_id INTEGER REFERENCES genres (id) ON DELETE CASCADE,
      release_date DATE,
      pages INTEGER
  );

  INSERT INTO genres (genre_name, description) 
    VALUES
    ('Novel', 'a fictitious prose narrative of book length, typically representing character and action with some degree of realism.'), 
    ('Chronicle', 'A factual written account of important or historical events in the order of their occurrence.'), 
    ('Sci-Fi', 'A fiction based on imagined future scientific or technological advances and major social or environmental changes, frequently portraying space or time travel and life on other planets.');

  INSERT INTO writers (author_name, bio) 
    VALUES 
    ('João', 'Good writer'), 
    ('Pedro', 'Meh writer, but the nicest person'),
    ('Luis', 'Genius writer, but very shy');
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
