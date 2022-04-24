const express = require("express");
const router = express.Router({ mergeParams: true });

const Home = require("../models/home-model");
const Review = require("../models/review-model");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, async (req, res) => {
    const id = req.params.id;
    const home = await Home.findById(id);
    const review = new Review(req.body.review);
    review.user = req.user._id;
    home.reviews.push(review);
    await home.save();
    await review.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/buy/${home._id}`);
  });

  router.delete("/:reviewId", isLoggedIn, isReviewAuthor, async (req, res) => {
    const { id, reviewId } = req.params;
    await Home.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/buy/${id}`);
  });

  module.exports = router;