import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import AuthPage      from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import BuilderPage   from "./pages/BuilderPage.jsx";
import TemplatesPage from "./pages/TemplatesPage.jsx";
import AnalyzerPage  from "./pages/AnalyzerPage.jsx";
import BillingPage   from "./pages/BillingPage.jsx";
import Sidebar       from "./components/layout/Sidebar.jsx";
import Topbar        from "./components/layout/Topbar.jsx";
import Notification  from "./components/layout/Notification.jsx";

const ProtectedLayout = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-full bg-[#080c14] text-[#3a4560] text-sm">Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return (
    <div className="flex h-screen overflow-hidden bg-[#080c14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
      <Notification />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/auth"        element={<AuthPage />} />
      <Route path="/"            element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
      <Route path="/builder"     element={<ProtectedLayout><BuilderPage /></ProtectedLayout>} />
      <Route path="/builder/:id" element={<ProtectedLayout><BuilderPage /></ProtectedLayout>} />
      <Route path="/templates"   element={<ProtectedLayout><TemplatesPage /></ProtectedLayout>} />
      <Route path="/analyzer"    element={<ProtectedLayout><AnalyzerPage /></ProtectedLayout>} />
      <Route path="/billing"     element={<ProtectedLayout><BillingPage /></ProtectedLayout>} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  );
}
