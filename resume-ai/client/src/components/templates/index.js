export { default as ClassicTemplate   } from "./ClassicTemplate.jsx";
export { default as ModernTemplate    } from "./ModernTemplate.jsx";
export { default as MinimalTemplate   } from "./MinimalTemplate.jsx";
export { default as BoldTemplate      } from "./BoldTemplate.jsx";
export { default as ExecutiveTemplate } from "./ExecutiveTemplate.jsx";
export { default as CreativeTemplate  } from "./CreativeTemplate.jsx";
export { default as TechTemplate      } from "./TechTemplate.jsx";
export { default as ElegantTemplate   } from "./ElegantTemplate.jsx";
export { default as ProfileTemplate   } from "./ProfileTemplate.jsx";

import ClassicTemplate   from "./ClassicTemplate.jsx";
import ModernTemplate    from "./ModernTemplate.jsx";
import MinimalTemplate   from "./MinimalTemplate.jsx";
import BoldTemplate      from "./BoldTemplate.jsx";
import ExecutiveTemplate from "./ExecutiveTemplate.jsx";
import CreativeTemplate  from "./CreativeTemplate.jsx";
import TechTemplate      from "./TechTemplate.jsx";
import ElegantTemplate   from "./ElegantTemplate.jsx";
import ProfileTemplate   from "./ProfileTemplate.jsx";

export const TEMPLATE_COMPONENTS = {
  classic:   ClassicTemplate,
  modern:    ModernTemplate,
  minimal:   MinimalTemplate,
  bold:      BoldTemplate,
  executive: ExecutiveTemplate,
  creative:  CreativeTemplate,
  tech:      TechTemplate,
  elegant:   ElegantTemplate,
  profile:   ProfileTemplate,
};

export const TEMPLATE_META = [
  { id: "classic",   name: "Classic",    desc: "Timeless single-column layout",     premium: false, color: "#1a1a2e", icon: "📄" },
  { id: "modern",    name: "Modern",     desc: "Clean two-column design",           premium: false, color: "#0f3460", icon: "🎨" },
  { id: "minimal",   name: "Minimal",    desc: "Ultra-clean whitespace focus",      premium: false, color: "#2d2d2d", icon: "◻"  },
  { id: "bold",      name: "Bold",       desc: "Strong typographic hierarchy",      premium: false, color: "#1b4332", icon: "🌿" },
  { id: "profile",   name: "Profile",    desc: "Photo sidebar with skill bars",     premium: false, color: "#1e3a5f", icon: "🪪" },
  { id: "executive", name: "Executive",  desc: "Premium C-suite aesthetic",         premium: true,  color: "#7c4a03", icon: "👔" },
  { id: "creative",  name: "Creative",   desc: "Stand-out design-forward layout",   premium: true,  color: "#4a0e6b", icon: "💜" },
  { id: "tech",      name: "Tech Pro",   desc: "Developer / engineering focused",   premium: true,  color: "#0a2540", icon: "💻" },
  { id: "elegant",   name: "Elegant",    desc: "Serif luxury with gold accents",    premium: true,  color: "#3d1f00", icon: "✨" },
];

export const getTemplateComponent = (templateId) =>
  TEMPLATE_COMPONENTS[templateId] || ClassicTemplate;
