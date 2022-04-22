const express = require("express");
const router = express.Router();

const Apartment = require("../models/apartment-model");
const Review = require("../models/review-model");

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

router.post("/:id/reviews", async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id);
  const review = new Review(req.body.review);
  apartment.reviews.push(review);
  await apartment.save();
  await review.save();
  res.redirect(`/rent/${apartment._id}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id).populate("reviews");
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

router.delete("/:id/reviews/:reviewId", async (req, res) => {
  const { id, reviewId } = req.params;
  await Apartment.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/rent/${id}`);
});

module.exports = router;
