import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  availableDates: { type: [Date], required: true },
  status: {
    type: String,
    enum: ["pending", "active", "deactive"],
    default: "pending",
  },
  amenities: { type: [String] }, // ["Parking", "Catering", "Decor"]
  images: { type: [Object] }, // Store image URLs
  createdAt: { type: Date, default: Date.now },
});

const hallModel = mongoose.model("Hall", hallSchema);
export default hallModel;
