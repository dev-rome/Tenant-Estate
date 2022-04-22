const express = require("express");
const router = express.Router();

const Home = require("../models/home-model");
const Review = require("../models/review-model");

router.get("/", async (req, res) => {
  const homes = await Home.find({});
  res.render("buy/buy", { homes });
});

router.get("/new", (req, res) => {
  res.render("buy/newHome");
});

router.post("/", async (req, res) => {
  const home = new Home(req.body.home);
  await home.save();
  res.redirect(`buy/${home._id}`);
});

router.post("/:id/reviews", async (req, res) => {
  const id = req.params.id;
  const home = await Home.findById(id);
  const review = new Review(req.body.review);
  home.reviews.push(review);
  await home.save();
  await review.save();
  res.redirect(`/buy/${home._id}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const home = await Home.findById(id).populate("reviews");
  res.render("buy/buyDetails", { home });
});

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const home = await Home.findById(id);
  res.render("buy/editHome", { home });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const home = await Home.findByIdAndUpdate(id, req.body.home);
  res.redirect(`buy/${home._id}`);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Home.findByIdAndDelete(id);
  res.redirect("/buy");
});

router.delete("/:id/reviews/:reviewId", async (req, res) => {
  const { id, reviewId } = req.params;
  await Home.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/buy/${id}`);
});

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
