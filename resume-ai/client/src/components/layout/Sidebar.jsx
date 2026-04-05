import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

const NAV = [
  { group: "Overview", items: [{ path: "/",          icon: "◉", label: "Dashboard"      }] },
  { group: "Build",    items: [{ path: "/builder",   icon: "◈", label: "Resume Builder" },
                                { path: "/templates", icon: "◇", label: "Templates"      }] },
  { group: "Tools",    items: [{ path: "/analyzer",  icon: "◎", label: "AI Analyzer"    },
                                { path: "/billing",   icon: "◆", label: "Plans & Billing"}] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPremium = user?.plan === "pro" || user?.plan === "pro_annual";

  return (
    <aside className="w-[210px] min-w-[210px] bg-[#0c1118] border-r border-[#1a2030] flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="px-[18px] py-5 border-b border-[#1a2030]">
        <div className="font-serif text-xl font-bold text-[#c9a84c]">Resumé.ai</div>
        <div className="text-[10px] text-[#3a4050] uppercase tracking-widest mt-0.5">Pro Builder</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2.5">
        {NAV.map(({ group, items }) => (
          <div key={group}>
            <div className="text-[9px] text-[#2a3040] uppercase tracking-[1.5px] px-[18px] pt-3.5 pb-1">{group}</div>
            {items.map(({ path, icon, label }) => {
              const active = pathname === path || (path !== "/" && pathname.startsWith(path));
              return (
                <div key={path} className={`nav-item ${active ? "active" : ""}`} onClick={() => navigate(path)}>
                  <span className="text-sm w-4 text-center">{icon}</span>
                  {label}
                  {path === "/templates" && !isPremium && (
                    <span className="absolute right-3 text-[9px] bg-[#7c4a03] text-[#f5d38a] px-1.5 py-0.5 rounded-full">4 Free</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-3.5 border-t border-[#1a2030]">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-[#101620] rounded-lg cursor-pointer hover:bg-[#151e2a] transition-colors" onClick={logout} title="Click to sign out">
          <div className="w-7 h-7 rounded-full bg-[#1e2d50] flex items-center justify-center text-xs font-semibold text-[#c9a84c] border border-[#2a3a60] shrink-0">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>
          <div className="text-xs text-[#8090a8] flex-1 truncate">{user?.name || user?.email}</div>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#7c4a03]/10 text-[#c9a84c] border border-[#7c4a03]/25">
            {user?.plan || "free"}
          </span>
        </div>
      </div>
    </aside>
  );
}
