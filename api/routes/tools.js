const express = require("express");
const router = express.Router();

const ToolsController = require("../controllers/tools");

const checkAuth = require("../middleware/check-auth");

router.get("/", ToolsController.tools_get_all);

router.post("/", checkAuth, ToolsController.tools_create_tool);

router.patch("/:toolId", checkAuth, ToolsController.tools_update_tool);

router.delete("/:toolId", checkAuth, ToolsController.tools_delete_tool);

module.exports = router;
