const express = require("express");
const router = express.Router();

const Home = require("../models/home-model");
const { isLoggedIn, isHomeAuthor } = require("../middleware");

router.get("/", async (req, res) => {
  const homes = await Home.find({});
  res.render("buy/buy", { homes });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("buy/newHome");
});

router.post("/", isLoggedIn, async (req, res) => {
  const home = new Home(req.body.home);
  home.user = req.user._id;
  await home.save();
  req.flash("success", "Home added successfully!");
  res.redirect(`buy/${home._id}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const home = await Home.findById(id)
    .populate({ path: "reviews", populate: { path: "user" } })
    .populate("user");
  if (!home) {
    req.flash("error", "Home not found!");
    return res.redirect("/buy");
  }
  res.render("buy/buyDetails", { home });
});

router.get("/:id/edit", isLoggedIn, isHomeAuthor, async (req, res) => {
  const id = req.params.id;
  const home = await Home.findById(id);
  if (!home) {
    req.flash("error", "Home not found!");
    return res.redirect("/buy");
  }
  res.render("buy/editHome", { home });
});

router.put("/:id", isLoggedIn, isHomeAuthor, async (req, res) => {
  const id = req.params.id;
  const home = await Home.findByIdAndUpdate(id, req.body.home);
  req.flash("success", "Successfully updated home!");
  res.redirect(`/buy/${home._id}`);
});

router.delete("/:id", isLoggedIn, isHomeAuthor, async (req, res) => {
  const id = req.params.id;
  await Home.findByIdAndDelete(id);
  req.flash("success", "Home deleted successfully!");
  res.redirect("/buy");
});

//   router.get("/search", async (req, res) => {
//   const { location, price, properType } = req.query;
//   const homes = await Home.find({
//     location: location,
//     price: price,
//     properType: properType,
//   });
//   res.render("buy/buy", { homes });
// })

module.exports = router;
