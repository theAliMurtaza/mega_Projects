import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "User not found or deactivated." });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") return res.status(401).json({ error: "Invalid token." });
    if (err.name === "TokenExpiredError") return res.status(401).json({ error: "Token expired. Please sign in again." });
    next(err);
  }
};
