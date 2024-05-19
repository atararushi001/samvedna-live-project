const jwt = require("jsonwebtoken");

const authMiddleware = (userType) => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check user type
      if (decoded.type !== userType) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: "Unauthorized" });
    }
  };
};

module.exports = authMiddleware;
