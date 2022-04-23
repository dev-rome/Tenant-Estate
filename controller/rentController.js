const express = require("express");
const router = express.Router();

const Apartment = require("../models/apartment-model");
const Review = require("../models/review-model");
const { isLoggedIn } = require("../middleware/isLogged");

router.get("/", async (req, res) => {
  const apartments = await Apartment.find({});
  res.render("rent/rent", { apartments });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("rent/newApartment");
});

router.post("/", isLoggedIn, async (req, res) => {
  const apartment = new Apartment(req.body.apartment);
  await apartment.save();
  req.flash("success", "Apartment added successfully!");
  res.redirect(`rent/${apartment._id}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id).populate("reviews");
  if (!apartment) {
    req.flash("error", "Home not found!");
    return res.redirect("/rent");
  }
  res.render("rent/rentDetails", { apartment });
});

router.get("/:id/edit", isLoggedIn, async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id);
  if (!apartment) {
    req.flash("error", "Home not found!");
    return res.redirect("/rent");
  }
  res.render("rent/editApartment", { apartment });
});

router.put("/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findByIdAndUpdate(id, req.body.apartment);
  req.flash("success", "Successfully updated apartment!");
  res.redirect(`/rent/${apartment._id}`);
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;
  await Apartment.findByIdAndDelete(id);
  req.flash("success", "Apartment deleted successfully!");
  res.redirect("/rent");
});

module.exports = router;
