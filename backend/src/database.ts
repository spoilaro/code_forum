import sqlite3 from "sqlite3";

const sq = sqlite3.verbose();

const db = new sq.Database("../database/forum.db", (err) => {
  if (err) {
    console.error(err);
  }
});

export { db };
