const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Task"]
  try {
    const result = await mongodb.getDatabase().db().collection("Task").find();
    result.toArray().then((Task) => {
      res.setHeader("content-type", "application/json");
      res.status(200).json(Task);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  //#swagger.tags=["Task"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const taskId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Task")
      .find({ _id: taskId });

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }
    result.toArray().then((Task) => {
      res.setHeader("content-type", "application/json");
      res.status(200).json(Task[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  //#swagger.tags=["Task"]
  try {
    const { title, subject, priority, dueDate } = req.body;

    if (!title || !subject || !priority || !dueDate) {
      return res.status(400).json({
        message: "title, subject, and priority are required",
      });
    }

    const task = {
      title,
      subject,
      priority,
      description: req.body.description || "",
      dueDate: new Date(dueDate),
      completed: req.body.completed || false,
      estimatedTime: req.body.estimatedTime ?? 0,
      createdAt: new Date(),
    };

    const reponse = await mongodb
      .getDatabase()
      .db()
      .collection("Task")
      .insertOne(task);

    if (reponse.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(reponse.error || { message: "Insert failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  //#swagger.tags=["Task"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const { title, subject, priority, dueDate } = req.body;

    if (!title || !subject || !priority || dueDate) {
      return res.status(400).json({
        message: "title, subject, and priority are required",
      });
    }

    const task = {
      title,
      subject,
      priority,
      description: req.body.description || "",
      dueDate: new Date(dueDate),
      completed: req.body.completed || false,
      estimatedTime: req.body.estimatedTime ?? 0,
      createdAt: new Date(),
    };

    const taskId = new ObjectId(req.params.id);

    const reponse = await mongodb
      .getDatabase()
      .db()
      .collection("Task")
      .replaceOne({ _id: taskId }, task);

    if (reponse.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(reponse.error || { message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  //#swagger.tags=["Task"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const taskId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("tasks")
      .deleteOne({ _id: taskId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  createTask,
  updateTask,
  deleteTask,
};
