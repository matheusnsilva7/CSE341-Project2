const express = require("express");
const router = new express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDocument));

module.exports = router;
