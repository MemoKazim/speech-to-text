// =============================| PREDEFINE |=============================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./routes/adminRoute");
const api = require("./routes/apiRoute");
const user = require("./routes/userRoute");
const root = require("./routes/rootRoute");

// =============================| SETTINGS |=============================
const app = express();
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/reports"));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.use("/admin", admin);
app.use("/api", api);
app.use("/", root);

module.exports = app;
