const jwt = require("jsonwebtoken");

exports.authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "token is missing" });
    }
    const result = await jwt.verify(token, process.env.JWT_KEY);
    if (result.role === "Admin") {
      req.user = await result;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthroized",
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "token is missing" });
    }
    const verifiedUser = jwt.verify(token, process.env.JWT_KEY);
    req.user = verifiedUser;
    next();
  } catch (e) {
    next(e);
  }
};
