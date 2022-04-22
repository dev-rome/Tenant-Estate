const mongoose = require("../db/connection");
const Review = require("../models/review-model");
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  image: {
    type: String,
    required: [true, "Please provide an image"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name for the apartment"],
  },
  description: {
    type: String,
    required: [true, "Apartment description is required"],
  },
  location: {
    type: String,
    required: [true, "Apartment description is required"],
  },
  location: {
    type: String,
    required: [true, "Apartment location is required"],
  },
  bedrooms: {
    type: Number,
    required: [true, "How many bedrooms?"],
  },
  bathrooms: {
    type: Number,
    required: [true, "How many bathrooms?"],
  },
  sqft: {
    type: String,
    required: [true, "How many square feet?"],
  },
  properType: {
    type: String,
    required: [true, "Please provide a proper type"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

ApartmentSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Apartment = mongoose.model("Apartment", ApartmentSchema);

module.exports = Apartment;
