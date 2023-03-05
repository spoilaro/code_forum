import { Request, Response, NextFunction, Router } from "express";
import { db } from "../database";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const hash = bcrypt.hashSync(password, 8);

  const query = `
    insert into users (
      email,
      created,
      password
    ) 
    values (
      ?, CURRENT_TIMESTAMP, ?
    )
  `;

  db.run(query, [email, hash], (err) => {
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

userRouter.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const hash = bcrypt.hashSync(password, 8);

  const query = `
    select * from users
    where
      email = ?
    and
      password = ?
  `;

  db.get(query, [email, hash], (err, rows) => {
    if (err) {
      res.json({
        msg: "LOGIN FAILED",
        error: err,
      });
    } else {
      const jwtPayload = {
        email,
        hash,
        rows,
      };
      jwt.sign(
        jwtPayload,
        "TEST_SECRET",
        {
          expiresIn: 120,
        },
        (err, token) => {
          if (err) {
            console.error(err);
          }
          res.json({
            success: true,
            token: token,
            email: email,
            rows,
          });
        }
      );
    }
  });
});

export default userRouter;
