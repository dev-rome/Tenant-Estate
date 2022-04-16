const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  address: {
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
});

const Home = mongoose.model("Home", HomeSchema);

module.exports = Home;
