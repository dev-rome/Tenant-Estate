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
  const homeAuthor = await Home.findById(id);
  if (!homeAuthor.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that!");
    return res.redirect(`/buy/${id}`);
  }
  next();
};

module.exports.isApartmentAuthor = async (req, res, next) => {
  const id = req.params.id;
  const apartmentAuthor = await Apartment.findById(id);
  if (!apartmentAuthor.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that!");
    return res.redirect(`/rent/${id}`);
  }
  next();
}
