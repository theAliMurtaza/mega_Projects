import User from "../models/User.js";
import { generateToken } from "../utils/jwt.utils.js";
import { asyncHandler } from "../middleware/error.middleware.js";

// POST /api/auth/signup
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "An account with this email already exists." });

  const user = await User.create({ name, email, passwordHash: password });
  const token = generateToken(user._id);

  res.status(201).json({
    token,
    user: user.toSafeObject(),
  });
});

// POST /api/auth/signin
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  if (!user.isActive) {
    return res.status(403).json({ error: "Account is deactivated. Please contact support." });
  }

  const token = generateToken(user._id);
  res.json({ token, user: user.toSafeObject() });
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeObject() });
});

// PUT /api/auth/me
export const updateMe = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true, runValidators: true }
  );
  res.json({ user: user.toSafeObject() });
});

// PUT /api/auth/password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+passwordHash");

  if (!(await user.matchPassword(currentPassword))) {
    return res.status(401).json({ error: "Current password is incorrect." });
  }

  user.passwordHash = newPassword;
  await user.save();
  res.json({ message: "Password updated successfully." });
});
