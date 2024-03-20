const express = require("express");
const router = express.Router();

const ResourcesController = require("../controllers/resources");

const checkAuthAdmin = require("../middleware/check-auth-admin");

router.get("/", ResourcesController.resources_get_all);

router.get("/:resourceId", ResourcesController.resources_get_specific_resource);

router.post("/", checkAuthAdmin, ResourcesController.resources_create_resource);

router.patch(
  "/:resourceId",
  checkAuthAdmin,
  ResourcesController.resources_update_resource
);

router.delete(
  "/:resourceId",
  checkAuthAdmin,
  ResourcesController.resources_delete_resource
);

module.exports = router;
