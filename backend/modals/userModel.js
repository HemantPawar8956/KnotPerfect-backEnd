import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin", "vendor"],
      default: "user",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profileImage: {
      type: String, // Store image URL
    },
    mailOTP: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false, // Can be updated after email verification
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
