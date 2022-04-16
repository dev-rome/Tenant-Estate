require("dotenv").config();

const Home = require("../models/home-model");
const seedData = require("./home.json");

Home.deleteMany({})
  .then(() => {
    return Home.insertMany(seedData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
