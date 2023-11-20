const express = require("express");
const router = express.Router();

const IconsController = require("../controllers/icons");

const checkAuth = require("../middleware/check-auth");

router.get("/", IconsController.icons_get_all);

router.post("/", checkAuth, IconsController.icons_create_icon);

router.patch("/:iconId", checkAuth, IconsController.icons_update_icon);

router.delete("/:iconId", checkAuth, IconsController.icons_delete_icon);

module.exports = router;
