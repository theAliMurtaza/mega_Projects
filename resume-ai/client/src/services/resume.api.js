import api from "./api.js";

export const resumeAPI = {
  getAll: () => api.get("/resumes"),
  getOne: (id) => api.get(`/resumes/${id}`),
  create: (data) => api.post("/resumes", data),
  update: (id, data) => api.put(`/resumes/${id}`, data),
  remove: (id) => api.delete(`/resumes/${id}`),
  downloadPDF: (id) =>
    api.get(`/resumes/${id}/pdf`, { responseType: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    }),
  downloadDOCX: (id) =>
    api.get(`/resumes/${id}/docx`, { responseType: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.docx";
      a.click();
      URL.revokeObjectURL(url);
    }),
};
