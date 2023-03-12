import { Request, Response, NextFunction, Router } from "express";
import { db } from "../database";

import { validate } from "../auth/validate";

const commentRouter = Router();

// List all the posts
commentRouter.get("/list", async (req: Request, res: Response) => {
  const query = `
    select
      *
    from
      comments
    where 
    post_id = ?;
  `;

  db.all(query, [req.query.id], (err, rows) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        rows: rows,
      });
    }
  });
});

commentRouter.post("/new", validate, async (req: Request, res: Response) => {
  // Insert a new post
  //
  console.log("NEW COMMENT");

  const post_id = req.body.post_id;
  const user_id = req.body.user_id;
  const body = req.body.body;

  console.log(req.body);

  const query = `
    insert into comments (
      post_id,
      user_id,
      body
    ) values (
      ?, ?, ?     
    )
  `;

  db.run(query, [post_id, user_id, body], (err) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        msg: "SUCCESS",
      });
    }
  });
});

export default commentRouter;
