const express = require("express");
const router = express.Router();

const IconsController = require("../controllers/icons");

const checkAuthAdmin = require("../middleware/check-auth-admin");

router.get("/", IconsController.icons_get_all);

router.post("/", checkAuthAdmin, IconsController.icons_create_icon);

router.patch("/:iconId", checkAuthAdmin, IconsController.icons_update_icon);

router.delete("/:iconId", checkAuthAdmin, IconsController.icons_delete_icon);

module.exports = router;
