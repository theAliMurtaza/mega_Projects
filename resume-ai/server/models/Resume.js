import mongoose from "mongoose";

// _id: false on all subdocuments — the client generates string IDs (Date.now())
// which are NOT valid ObjectIds. MongoDB will auto-generate its own _ids after
// our controller strips the client _id fields before saving.
const experienceSchema = new mongoose.Schema({
  title:       String,
  company:     String,
  location:    String,
  start:       String,
  end:         String,
  current:     { type: Boolean, default: false },
  description: String,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree:      String,
  institution: String,
  field:       String,
  year:        String,
  gpa:         String,
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name:        String,
  description: String,
  tech:        String,
  url:         String,
}, { _id: false });

const languageSchema = new mongoose.Schema({
  language:    String,
  proficiency: String,
}, { _id: false });

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
      index:    true,
    },
    title:      { type: String, default: "Untitled Resume", trim: true },
    templateId: {
      type:    String,
      enum:    ["classic","modern","minimal","bold","executive","creative","tech","elegant","profile"],
      default: "classic",
    },
    personal: {
      name:         { type: String, default: "" },
      email:        { type: String, default: "" },
      phone:        { type: String, default: "" },
      location:     { type: String, default: "" },
      linkedin:     { type: String, default: "" },
      website:      { type: String, default: "" },
      profilePhoto: { type: String, default: "" },
      jobTitle:     { type: String, default: "" },
    },
    summary:    { type: String, default: "" },
    experience: [experienceSchema],
    education:  [educationSchema],
    skills: {
      technical: { type: String, default: "" },
      soft:      { type: String, default: "" },
    },
    languages:  [languageSchema],
    projects:   [projectSchema],
    hobbies:    { type: String, default: "" },
    isDraft:    { type: Boolean, default: false },
    lastScore:  { type: Number, default: null },
    isPublic:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-title from personal.name
resumeSchema.pre("save", function (next) {
  if (this.personal?.name && this.title === "Untitled Resume") {
    this.title = `${this.personal.name}'s Resume`;
  }
  next();
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
