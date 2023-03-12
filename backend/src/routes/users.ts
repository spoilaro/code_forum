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
        status: true,
      });
    }
  });
});

userRouter.post("/login", (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);

  const query = `
    SELECT
      user_id, email, password 
    FROM 
      users
    WHERE
      email like ?
  `;

  db.get(query, [email], (err, rows) => {
    console.log(rows);
    if (err) {
      res.json({
        msg: "LOGIN FAILED",
        error: err,
      });
    } else {
      if (
        rows === undefined ||
        !bcrypt.compareSync(password, rows["password"])
      ) {
        console.log(rows);
        res.json({
          success: false,
        });
      }

      const jwtPayload = {
        email,
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
