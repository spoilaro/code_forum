import express, { Express, Request, Response, NextFunction } from "express";
import sqlite3 from "sqlite3";
import * as dotenv from "dotenv";

// Using same .env file for the whole project
dotenv.config({
  path: "../.env",
});

const port = process.env.SERVER_PORT;
const app: Express = express();

// Middleware
app.use(express.json());

app.get("/api/test", (req: Request, res: Response) => {
  res.json({
    msg: "OK",
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`SERVER RUNNING, PORT: ${port}`);
});
