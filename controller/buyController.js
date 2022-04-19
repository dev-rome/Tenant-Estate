const express = require("express");
const router = express.Router();

const Home = require("../models/home-model");

router.get("/", async (req, res) => {
  const homes = await Home.find({});
  res.render("buy/buy", { homes });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const home = await Home.findById(id);
  res.render("buy/buyDetails", { home });
})

// router.get("/search", async (req, res) => {
//   const { location, price, properType } = req.query;
//   const homes = await Home.find({
//     location: location,
//     price: price,
//     properType: properType,
//   });
//   res.render("buy/buy", { homes });
// })

module.exports = router;
