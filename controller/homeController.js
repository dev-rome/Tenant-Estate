const express = require("express");
const router = express.Router();

const Home = require("../models/home-model");

router.get("/", async (req, res) => {
  const homes = await Home.find({});
  res.render("buy/buy", { homes });
});

module.exports = router;
