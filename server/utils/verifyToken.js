const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "No Token Provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    req.id = decoded.id;
    req.lastAccess = decoded.lastAccess;
    next();
  });
};

module.exports = verifyToken;
