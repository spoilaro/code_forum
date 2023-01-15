import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

// Route imports
import postRouter from "./routes/posts";

// Using same .env file for the whole project
dotenv.config({
  path: "../.env",
});

const port = process.env.SERVER_PORT;
const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use("/posts", postRouter);

app.get("/api/test", (req: Request, res: Response) => {
  res.json({
    msg: "OK",
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`SERVER RUNNING, PORT: ${port}`);
});
