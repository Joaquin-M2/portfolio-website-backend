const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedJwt = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedJwt;

    UserModel.find({ email: req.userData.email })
      .exec()
      .then((user) => {
        if (user[0].role === "admin") {
          if (Date.now() < new Date(req.userData.exp * 1000)) {
            next();
          } else {
            return res.status(401).json({
              message: "⛔ Expired token. Log in again ⛔",
              expiredToken: true,
            });
          }
        } else {
          return res.status(401).json({
            message: "⛔ Unauthorized ⛔",
          });
        }
      });
  } catch (error) {
    return res.status(401).json({
      message: "⛔ Invalid token ⛔",
    });
  }
};
