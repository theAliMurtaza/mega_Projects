import { createContext, useContext, useState, useCallback } from "react";

const NotifCtx = createContext(null);

export const NotifProvider = ({ children }) => {
  const [notif, setNotif] = useState(null);
  const notify = useCallback((msg, type = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3200);
  }, []);
  return <NotifCtx.Provider value={{ notify }}>{children}{notif && <Toast {...notif} />}</NotifCtx.Provider>;
};

export const useNotif = () => useContext(NotifCtx);

function Toast({ msg, type }) {
  return (
    <div className={`notification ${type === "error" ? "error" : ""}`}>{msg}</div>
  );
}

// Standalone component (used when NotifProvider wraps the app elsewhere)
export default function Notification() {
  return null; // Notifications rendered by NotifProvider
}
