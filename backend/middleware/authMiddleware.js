import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const expiration = jwt.decode(token)?.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

    if (currentTime >= expiration) {
      console.log("expired");
    }

    const verified = jwt.verify(token, process.env.secreat_Key);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Middleware to check for admin access
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access Denied: Admins only can access" });
  }
  next();
};

// Middleware to check for vendor access
export const vendorMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "vendor") {
    return res
      .status(403)
      .json({ message: "Access Denied: Vendors only can access" });
  }
  next();
};
