import { Request, Response, NextFunction, Router } from "express";
import { db } from "../database";

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  const email = req.body.email;

  console.log(email);

  const query = `
    insert into users (
      email,
      created
    ) 
    values (
      ?, CURRENT_TIMESTAMP
    )
  `;

  db.run(query, [email], (err) => {
    if (err) {
      res.json({
        msg: "INSERT FAILED",
        error: err,
      });
    } else {
      res.json({
        msg: "INSERT SUCCESS",
      });
    }
  });
});

export default userRouter;
