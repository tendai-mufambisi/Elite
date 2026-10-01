import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Trash2, Upload } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/components/admin/api";
import { adminHead } from "@/components/admin/head";
import { AdminCard, AdminPage, Notice } from "@/components/admin/shell";

export const Route = createFileRoute("/admin/_dash/settings")({
  head: () => adminHead("Settings"),
  component: SettingsPage,
});

type Settings = { values: Record<string, string>; companyProfile: string };
type Field = { key: string; label: string; help?: string; rows?: number; type?: string };

const sections: { title: string; description: string; fields: Field[] }[] = [
  {
    title: "Contact details",
    description: "Used in the header, footer, contact page and every WhatsApp button.",
    fields: [
      { key: "phone", label: "Phone number", type: "tel" },
      {
        key: "whatsapp_number",
        label: "WhatsApp number",
        help: "International format, e.g. 27842586400.",
      },
      { key: "email", label: "Email address", type: "email" },
      { key: "facebook", label: "Facebook page link", type: "url" },
      {
        key: "address",
        label: "Address",
        help: "Optional. Shown on the contact page and footer when filled in.",
        rows: 2,
      },
      {
        key: "maps_embed_url",
        label: "Google Maps embed link",
        help: 'Optional. In Google Maps: Share › Embed a map › copy only the link inside src="…".',
      },
    ],
  },
  {
    title: "Founder",
    description: "The “Meet the founder” section on the home and about pages.",
    fields: [
      { key: "founder_name", label: "Name" },
      {
        key: "founder_bio",
        label: "About the founder",
        help: "Each line becomes a paragraph.",
        rows: 4,
      },
    ],
  },
  {
    title: "Messages",
    description: "Ready-made text for WhatsApp.",
    fields: [
      { key: "whatsapp_popup_text", label: "WhatsApp pop-up message", rows: 2 },
      { key: "quote_text", label: "Start of every WhatsApp quote message" },
    ],
  },
  {
    title: "Figures",
    description: "Real numbers only. Shown on the home and about pages.",
    fields: [
      { key: "stat_years", label: "Years of experience" },
      { key: "stat_jobs", label: "Completed jobs" },
      { key: "stat_satisfaction", label: "Satisfied clients (%)" },
    ],
  },
];

function SettingsPage() {
  const queryClient = useQueryClient();
  const [notice, setNotice] = useState({ message: "", tone: "ok" as "ok" | "error" });
  const [pwNotice, setPwNotice] = useState({ message: "", tone: "ok" as "ok" | "error" });
  const [pdfBusy, setPdfBusy] = useState(false);
  const pdfInput = useRef<HTMLInputElement>(null);
  const { data } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => api<Settings>("/api/admin/settings"),
  });
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin"] });

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = Object.fromEntries(new FormData(e.currentTarget));
    setNotice({ message: "", tone: "ok" });
    try {
      await api("/api/admin/settings", { method: "PUT", json });
      setNotice({ message: "Saved. The website is updated.", tone: "ok" });
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Could not save.", tone: "error" });
    }
    await refresh();
  };

  const uploadPdf = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    setPdfBusy(true);
    setNotice({ message: "", tone: "ok" });
    try {
      await api("/api/admin/settings/profile", { form });
      setNotice({ message: "Company profile published.", tone: "ok" });
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Upload failed.", tone: "error" });
    }
    setPdfBusy(false);
    if (pdfInput.current) pdfInput.current.value = "";
    await refresh();
  };

  const removePdf = async () => {
    if (!window.confirm("Remove the company profile from the website?")) return;
    await api("/api/admin/settings/profile", { method: "DELETE" }).catch(() => undefined);
    await refresh();
  };

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setPwNotice({ message: "", tone: "ok" });
    try {
      await api("/api/admin/settings/password", {
        json: { current: form.get("current"), next: form.get("next") },
      });
      formEl.reset();
      setPwNotice({ message: "Password changed.", tone: "ok" });
    } catch (err) {
      setPwNotice({
        message: err instanceof Error ? err.message : "Could not change the password.",
        tone: "error",
      });
    }
  };

  return (
    <AdminPage
      title="Settings"
      description="Contact details, founder, figures, company profile and your password."
    >
      {data && (
        <form onSubmit={save} className="admin-stack">
          {sections.map((section) => (
            <AdminCard key={section.title} title={section.title} description={section.description}>
              <div className="admin-form">
                {section.fields.map((f) => (
                  <label key={f.key} className="admin-field">
                    <span className="admin-label">{f.label}</span>
                    {f.help && <small className="admin-help">{f.help}</small>}
                    {f.rows ? (
                      <textarea
                        name={f.key}
                        className="admin-input"
                        rows={f.rows}
                        defaultValue={data.values[f.key]}
                      />
                    ) : (
                      <input
                        name={f.key}
                        type={f.type ?? "text"}
                        className="admin-input"
                        defaultValue={data.values[f.key]}
                      />
                    )}
                  </label>
                ))}
              </div>
            </AdminCard>
          ))}
          <div className="admin-save-bar">
            <Notice message={notice.message} tone={notice.tone} />
            <Button type="submit" variant="brand" size="large">
              Save settings
            </Button>
          </div>
        </form>
      )}

      <AdminCard
        title="Company profile"
        description="A PDF visitors can open from the website footer. PDF only, up to 25 MB. When none is uploaded, the link is hidden."
      >
        <div className="admin-inline">
          {data?.companyProfile ? (
            <>
              <a href={data.companyProfile} target="_blank" rel="noopener" className="admin-link">
                <FileText size={16} /> View the published PDF
              </a>
              <button type="button" className="admin-text-btn" onClick={removePdf}>
                <Trash2 size={14} /> Remove
              </button>
            </>
          ) : (
            <span className="admin-help">Not published.</span>
          )}
          <input
            ref={pdfInput}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => uploadPdf(e.target.files)}
          />
          <Button
            type="button"
            variant="brand"
            disabled={pdfBusy}
            onClick={() => pdfInput.current?.click()}
          >
            <Upload />{" "}
            {pdfBusy ? "Uploading…" : data?.companyProfile ? "Replace PDF" : "Upload PDF"}
          </Button>
        </div>
      </AdminCard>

      <AdminCard title="Change password">
        <form className="admin-form-row" onSubmit={changePassword}>
          <label className="admin-field">
            <span className="admin-label">Current password</span>
            <input
              name="current"
              type="password"
              className="admin-input"
              autoComplete="current-password"
              required
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">New password</span>
            <input
              name="next"
              type="password"
              className="admin-input"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <div className="admin-form-actions">
            <Button type="submit" variant="brand">
              Change password
            </Button>
          </div>
        </form>
        <Notice message={pwNotice.message} tone={pwNotice.tone} />
      </AdminCard>
    </AdminPage>
  );
}
