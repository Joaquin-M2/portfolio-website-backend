const express = require("express");
const router = express.Router();

const ToolsController = require("../controllers/tools");

const checkAuthAdmin = require("../middleware/check-auth-admin");

router.get("/", ToolsController.tools_get_all);

router.get("/:toolId", ToolsController.tools_get_specific_tool);

router.post("/", checkAuthAdmin, ToolsController.tools_create_tool);

router.patch("/:toolId", checkAuthAdmin, ToolsController.tools_update_tool);

router.delete("/:toolId", checkAuthAdmin, ToolsController.tools_delete_tool);

module.exports = router;
