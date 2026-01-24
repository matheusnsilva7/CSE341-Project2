const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .find();

    result.toArray().then((Categories) => {
      res.setHeader("content-type", "application/json");
      res.status(200).json(Categories);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const categoryId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .find({ _id: categoryId });

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    result.toArray().then((Categories) => {
      res.setHeader("content-type", "application/json");
      res.status(200).json(Categories[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    const { name, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({
        message: "name and color are required",
      });
    }

    const category = {
      name,
      description: req.body.description || "",
      color,
      isActive: req.body.isActive ?? true,
      createdAt: new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .insertOne(category);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create category" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const { name, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({
        message: "name and color are required",
      });
    }

    const categoryId = new ObjectId(req.params.id);

    const category = {
      name,
      description: req.body.description || "",
      color,
      isActive: req.body.isActive ?? true,
      createdAt: new Date(),
    };

    const reponse = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .replaceOne({ _id: categoryId }, category);

    if (reponse.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          reponse.error || "Some error occurred while updating the contact",
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const categoryId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .deleteOne({ _id: categoryId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  createCategory,
  updateCategory,
  deleteCategory,
};
