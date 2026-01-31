const express = require("express");
const router = new express.Router();
const taskController = require("../controllers/taskController");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", taskController.getAll);

router.get("/:id", taskController.getOne);

router.post("/", isAuthenticated, taskController.createTask);

router.put("/:id", isAuthenticated, taskController.updateTask);

router.delete("/:id", isAuthenticated, taskController.deleteTask);

module.exports = router;
