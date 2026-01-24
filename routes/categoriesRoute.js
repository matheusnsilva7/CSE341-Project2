const express = require("express");
const router = new express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.getAll);

router.get("/:id", categoriesController.getOne);

router.post("/", categoriesController.createCategory);

router.put("/:id", categoriesController.updateCategory);

router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;