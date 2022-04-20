require("dotenv").config();

// const Home = require("../models/home-model");
// const homeData = require("./home.json");

const Apartment = require("../models/apartment-model");
const apartmentData = require("./apartment.json");

Home.deleteMany({})
  .then(() => {
    return Home.insertMany(homeData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });

Apartment.deleteMany({})
  .then(() => {
    return Apartment.insertMany(apartmentData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });