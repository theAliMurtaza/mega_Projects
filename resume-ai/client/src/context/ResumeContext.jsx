import { createContext, useState, useCallback, useEffect, useRef } from "react";

export const ResumeContext = createContext(null);

const DRAFT_KEY = "resume_ai_draft";

export const emptyResume = () => ({
  _id: null,
  title: "Untitled Resume",
  templateId: "classic",
  personal: { name: "", email: "", phone: "", location: "", linkedin: "", website: "", profilePhoto: "", jobTitle: "" },
  summary: "",
  experience: [],
  education: [],
  skills: { technical: "", soft: "" },
  languages: [],   // [{ _id, language, proficiency }]
  projects: [],
  hobbies: "",
  isDraft: false,
});

// Save draft to localStorage (debounced)
const saveDraft = (resume) => {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...resume, _draftSavedAt: Date.now() })); }
  catch {}
};

const loadDraft = () => {
  try { const d = localStorage.getItem(DRAFT_KEY); return d ? JSON.parse(d) : null; }
  catch { return null; }
};

const clearDraft = () => {
  try { localStorage.removeItem(DRAFT_KEY); } catch {}
};

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(emptyResume());
  const [isDirty, setIsDirty] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const draftTimer = useRef(null);

  // Check for existing draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft && (draft.personal?.name || draft.summary || draft.experience?.length)) {
      setHasDraft(true);
    }
  }, []);

  // Auto-save to draft whenever resume changes (2s debounce)
  useEffect(() => {
    if (!isDirty) return;
    clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      saveDraft(resume);
      setHasDraft(true);
    }, 2000);
    return () => clearTimeout(draftTimer.current);
  }, [resume, isDirty]);

  const mark = useCallback((fn) => {
    setResume(fn);
    setIsDirty(true);
  }, []);

  const updateResume    = useCallback((u) => mark((p) => ({ ...p, ...u })), [mark]);
  const updatePersonal  = useCallback((f, v) => mark((p) => ({ ...p, personal: { ...p.personal, [f]: v } })), [mark]);
  const updateSkills    = useCallback((f, v) => mark((p) => ({ ...p, skills: { ...p.skills, [f]: v } })), [mark]);
  const updateHobbies   = useCallback((v) => mark((p) => ({ ...p, hobbies: v })), [mark]);

  // Experience
  const addExperience    = useCallback(() => mark((p) => ({ ...p, experience: [...p.experience, { _id: Date.now().toString(), title: "", company: "", location: "", start: "", end: "", current: false, description: "" }] })), [mark]);
  const updateExperience = useCallback((id, f, v) => mark((p) => ({ ...p, experience: p.experience.map((e) => e._id === id ? { ...e, [f]: v } : e) })), [mark]);
  const removeExperience = useCallback((id) => mark((p) => ({ ...p, experience: p.experience.filter((e) => e._id !== id) })), [mark]);

  // Education
  const addEducation    = useCallback(() => mark((p) => ({ ...p, education: [...p.education, { _id: Date.now().toString(), degree: "", institution: "", field: "", year: "", gpa: "" }] })), [mark]);
  const updateEducation = useCallback((id, f, v) => mark((p) => ({ ...p, education: p.education.map((e) => e._id === id ? { ...e, [f]: v } : e) })), [mark]);
  const removeEducation = useCallback((id) => mark((p) => ({ ...p, education: p.education.filter((e) => e._id !== id) })), [mark]);

  // Projects
  const addProject    = useCallback(() => mark((p) => ({ ...p, projects: [...p.projects, { _id: Date.now().toString(), name: "", description: "", tech: "", url: "" }] })), [mark]);
  const updateProject = useCallback((id, f, v) => mark((p) => ({ ...p, projects: p.projects.map((proj) => proj._id === id ? { ...proj, [f]: v } : proj) })), [mark]);
  const removeProject = useCallback((id) => mark((p) => ({ ...p, projects: p.projects.filter((proj) => proj._id !== id) })), [mark]);

  // Languages
  const addLanguage    = useCallback(() => mark((p) => ({ ...p, languages: [...p.languages, { _id: Date.now().toString(), language: "", proficiency: "Conversational" }] })), [mark]);
  const updateLanguage = useCallback((id, f, v) => mark((p) => ({ ...p, languages: p.languages.map((l) => l._id === id ? { ...l, [f]: v } : l) })), [mark]);
  const removeLanguage = useCallback((id) => mark((p) => ({ ...p, languages: p.languages.filter((l) => l._id !== id) })), [mark]);

  const loadResume = useCallback((data) => {
    setResume({ ...emptyResume(), ...data });
    setIsDirty(false);
    clearDraft();
    setHasDraft(false);
  }, []);

  const restoreDraft = useCallback(() => {
    const draft = loadDraft();
    if (draft) { setResume({ ...emptyResume(), ...draft }); setIsDirty(true); }
  }, []);

  const resetResume = useCallback(() => {
    setResume(emptyResume());
    setIsDirty(false);
    clearDraft();
    setHasDraft(false);
  }, []);

  const markSaved = useCallback(() => {
    setIsDirty(false);
    clearDraft();
    setHasDraft(false);
  }, []);

  return (
    <ResumeContext.Provider value={{
      resume, isDirty, hasDraft,
      updateResume, updatePersonal, updateSkills, updateHobbies,
      addExperience, updateExperience, removeExperience,
      addEducation,  updateEducation,  removeEducation,
      addProject,    updateProject,    removeProject,
      addLanguage,   updateLanguage,   removeLanguage,
      loadResume, restoreDraft, resetResume, markSaved, setIsDirty,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
