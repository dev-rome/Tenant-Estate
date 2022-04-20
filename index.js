require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const buyController = require("./controller/buyController");
const rentController = require("./controller/rentController");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));

app.use("/buy", buyController);
app.use("/rent", rentController);

app.listen(app.get("port"), () => {
  console.log(`Server running on Port: ${app.get("port")}`);
});
