import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = "claude-sonnet-4-20250514";

// ── Raw text completion ───────────────────────────────────────────────────────
export const claudeText = async (system, userMessage, maxTokens = 1000) => {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: userMessage }],
  });
  return msg.content.map((b) => b.text || "").join("");
};

// ── JSON completion (strips markdown fences) ──────────────────────────────────
export const claudeJSON = async (system, userMessage, maxTokens = 1200) => {
  const raw = await claudeText(system, userMessage, maxTokens);
  const clean = raw.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch {
    console.error("[Claude] Failed to parse JSON:", clean.slice(0, 200));
    throw new Error("AI returned malformed JSON. Please try again.");
  }
};

// ── AI Suggestion for a specific resume field ────────────────────────────────
export const getFieldSuggestion = async (field, context, currentValue) => {
  const system = `You are an expert resume writer and career coach. 
Give a short, specific, actionable suggestion (2-3 sentences max). 
Be concrete — suggest exact improvements or rewordings. 
Do NOT use generic advice. Focus on impact and clarity.`;

  const prompt = `Resume field: "${field}"
Current value: ${JSON.stringify(currentValue)}
Context: ${context}

Provide a specific improvement suggestion.`;

  return claudeText(system, prompt, 300);
};

// ── General resume analysis ──────────────────────────────────────────────────
export const analyzeResume = async (resumeText) => {
  const system = `You are an expert resume analyst with 15 years of recruiting experience. 
Analyze resumes critically and return ONLY valid JSON. No markdown, no explanation outside JSON.`;

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

  return claudeJSON(system, prompt);
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

  return claudeJSON(system, prompt);
};
