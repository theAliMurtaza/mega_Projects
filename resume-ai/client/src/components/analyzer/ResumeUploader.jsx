import { useRef } from "react";

export default function ResumeUploader({ onText }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onText(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <div
      className="border-2 border-dashed border-[#1e2838] rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-[#c9a84c]/30"
      onClick={() => fileRef.current?.click()}
    >
      <input ref={fileRef} type="file" accept=".txt,.md,.text,.pdf" className="hidden" onChange={handleFile} />
      <div className="text-4xl mb-3">📄</div>
      <div className="text-sm text-[#3a4560]">Click to upload a resume file</div>
      <div className="text-xs text-[#2a3040] mt-1">TXT, MD supported · PDF text extraction via server</div>
    </div>
  );
}
