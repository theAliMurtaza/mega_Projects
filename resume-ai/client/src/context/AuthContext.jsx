import { createContext, useState, useEffect, useCallback } from "react";
import { authAPI } from "../services/auth.api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }

    authAPI.getMe()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const signin = useCallback(async (email, password) => {
    const data = await authAPI.signin(email, password);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const data = await authAPI.signup(name, email, password);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const data = await authAPI.getMe();
    setUser(data.user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
