const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", ReviewSchema);
