const express = require("express");
const router = express.Router();
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const Apartment = require("../models/apartment-model");
const { isLoggedIn, isApartmentAuthor } = require("../middleware");

router.get("/", async (req, res) => {
  const apartments = await Apartment.find({});
  res.render("rent/rent", { apartments });
});

router.get("/search", async (req, res) => {
  const { location } = req.query;
  const apartments = await Apartment.find({
    location: { $regex: location, $options: "i" },
  })
  res.render("rent/rent", { apartments });
})

router.get("/new", isLoggedIn, (req, res) => {
  res.render("rent/newApartment");
});

router.post("/", isLoggedIn, async (req, res) => {
  const geoData = await geocoder.forwardGeocode({
    query: req.body.apartment.location,
    limit: 1
  }).send()
  const apartment = new Apartment(req.body.apartment);
  apartment.geometry = geoData.body.features[0].geometry;
  apartment.user = req.user._id;
  await apartment.save();
  req.flash("success", "Apartment added successfully!");
  res.redirect(`rent/${apartment._id}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id)
    .populate({ path: "reviews", populate: { path: "user" } })
    .populate("user");
  if (!apartment) {
    req.flash("error", "Apartment not found!");
    return res.redirect("/rent");
  }
  res.render("rent/rentDetails", { apartment });
});

router.get("/:id/edit", isLoggedIn, isApartmentAuthor, async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id);
  if (!apartment) {
    req.flash("error", "Home not found!");
    return res.redirect("/rent");
  }
  res.render("rent/editApartment", { apartment });
});

router.put("/:id", isLoggedIn, isApartmentAuthor, async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findByIdAndUpdate(id, req.body.apartment);
  req.flash("success", "Successfully updated apartment!");
  res.redirect(`/rent/${apartment._id}`);
});

router.delete("/:id", isLoggedIn, isApartmentAuthor, async (req, res) => {
  const id = req.params.id;
  await Apartment.findByIdAndDelete(id);
  req.flash("success", "Apartment deleted successfully!");
  res.redirect("/rent");
});

module.exports = router;
