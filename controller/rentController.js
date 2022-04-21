const express = require("express");
const router = express.Router();

const Apartment = require("../models/apartment-model");

router.get("/", async (req, res) => {
  const apartments = await Apartment.find({});
  res.render("rent/rent", { apartments });
});

router.get("/new", (req, res) => {
  res.render("rent/newApartment");
});

router.post("/", async (req, res) => {
  const apartment = new Apartment(req.body.apartment);
  await apartment.save();
  res.redirect(`rent/${apartment._id}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id);
  res.render("rent/rentDetails", { apartment });
});

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id);
  res.render("rent/editApartment", { apartment });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findByIdAndUpdate(id, req.body.apartment);
  res.redirect(`rent/${apartment._id}`);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Apartment.findByIdAndDelete(id);
  res.redirect("/rent");
});

module.exports = router;
