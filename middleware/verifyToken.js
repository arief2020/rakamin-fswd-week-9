const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  //   console.log(authHeader)
    const token = authHeader?.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          // console.log(err)
          return res.sendStatus(403);
      }
      req.email = decoded.email;
      next()
    });
  };

module.exports = verifyToken