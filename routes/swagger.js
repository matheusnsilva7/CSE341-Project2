const express = require("express");
const router = new express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const passport = require("passport");

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDocument));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
