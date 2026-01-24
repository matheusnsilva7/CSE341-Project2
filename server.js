const express = require("express");
const mongodb = require("./data/database");
const taskRoute = require("./routes/taskRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const bodyParser = require("body-parser");
const swaggerRoute = require("./routes/swagger");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

app.use("/", swaggerRoute);
app.use("/tasks", taskRoute);
app.use("/categories", categoriesRoute);

mongodb.iniDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3001, () => {
      console.log(`app running`);
    });
  }
});
