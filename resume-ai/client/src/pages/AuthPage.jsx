import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function AuthPage() {
  const { signin, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Email and password are required."); return; }
    if (mode === "signup" && !form.name) { setError("Name is required."); return; }
    setLoading(true);
    try {
      if (mode === "signin") await signin(form.email, form.password);
      else await signup(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#0c1118] border border-[#1a2030] rounded-2xl p-10">

        {/* Logo */}
        <div className="text-center mb-7">
          <div className="font-serif text-[30px] font-bold text-[#c9a84c]">Resumé.ai</div>
          <div className="text-xs text-[#3a4560] mt-1">
            {mode === "signin" ? "Welcome back — sign in to continue" : "Create your account to get started"}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-[#1a0810] border border-[#5a1020] rounded-lg px-3 py-2 text-xs text-[#e04060] mb-4">{error}</div>
        )}

        {/* Fields */}
        {mode === "signup" && (
          <div className="form-group">
            <label>Full Name</label>
            <input value={form.name} placeholder="Jane Doe" onChange={set("name")} />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={form.email} placeholder="you@example.com" onChange={set("email")} />
        </div>
        <div className="form-group mb-5">
          <label>Password</label>
          <input type="password" value={form.password} placeholder="••••••••" onChange={set("password")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
        </div>

        <button className="btn btn-gold btn-full py-3 text-sm" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2.5 my-4">
          <div className="flex-1 h-px bg-[#1a2030]" />
          <span className="text-[11px] text-[#2a3040]">or</span>
          <div className="flex-1 h-px bg-[#1a2030]" />
        </div>

        <button className="btn btn-ghost btn-full" onClick={() => { setMode(m => m === "signin" ? "signup" : "signin"); setError(""); }}>
          {mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>

        <p className="text-center text-[10px] text-[#2a3040] mt-5">
          Demo: use any email / password to register
        </p>
      </div>
    </div>
  );
}
