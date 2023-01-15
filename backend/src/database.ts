import sqlite3 from "sqlite3";

const db = new sqlite3.Database("../database/forum.db", (err) => {
  if (err) {
    console.error(err);
  }
});

export { db };
