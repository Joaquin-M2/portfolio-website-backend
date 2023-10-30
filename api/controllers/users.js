const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user");

exports.users_signup_user = (req, res, next) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "⛔ Email address is already used by another user ⛔",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error,
            });
          } else {
            const user = new UserModel({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "✅ User created successfully ✅",
                });
              })
              .catch((error) => {
                res.status(500).json({ error });
              });
          }
        });
      }
    });
};

exports.users_login_user = (req, res, next) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "⛔ User not found ⛔",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "⛔ Wrong credentials ⛔",
          });
        }
        if (result) {
          const jwtToken = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "✅ Logged in! ✅",
            token: jwtToken,
          });
        }
        return res.status(401).json({
          message: "⛔ Wrong credentials ⛔",
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
        message: "🤔 Something went wrong. Please, try it again later 🤔",
      });
    });
};

exports.users_delete_user = (req, res, next) => {
  const id = req.params.userId;
  UserModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: `User with id ${id} has been successfully deleted.`,
        });
      } else {
        res.status(404).json({ message: "Requested user ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
