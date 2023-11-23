const express = require("express");
const router = express.Router();

const TagsController = require("../controllers/tags");

const checkAuthAdmin = require("../middleware/check-auth-admin");

router.get("/", TagsController.tags_get_all);

router.post("/", checkAuthAdmin, TagsController.tags_create_tag);

router.patch("/:tagId", checkAuthAdmin, TagsController.tags_update_tag);

router.delete("/:tagId", checkAuthAdmin, TagsController.tags_delete_tag);

module.exports = router;
