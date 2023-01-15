import { Request, Response, NextFunction, Router } from "express";
import { db } from "../database";

const commentRouter = Router();

// List all the posts
commentRouter.get("/list", async (req: Request, res: Response) => {
  const query = `
    select
      *
    from
      comments;
  `;

  db.all(query, (err, rows) => {
    res.json({
      rows: rows,
    });
  });
});

commentRouter.post("/new", async (req: Request, res: Response) => {
  // Insert a new post

  const user_id = req.body.user_id;
  const snippet = req.body.snippet;
  const post_name = req.body.post_name;

  const query = `
    insert into posts (
      post_name,
      user_id,
      body
    ) values (
      ?, ?, ?     
    )
  `;

  db.run(query, [post_name, user_id, snippet], (err) => {
    if (err) {
      res.json({
        msg: "INSERT FAILED",
      });
    } else {
      res.json({
        msg: "INSERT SUCCESS",
      });
    }
  });
});

export default commentRouter;
