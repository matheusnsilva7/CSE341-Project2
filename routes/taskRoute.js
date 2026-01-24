const express = require("express");
const router = new express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAll);

router.get("/:id", taskController.getOne);

router.post("/", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;