import { getTemplateComponent } from "../templates/index.js";

/**
 * ResumePreview — renders the active template as a real React component.
 * Used in the builder split-pane and the templates page preview.
 */
export default function ResumePreview({ resume }) {
  const TemplateComponent = getTemplateComponent(resume?.templateId);
  return <TemplateComponent resume={resume} />;
}
