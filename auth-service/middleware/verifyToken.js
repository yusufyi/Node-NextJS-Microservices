const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
