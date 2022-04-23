const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user-model");

router.get("/register", async (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  const registeredUser = await User.register(user, password);
  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.flash("success", "Welcome to Tenant-Estate!");
    res.redirect("/buy");
  });
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/buy");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged out successfully!");
  res.redirect("/buy");
});

module.exports = router;
