import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Route imports
import postRouter from "./routes/posts";
import userRouter from "./routes/users";

// Using same .env file for the whole project
dotenv.config({
  path: "../.env",
});

const port = process.env.SERVER_PORT;
const app: Express = express();

if (process.env.NODE_ENV === "development") {
  let corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
} else {
  app.use(cors);
}

// Middleware
app.use(express.json());
// Routes
app.use("/posts", postRouter);
app.use("/users", userRouter);

app.get("/api/test", (req: Request, res: Response) => {
  res.json({
    msg: "OK",
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`SERVER RUNNING, PORT: ${port}`);
});
