import { Request, Response, NextFunction, Router } from "express";
import { db } from "../database";

const postRouter = Router();

// List all the posts
postRouter.get("/list", async (req: Request, res: Response) => {
  const query = `
    select
      *
    from
      posts;
  `;

  db.all(query, (err, rows) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      rows: rows,
    });
  });
});

postRouter.post("/new", async (req: Request, res: Response) => {
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

postRouter.get("/find", (req: Request, res: Response) => {
  const query = `
    select
      *
    from
      posts
    where
      post_id = ?;
  `;

  db.all(query, [req.query.id], (err, rows) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      rows: rows,
    });
  });
});

export default postRouter;
