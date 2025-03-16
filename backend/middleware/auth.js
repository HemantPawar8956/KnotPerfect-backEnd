import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/userModel.js";

export const userAuth = async (req, res) => {
  try {
    let { email, password, phone } = req.body;


    // Validation for email and phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number validation (10 digits, starts with 6-9)

    if (!email && !phone) {
      return res
        .status(400)
        .json({ message: "Email or phone number is required" });
    }

    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Fetch user by email or phone
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone }); // Fixed incorrect query
    }

    if (!user) {
      return res.status(403).json({ message: "User Not Found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    let userRole = jwt.sign(
      { role: user.role },
      process.env.secreat_Key, // Ensure the correct env variable name
      { expiresIn: "24h" }
    );

    let token = jwt.sign(
      {
        email: user.email,
        userName: user.name,
        userId: user._id,
        role: userRole,
      },
      process.env.secreat_Key, // Ensure the correct env variable name
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({ message: "Login successful! Welcome back", token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Login Failed ! Please Try Again ",
      error: error.message,
    });
  }
};
