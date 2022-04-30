require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const buyController = require("./controller/buyController");
const rentController = require("./controller/rentController");
const homeReviewController = require("./controller/homeReviewController");
const rentReviewController = require("./controller/rentReviewController");
const userController = require("./controller/userController");
const User = require("./models/user-model");
const sessionConfig = {
  secret: "this is the secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/buy", buyController);
app.use("/rent", rentController);
app.use("/buy/:id/reviews", homeReviewController);
app.use("/rent/:id/reviews", rentReviewController);
app.use("/", userController);

app.listen(3000)
