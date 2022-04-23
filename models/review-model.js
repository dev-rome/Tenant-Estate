const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  body: String,
  rating: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
