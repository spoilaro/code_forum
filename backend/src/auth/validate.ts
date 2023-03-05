const jwt = require("jsonwebtoken");

const validate = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }
  if (token == null) return res.sendStatus(401);
  console.log("Token found");
  jwt.verify(token, "TEST_SECRET", (err: any, email: any) => {
    if (err) {
      return res.status(401);
    }
    req.email = email;
    next();
  });
};

export { validate };
