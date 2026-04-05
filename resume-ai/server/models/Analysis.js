import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null, // null = pasted/uploaded text, not a saved resume
    },
    type: {
      type: String,
      enum: ["general", "job_match"],
      required: true,
    },
    // General analysis result
    score: { type: Number, default: null },
    metrics: {
      content: Number,
      impact: Number,
      ats: Number,
      clarity: Number,
    },
    feedback: [{ type: { type: String }, text: String }],
    strengths: [String],
    improvements: [String],
    // Job match result
    matchScore: { type: Number, default: null },
    matchMetrics: {
      keywords: Number,
      experience: Number,
      skills: Number,
      fit: Number,
    },
    matchedKeywords: [String],
    missingKeywords: [String],
    tailoringTips: [String],
    // Input snapshot
    resumeTextSnapshot: { type: String, select: false }, // don't return by default
    jobDescriptionSnapshot: { type: String, select: false },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
