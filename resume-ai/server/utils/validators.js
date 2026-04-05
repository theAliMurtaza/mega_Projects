import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const resumeSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  templateId: Joi.string()
    .valid("classic","modern","minimal","bold","executive","creative","tech","elegant","profile")
    .optional(),
  personal: Joi.object({
    name:         Joi.string().allow("").max(100),
    email:        Joi.string().allow("").max(200),
    phone:        Joi.string().allow("").max(30),
    location:     Joi.string().allow("").max(100),
    linkedin:     Joi.string().allow("").max(200),
    website:      Joi.string().allow("").max(200),
    profilePhoto: Joi.string().allow("").max(5000000), // base64 can be large
    jobTitle:     Joi.string().allow("").max(200),
  }).optional(),
  summary: Joi.string().allow("").max(2000).optional(),
  experience: Joi.array().items(Joi.object({
    title:       Joi.string().allow("").max(200),
    company:     Joi.string().allow("").max(200),
    location:    Joi.string().allow("").max(100),
    start:       Joi.string().allow("").max(50),
    end:         Joi.string().allow("").max(50),
    current:     Joi.boolean(),
    description: Joi.string().allow("").max(5000),
  })).optional(),
  education: Joi.array().items(Joi.object({
    degree:      Joi.string().allow("").max(200),
    institution: Joi.string().allow("").max(200),
    field:       Joi.string().allow("").max(100),
    year:        Joi.string().allow("").max(20),
    gpa:         Joi.string().allow("").max(20),
  })).optional(),
  skills: Joi.object({
    technical: Joi.string().allow("").max(1000),
    soft:      Joi.string().allow("").max(1000),
  }).optional(),
  languages: Joi.array().items(Joi.object({
    language:    Joi.string().allow("").max(100),
    proficiency: Joi.string().allow("").max(50),
  })).optional(),
  projects: Joi.array().items(Joi.object({
    name:        Joi.string().allow("").max(200),
    description: Joi.string().allow("").max(2000),
    tech:        Joi.string().allow("").max(500),
    url:         Joi.string().allow("").max(300),
  })).optional(),
  hobbies:  Joi.string().allow("").max(1000).optional(),
  isDraft:  Joi.boolean().optional(),
  isPublic: Joi.boolean().optional(),
});

export const analysisSchema = Joi.object({
  resumeText:      Joi.string().min(50).max(20000).optional(),
  resumeId:        Joi.string().optional(),
  jobDescription:  Joi.string().min(20).max(10000).optional(),
  type:            Joi.string().valid("general","job_match").required(),
});

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const details = error.details.map((d) => d.message);
    return res.status(400).json({ error: "Validation failed", details });
  }
  next();
};
