const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  sqft: {
    type: String,
    required: true,
  },
  properType: {
    type: String,
    required: true,
  }
});

const Home = mongoose.model("Home", HomeSchema);

module.exports = Home;
