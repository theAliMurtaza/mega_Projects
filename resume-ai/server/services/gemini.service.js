import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// gemini-1.5-flash is free-tier, fast, and capable.
// Swap to "gemini-1.5-pro" for higher quality (still free up to limits).
const MODEL = "gemini-2.5-flash";

// ── Raw text completion ───────────────────────────────────────────────────────
export const geminiText = async (systemPrompt, userMessage, maxTokens = 1000) => {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: systemPrompt,
    generationConfig: { maxOutputTokens: maxTokens },
  });

  const result = await model.generateContent(userMessage);
  return result.response.text();
};

// ── JSON completion ────────────────────────────────────────────────────────────
// Gemini supports response_mime_type: "application/json" for guaranteed JSON output
export const geminiJSON = async (systemPrompt, userMessage, maxTokens = 1200) => {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      maxOutputTokens: maxTokens,
      responseMimeType: "application/json", // forces clean JSON — no markdown fences
    },
  });

  const result = await model.generateContent(userMessage);
  const raw = result.response.text();

  try {
    return JSON.parse(raw);
  } catch {
    // Fallback: strip any accidental markdown fences and retry parse
    const clean = raw.replace(/```json|```/g, "").trim();
    try {
      return JSON.parse(clean);
    } catch {
      console.error("[Gemini] Failed to parse JSON:", raw.slice(0, 300));
      throw new Error("AI returned malformed JSON. Please try again.");
    }
  }
};

// ── AI Suggestion for a specific resume field ─────────────────────────────────
export const getFieldSuggestion = async (field, context, currentValue) => {
  const system = `You are an expert resume writer and career coach.
Give a short, specific, actionable suggestion (2-3 sentences max).
Be concrete — suggest exact improvements or rewordings.
Do NOT give generic advice. Focus on impact, clarity, and ATS optimization.`;

  const prompt = `Resume field: "${field}"
Current value: ${JSON.stringify(currentValue)}
Context: ${context}

Provide a specific improvement suggestion.`;

  return geminiText(system, prompt, 300);
};

// ── General resume analysis ───────────────────────────────────────────────────
export const analyzeResume = async (resumeText) => {
  const system = `You are an expert resume analyst with 15 years of recruiting experience.
Analyze resumes critically and return ONLY valid JSON.`;

  const prompt = `Analyze this resume thoroughly. Return JSON with EXACTLY this structure:
{
  "score": <integer 0-100>,
  "metrics": {
    "content": <integer 0-100>,
    "impact": <integer 0-100>,
    "ats": <integer 0-100>,
    "clarity": <integer 0-100>
  },
  "feedback": [
    { "type": "good|warn|bad|info", "text": "<specific feedback>" }
  ],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "missingElements": ["<missing 1>", "<missing 2>"]
}

Provide 4-6 feedback items. Be specific and actionable.

Resume:
${resumeText}`;

  return geminiJSON(system, prompt);
};

// ── Job match analysis ────────────────────────────────────────────────────────
export const analyzeJobMatch = async (resumeText, jobDescription) => {
  const system = `You are an expert ATS and job-matching specialist.
Analyze how well a resume matches a job description. Return ONLY valid JSON.`;

  const prompt = `Compare the resume to the job description. Return JSON with EXACTLY this structure:
{
  "matchScore": <integer 0-100>,
  "metrics": {
    "keywords": <integer 0-100>,
    "experience": <integer 0-100>,
    "skills": <integer 0-100>,
    "fit": <integer 0-100>
  },
  "matched": ["<keyword 1>", "<keyword 2>"],
  "missing": ["<missing keyword 1>", "<missing keyword 2>"],
  "feedback": [
    { "type": "good|warn|bad|info", "text": "<specific feedback>" }
  ],
  "tips": ["<tailoring tip 1>", "<tailoring tip 2>", "<tailoring tip 3>"]
}

Provide 5-8 matched keywords, 4-6 missing keywords, 3-5 tailoring tips.

Resume:
${resumeText}

Job Description:
${jobDescription}`;

  return geminiJSON(system, prompt);
};
