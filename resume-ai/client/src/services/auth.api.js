import api from "./api.js";

export const authAPI = {
  signup: (name, email, password) => api.post("/auth/signup", { name, email, password }),
  signin: (email, password) => api.post("/auth/signin", { email, password }),
  getMe: () => api.get("/auth/me"),
  updateMe: (data) => api.put("/auth/me", data),
  changePassword: (currentPassword, newPassword) =>
    api.put("/auth/password", { currentPassword, newPassword }),
};
