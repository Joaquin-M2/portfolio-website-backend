const express = require("express");
const router = express.Router();

const TagsController = require("../controllers/tags");

const checkAuth = require("../middleware/check-auth");

router.get("/", TagsController.tags_get_all);

router.post("/", checkAuth, TagsController.tags_create_tag);

router.patch("/:tagId", checkAuth, TagsController.tags_update_tag);

router.delete("/:tagId", checkAuth, TagsController.tags_delete_tag);

module.exports = router;
