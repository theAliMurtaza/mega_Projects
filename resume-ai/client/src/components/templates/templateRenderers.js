// Client-side resume template renderers (pure HTML strings, used for live preview + print-to-PDF)

const skills = (r) =>
  [r.skills?.technical, r.skills?.soft, r.skills?.languages]
    .filter(Boolean).join(", ").split(",").map((s) => s.trim()).filter(Boolean);

export const renderClassic = (r) => {
  const p = r.personal || {};
  const contacts = [p.email, p.phone, p.location, p.linkedin].filter(Boolean);
  return `<div style="font-family:'Times New Roman',serif;color:#111;padding:36px 48px;background:#fff;font-size:13px;line-height:1.5">
    <div style="text-align:center;border-bottom:2px solid #111;padding-bottom:14px;margin-bottom:18px">
      <h1 style="font-size:28px;font-weight:700;margin:0;letter-spacing:1px">${p.name || "YOUR NAME"}</h1>
      <p style="font-size:11px;color:#555;margin:8px 0 0">${contacts.join(" • ")}</p>
    </div>
    ${r.summary ? `<div style="margin-bottom:16px"><h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;border-bottom:1px solid #bbb;padding-bottom:3px">Summary</h2><p style="color:#333;margin:0">${r.summary}</p></div>` : ""}
    ${r.experience?.length ? `<div style="margin-bottom:16px"><h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px;border-bottom:1px solid #bbb;padding-bottom:3px">Experience</h2>${r.experience.map((e) => `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between"><strong>${e.title}</strong><span style="font-size:11px;color:#666">${e.start} – ${e.current ? "Present" : e.end}</span></div><div style="color:#555;font-size:12px">${e.company}${e.location ? ", " + e.location : ""}</div><div style="color:#444;margin-top:4px;white-space:pre-wrap;font-size:12px">${e.description || ""}</div></div>`).join("")}</div>` : ""}
    ${r.education?.length ? `<div style="margin-bottom:16px"><h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px;border-bottom:1px solid #bbb;padding-bottom:3px">Education</h2>${r.education.map((e) => `<div style="display:flex;justify-content:space-between;margin-bottom:6px"><div><strong>${e.degree}</strong> — ${e.institution}${e.gpa ? ` | GPA: ${e.gpa}` : ""}</div><span style="font-size:11px;color:#666">${e.year}</span></div>`).join("")}</div>` : ""}
    ${r.projects?.length ? `<div style="margin-bottom:16px"><h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px;border-bottom:1px solid #bbb;padding-bottom:3px">Projects</h2>${r.projects.map((p) => `<div style="margin-bottom:8px"><strong>${p.name}</strong>${p.tech ? ` <span style="color:#777;font-size:11px">(${p.tech})</span>` : ""}<div style="color:#444;font-size:12px">${p.description || ""}</div></div>`).join("")}</div>` : ""}
    ${skills(r).length ? `<div><h2 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;border-bottom:1px solid #bbb;padding-bottom:3px">Skills</h2><p style="margin:0;color:#444">${skills(r).join(" • ")}</p></div>` : ""}
  </div>`;
};

export const renderModern = (r) => {
  const p = r.personal || {};
  const sk = skills(r);
  return `<div style="font-family:'Helvetica Neue',sans-serif;color:#1a1a1a;display:flex;background:#fff;min-height:900px;font-size:12px">
    <div style="width:220px;min-width:220px;background:#0f3460;color:#fff;padding:30px 20px">
      <div style="margin-bottom:24px"><h1 style="font-size:19px;font-weight:700;color:#fff;margin:0;line-height:1.2">${p.name || "Your Name"}</h1></div>
      <div style="margin-bottom:20px"><h3 style="font-size:9px;color:#7fb3ff;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;border-bottom:1px solid #1e4a7a;padding-bottom:3px">Contact</h3>${[p.email,p.phone,p.location,p.linkedin].filter(Boolean).map((c)=>`<p style="color:#cde;font-size:10px;margin:3px 0;word-break:break-all">${c}</p>`).join("")}</div>
      ${sk.length ? `<div><h3 style="font-size:9px;color:#7fb3ff;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;border-bottom:1px solid #1e4a7a;padding-bottom:3px">Skills</h3>${sk.map((s)=>`<div style="background:#1e4a7a;border-radius:3px;padding:3px 8px;margin:3px 0;font-size:10px;color:#cde">${s}</div>`).join("")}</div>` : ""}
    </div>
    <div style="flex:1;padding:30px 26px">
      ${r.summary ? `<div style="margin-bottom:18px"><h2 style="font-size:10px;font-weight:700;color:#0f3460;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 8px">Summary</h2><p style="color:#444;line-height:1.6;margin:0">${r.summary}</p></div>` : ""}
      ${r.experience?.length ? `<div style="margin-bottom:18px"><h2 style="font-size:10px;font-weight:700;color:#0f3460;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px">Experience</h2>${r.experience.map((e)=>`<div style="margin-bottom:13px;padding-left:12px;border-left:2px solid #0f3460"><div style="display:flex;justify-content:space-between"><strong style="font-size:12px">${e.title}</strong><span style="color:#888;font-size:10px">${e.start} – ${e.current?"Present":e.end}</span></div><div style="color:#0f3460;font-size:11px">${e.company}</div><div style="color:#555;margin-top:3px;white-space:pre-wrap">${e.description||""}</div></div>`).join("")}</div>` : ""}
      ${r.education?.length ? `<div style="margin-bottom:18px"><h2 style="font-size:10px;font-weight:700;color:#0f3460;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px">Education</h2>${r.education.map((e)=>`<div style="margin-bottom:8px"><strong>${e.degree}</strong><span style="color:#666"> — ${e.institution}</span><span style="float:right;color:#888;font-size:10px">${e.year}</span></div>`).join("")}</div>` : ""}
      ${r.projects?.length ? `<div><h2 style="font-size:10px;font-weight:700;color:#0f3460;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px">Projects</h2>${r.projects.map((p)=>`<div style="margin-bottom:8px"><strong>${p.name}</strong>${p.tech?`<span style="color:#0f3460;font-size:10px"> · ${p.tech}</span>`:""}<div style="color:#555">${p.description||""}</div></div>`).join("")}</div>` : ""}
    </div>
  </div>`;
};

export const renderMinimal = (r) => {
  const p = r.personal || {};
  return `<div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;padding:48px 56px;font-size:12px;color:#222;line-height:1.6">
    <h1 style="font-size:32px;font-weight:300;margin:0;letter-spacing:-0.5px;color:#111">${p.name||"Your Name"}</h1>
    <p style="color:#999;font-size:11px;margin:8px 0 36px;letter-spacing:0.3px">${[p.email,p.phone,p.location].filter(Boolean).join("  ·  ")}</p>
    ${r.summary?`<p style="color:#444;margin:0 0 32px;font-size:13px;line-height:1.7;font-style:italic">"${r.summary}"</p>`:""}
    ${r.experience?.length?`<div style="margin-bottom:28px">${r.experience.map((e)=>`<div style="margin-bottom:18px"><div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-weight:600;font-size:13px">${e.title} <span style="font-weight:300;color:#777">@ ${e.company}</span></span><span style="color:#bbb;font-size:10px">${e.start} – ${e.current?"Present":e.end}</span></div><div style="color:#666;margin-top:4px;white-space:pre-wrap;font-size:11px">${e.description||""}</div></div>`).join("")}</div>`:""}
    ${r.education?.length?`<div style="margin-bottom:24px;padding-top:20px;border-top:1px solid #eee">${r.education.map((e)=>`<div style="display:flex;justify-content:space-between"><span>${e.degree} <span style="color:#888">— ${e.institution}</span></span><span style="color:#bbb;font-size:10px">${e.year}</span></div>`).join("")}</div>`:""}
    ${skills(r).length?`<div style="padding-top:20px;border-top:1px solid #eee"><p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px">Skills</p><p style="color:#555;margin:0">${skills(r).join(" · ")}</p></div>`:""}
  </div>`;
};

export const renderBold = (r) => {
  const p = r.personal || {};
  return `<div style="font-family:Georgia,serif;background:#fff;overflow:hidden;font-size:12px">
    <div style="background:#1b4332;color:#fff;padding:34px 40px">
      <h1 style="font-size:32px;font-weight:700;margin:0;color:#d4e9d8;letter-spacing:-0.5px">${p.name||"Your Name"}</h1>
      <p style="color:#6fcf97;margin:8px 0 0;font-size:11px;letter-spacing:1px">${[p.email,p.phone,p.location].filter(Boolean).join(" | ")}</p>
    </div>
    <div style="padding:30px 40px">
      ${r.summary?`<div style="margin-bottom:20px;padding:16px;background:#f0f7f0;border-left:4px solid #1b4332"><p style="margin:0;color:#2d5a27;font-size:13px;font-style:italic;line-height:1.6">${r.summary}</p></div>`:""}
      ${r.experience?.length?`<div style="margin-bottom:20px"><h2 style="font-size:13px;font-weight:700;color:#1b4332;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px">Experience</h2>${r.experience.map((e)=>`<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between"><strong style="font-size:13px;color:#111">${e.title}</strong><span style="background:#1b4332;color:#fff;font-size:9px;padding:2px 8px;border-radius:10px">${e.start} – ${e.current?"Now":e.end}</span></div><div style="color:#1b4332;font-size:12px;font-weight:600">${e.company}</div><div style="color:#555;margin-top:4px;white-space:pre-wrap">${e.description||""}</div></div>`).join("")}</div>`:""}
      ${r.education?.length?`<div style="margin-bottom:20px"><h2 style="font-size:13px;font-weight:700;color:#1b4332;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px">Education</h2>${r.education.map((e)=>`<div style="display:flex;justify-content:space-between;margin-bottom:8px"><span><strong>${e.degree}</strong><span style="color:#666"> — ${e.institution}</span></span><span style="color:#888;font-size:10px">${e.year}</span></div>`).join("")}</div>`:""}
      ${skills(r).length?`<div><h2 style="font-size:13px;font-weight:700;color:#1b4332;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px">Skills</h2><div style="display:flex;flex-wrap:wrap;gap:6px">${skills(r).map((s)=>`<span style="background:#1b4332;color:#d4e9d8;padding:3px 10px;border-radius:4px;font-size:11px">${s}</span>`).join("")}</div></div>`:""}
    </div>
  </div>`;
};

export const renderExecutive = (r) => {
  const p = r.personal || {};
  return `<div style="font-family:Georgia,serif;background:#fefcf7;font-size:12px;border:1px solid #e8d5a3">
    <div style="background:#7c4a03;padding:38px 44px">
      <h1 style="font-size:29px;font-weight:700;color:#fef3e2;margin:0;letter-spacing:0.5px">${p.name||"Your Name"}</h1>
      <div style="height:2px;width:60px;background:#d4af7a;margin:12px 0"></div>
      <p style="color:#e8c98a;font-size:11px;margin:0">${[p.email,p.phone,p.location,p.linkedin].filter(Boolean).join(" · ")}</p>
    </div>
    <div style="padding:30px 44px">
      ${r.summary?`<div style="margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid #e8d5a3"><p style="color:#5c3d1e;font-size:13px;line-height:1.7;margin:0;font-style:italic">${r.summary}</p></div>`:""}
      ${r.experience?.length?`<div style="margin-bottom:20px"><h2 style="font-size:10px;font-weight:700;color:#7c4a03;text-transform:uppercase;letter-spacing:2px;margin:0 0 14px">Career History</h2>${r.experience.map((e)=>`<div style="margin-bottom:15px;padding-left:16px;border-left:3px solid #d4af7a"><div style="display:flex;justify-content:space-between"><strong style="color:#2d1a00;font-size:13px">${e.title}</strong><span style="color:#999;font-size:10px">${e.start} – ${e.current?"Present":e.end}</span></div><div style="color:#7c4a03;font-size:11px;font-weight:700">${e.company}${e.location?", "+e.location:""}</div><div style="color:#555;margin-top:4px;white-space:pre-wrap;line-height:1.5">${e.description||""}</div></div>`).join("")}</div>`:""}
      ${r.education?.length?`<div style="margin-bottom:20px"><h2 style="font-size:10px;font-weight:700;color:#7c4a03;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px">Education</h2>${r.education.map((e)=>`<div style="display:flex;justify-content:space-between;margin-bottom:8px"><span><strong>${e.degree}</strong><span style="color:#777"> · ${e.institution}</span></span><span style="color:#bbb;font-size:10px">${e.year}</span></div>`).join("")}</div>`:""}
      ${skills(r).length?`<div><h2 style="font-size:10px;font-weight:700;color:#7c4a03;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px">Competencies</h2><div style="display:flex;flex-wrap:wrap;gap:6px">${skills(r).map((s)=>`<span style="border:1px solid #d4af7a;color:#7c4a03;padding:2px 10px;border-radius:3px;font-size:11px">${s}</span>`).join("")}</div></div>`:""}
    </div>
  </div>`;
};

export const renderCreative = (r) => {
  const p = r.personal || {};
  return `<div style="font-family:'Helvetica Neue',sans-serif;background:#fff;font-size:12px;display:flex;min-height:900px">
    <div style="width:210px;min-width:210px;background:linear-gradient(180deg,#4a0e6b,#8b2fc9);padding:30px 18px;color:#fff">
      <div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.2);margin-bottom:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:#fff">${(p.name||"?").charAt(0)}</div>
      <h1 style="font-size:16px;color:#fff;font-weight:700;margin:0 0 4px;line-height:1.2">${p.name||"Your Name"}</h1>
      <div style="margin:16px 0"><h3 style="font-size:8px;color:#d4a6ff;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 8px">Contact</h3>${[p.email,p.phone,p.location].filter(Boolean).map((c)=>`<p style="color:#e8d5ff;font-size:10px;margin:3px 0;word-break:break-all">${c}</p>`).join("")}</div>
      ${skills(r).length?`<div><h3 style="font-size:8px;color:#d4a6ff;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 8px">Skills</h3>${skills(r).slice(0,10).map((s)=>`<div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:3px 8px;margin:3px 0;font-size:10px;color:#fff">${s}</div>`).join("")}</div>`:""}
    </div>
    <div style="flex:1;padding:30px 24px">
      ${r.summary?`<div style="margin-bottom:18px;padding:13px;background:#f8f0ff;border-radius:8px"><p style="margin:0;color:#4a0e6b;font-size:12px;line-height:1.6;font-style:italic">${r.summary}</p></div>`:""}
      ${r.experience?.length?`<div style="margin-bottom:18px"><h2 style="font-size:9px;color:#8b2fc9;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;border-bottom:2px solid #8b2fc9;padding-bottom:4px">Experience</h2>${r.experience.map((e)=>`<div style="margin-bottom:13px"><div style="display:flex;justify-content:space-between"><strong>${e.title}</strong><span style="background:#f8f0ff;color:#8b2fc9;padding:1px 8px;border-radius:10px;font-size:10px">${e.start} – ${e.current?"Now":e.end}</span></div><div style="color:#8b2fc9;font-size:11px">${e.company}</div><div style="color:#555;font-size:11px;margin-top:3px;white-space:pre-wrap">${e.description||""}</div></div>`).join("")}</div>`:""}
      ${r.education?.length?`<div style="margin-bottom:18px"><h2 style="font-size:9px;color:#8b2fc9;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;border-bottom:2px solid #8b2fc9;padding-bottom:4px">Education</h2>${r.education.map((e)=>`<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span><strong>${e.degree}</strong><span style="color:#777"> · ${e.institution}</span></span><span style="color:#bbb;font-size:10px">${e.year}</span></div>`).join("")}</div>`:""}
      ${r.projects?.length?`<div><h2 style="font-size:9px;color:#8b2fc9;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;border-bottom:2px solid #8b2fc9;padding-bottom:4px">Projects</h2>${r.projects.map((p)=>`<div style="margin-bottom:8px"><strong>${p.name}</strong>${p.tech?`<span style="color:#aaa;font-size:10px"> · ${p.tech}</span>`:""}<div style="color:#555;font-size:11px">${p.description||""}</div></div>`).join("")}</div>`:""}
    </div>
  </div>`;
};

export const renderTech = (r) => {
  const p = r.personal || {};
  return `<div style="font-family:'Courier New',monospace;background:#0a2540;color:#a8c7e8;padding:34px 38px;font-size:11.5px;line-height:1.6">
    <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #1e4060">
      <span style="color:#4fc3f7">const</span> <span style="color:#81d4fa">resume</span> <span style="color:#fff">=</span> <span style="color:#4fc3f7">{</span><br/>
      <span style="color:#a8c7e8;margin-left:20px">name: </span><span style="color:#a5d6a7">"${p.name||""}"</span>,<br/>
      <span style="color:#a8c7e8;margin-left:20px">email: </span><span style="color:#a5d6a7">"${p.email||""}"</span>,<br/>
      <span style="color:#a8c7e8;margin-left:20px">location: </span><span style="color:#a5d6a7">"${p.location||""}"</span><br/>
      <span style="color:#4fc3f7">}</span>
    </div>
    ${r.summary?`<div style="margin-bottom:18px"><span style="color:#4fc3f7">/**</span><br/><span style="color:#78909c;margin-left:4px"> * ${r.summary}</span><br/><span style="color:#4fc3f7"> */</span></div>`:""}
    ${r.experience?.length?`<div style="margin-bottom:18px"><div style="color:#4fc3f7;margin-bottom:10px">// EXPERIENCE</div>${r.experience.map((e)=>`<div style="margin-bottom:11px;padding:10px 13px;background:#0d2d4a;border-radius:4px;border-left:3px solid #4fc3f7"><div style="color:#81d4fa;font-weight:700">${e.title} <span style="color:#78909c">@ ${e.company}</span> <span style="color:#546e7a;font-size:10px">${e.start}–${e.current?"present":e.end}</span></div><div style="color:#a8c7e8;margin-top:4px;white-space:pre-wrap">${e.description||""}</div></div>`).join("")}</div>`:""}
    ${r.education?.length?`<div style="margin-bottom:18px"><div style="color:#4fc3f7;margin-bottom:10px">// EDUCATION</div>${r.education.map((e)=>`<div style="padding:8px 13px;background:#0d2d4a;border-radius:4px;margin-bottom:5px"><span style="color:#81d4fa">${e.degree}</span> <span style="color:#78909c">·</span> <span style="color:#a8c7e8">${e.institution}</span> <span style="color:#546e7a;font-size:10px">${e.year}</span></div>`).join("")}</div>`:""}
    ${skills(r).length?`<div><div style="color:#4fc3f7;margin-bottom:10px">// SKILLS</div><div style="display:flex;flex-wrap:wrap;gap:6px">${skills(r).map((s)=>`<span style="background:#0d2d4a;border:1px solid #1e4a70;color:#4fc3f7;padding:2px 10px;border-radius:3px;font-size:10px">${s}</span>`).join("")}</div></div>`:""}
  </div>`;
};

export const renderElegant = (r) => {
  const p = r.personal || {};
  return `<div style="font-family:'Palatino Linotype',Palatino,serif;background:#fff9f0;padding:44px 56px;font-size:12px;color:#2d1a00;border:1px solid #e8c98a">
    <div style="text-align:center;margin-bottom:30px;padding-bottom:24px;border-bottom:1px solid #d4af7a">
      <h1 style="font-size:32px;font-weight:400;margin:0;color:#3d1f00;letter-spacing:2px">${p.name||"Your Name"}</h1>
      <div style="font-size:11px;color:#c4903a;margin:10px 0 0;letter-spacing:3px;text-transform:uppercase">${p.linkedin||""}</div>
      <p style="color:#8b6340;font-size:11px;margin:8px 0 0">${[p.email,p.phone,p.location].filter(Boolean).join("  ·  ")}</p>
    </div>
    ${r.summary?`<div style="text-align:center;margin-bottom:26px;padding:16px;border:1px solid #e8c98a;background:#fef8ee"><p style="margin:0;color:#5c3d1e;font-size:13px;line-height:1.8;font-style:italic">${r.summary}</p></div>`:""}
    ${r.experience?.length?`<div style="margin-bottom:22px"><div style="text-align:center;font-size:11px;color:#c4903a;text-transform:uppercase;letter-spacing:3px;margin-bottom:14px">— Professional Experience —</div>${r.experience.map((e)=>`<div style="margin-bottom:15px;padding-bottom:13px;border-bottom:1px dotted #e8c98a"><div style="display:flex;justify-content:space-between;align-items:baseline"><strong style="font-size:13px;color:#2d1a00">${e.title}</strong><em style="color:#9b7040;font-size:10px">${e.start} – ${e.current?"Present":e.end}</em></div><div style="color:#c4903a;font-weight:700;font-size:11px">${e.company}${e.location?", "+e.location:""}</div><div style="color:#5c4030;margin-top:4px;line-height:1.6;white-space:pre-wrap">${e.description||""}</div></div>`).join("")}</div>`:""}
    ${r.education?.length?`<div style="margin-bottom:20px"><div style="text-align:center;font-size:11px;color:#c4903a;text-transform:uppercase;letter-spacing:3px;margin-bottom:12px">— Education —</div>${r.education.map((e)=>`<div style="text-align:center;margin-bottom:8px"><strong>${e.degree}</strong> <span style="color:#8b6340">·</span> <em>${e.institution}</em> <span style="color:#aaa;font-size:10px">${e.year}</span></div>`).join("")}</div>`:""}
    ${skills(r).length?`<div><div style="text-align:center;font-size:11px;color:#c4903a;text-transform:uppercase;letter-spacing:3px;margin-bottom:10px">— Skills & Expertise —</div><p style="text-align:center;color:#5c4030;line-height:2">${skills(r).join(" · ")}</p></div>`:""}
  </div>`;
};

const RENDERERS = {
  classic: renderClassic, modern: renderModern, minimal: renderMinimal, bold: renderBold,
  executive: renderExecutive, creative: renderCreative, tech: renderTech, elegant: renderElegant,
};

export const getTemplateHTML = (resume) => {
  const renderer = RENDERERS[resume?.templateId] || renderClassic;
  return renderer(resume);
};
