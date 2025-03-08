#! /usr/bin/env node
require("dotenv").config();

const url = process.argv[2];

if (!url) {
  return 1;
}

const { Client } = require("pg");

const sql = `
create table if not exists messages (
  id integer primary key generated always as identity,
  username varchar ( 255 ),
  text varchar ( 1024 ),
  added timestamp DEFAULT CURRENT_TIMESTAMP
);

insert into messages (username, text) 
values
  ('bryan', 'hello world!'),
  ('odin', 'hello there!'),
  ('damon', 'hey wasup!');
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
