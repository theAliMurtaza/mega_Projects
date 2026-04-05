import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext.jsx";

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
