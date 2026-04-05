import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // never returned in queries by default
    },
    plan: {
      type: String,
      enum: ["free", "pro", "pro_annual"],
      default: "free",
    },
    stripeCustomerId: { type: String, default: null },
    analysisCount: { type: Number, default: 0 }, // for free tier limiting
    lastAnalysisReset: { type: Date, default: Date.now },
    avatar: { type: String, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Reset monthly analysis count
userSchema.methods.resetAnalysisCountIfNeeded = function () {
  const now = new Date();
  const lastReset = new Date(this.lastAnalysisReset);
  if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
    this.analysisCount = 0;
    this.lastAnalysisReset = now;
  }
};

// Safe user object (no passwordHash)
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;
