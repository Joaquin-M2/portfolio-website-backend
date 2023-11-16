const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedJwt = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedJwt;
    if (Date.now() < new Date(req.userData.exp * 1000)) {
      next();
    } else {
      return res.status(401).json({
        message: "⛔ Expired token. Log in again ⛔",
        expiredToken: true,
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "⛔ Unauthorized ⛔",
    });
  }
};
