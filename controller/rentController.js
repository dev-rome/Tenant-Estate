const express = require("express");
const router = express.Router();

const Apartment = require("../models/apartment-model");

router.get("/", async (req, res) => {
    const homes = await Apartment.find({});
    res.render("rent/rent", { homes });
  });
  
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const home = await Apartment.findById(id);
    res.render("rent/rentDetails", { home });
  })

module.exports = router;