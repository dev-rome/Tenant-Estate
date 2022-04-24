const express = require("express");
const router = express.Router({mergeParams: true});

const Apartment = require("../models/apartment-model");
const Review = require("../models/review-model");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", async (req, res) => {
    const id = req.params.id;
    const apartment = await Apartment.findById(id);
    const review = new Review(req.body.review);
    review.user = req.user._id;
    apartment.reviews.push(review);
    await apartment.save();
    await review.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/rent/${apartment._id}`);
  });

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, async (req, res) => {
    const { id, reviewId } = req.params;
    await Apartment.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/rent/${id}`);
  });

module.exports = router;