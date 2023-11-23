const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

const checkAuth = require("../middleware/check-auth");
const checkAuthAdmin = require("../middleware/check-auth-admin");

router.post("/signup", UsersController.users_signup_user);

router.post("/login", UsersController.users_login_user);

router.get("/", checkAuthAdmin, UsersController.users_get_all);

router.patch("/:userId", checkAuth, UsersController.users_update_user);

router.delete("/:userId", checkAuthAdmin, UsersController.users_delete_user);

module.exports = router;
