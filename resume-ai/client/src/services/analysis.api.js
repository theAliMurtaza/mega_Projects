import api from "./api.js";

export const analysisAPI = {
  getAll: () => api.get("/analysis"),
  general: (data) => api.post("/analysis/general", data),
  match: (data) => api.post("/analysis/match", data),
  upload: (file) => {
    const form = new FormData();
    form.append("resume", file);
    return api.post("/analysis/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  suggest: (field, context, currentValue) =>
    api.post("/analysis/suggest", { field, context, currentValue }),
};
