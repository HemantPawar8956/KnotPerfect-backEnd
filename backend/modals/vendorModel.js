const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  vendorType: {
    type: String,
    enum: ["Hall", "Decorator", "Caterer", "Designer"],
    required: true,
  },
  services: {
    type: [String],
    required: true,
    default: [],
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: function () {
      return this.vendorType === "Hall";
    },
  },
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  availability: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: [String], // URLs of uploaded images
  },
  ratings: {
    average: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

VendorSchema.index({ email: 1 }, { unique: true });
VendorSchema.index({ location: 1, vendorType: 1 });

module.exports = mongoose.model("Vendor", VendorSchema);
