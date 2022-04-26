const Home = require("./models/home-model");
const Apartment = require("./models/apartment-model");
const Review = require("./models/review-model");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isHomeAuthor = async (req, res, next) => {
  const id = req.params.id;
  const home = await Home.findById(id);
  if (!home.user.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that!");
    return res.redirect(`/buy/${id}`);
  }
  next();
};

module.exports.isApartmentAuthor = async (req, res, next) => {
  const id = req.params.id;
  const apartment = await Apartment.findById(id);
  if (!apartment.user.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that!");
    return res.redirect(`/rent/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.user.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that!");
    return res.redirect(`/buy/${id}`);
  }
  next();
};
