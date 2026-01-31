const express = require("express");
const router = new express.Router();
const categoriesController = require("../controllers/categoriesController");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", categoriesController.getAll);

router.get("/:id", categoriesController.getOne);

router.post("/", isAuthenticated, categoriesController.createCategory);

router.put("/:id", isAuthenticated, categoriesController.updateCategory);

router.delete("/:id", isAuthenticated, categoriesController.deleteCategory);

module.exports = router;
