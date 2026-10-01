import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/components/admin/api";
import { adminHead } from "@/components/admin/head";
import {
  AdminCard,
  AdminPage,
  MoveButtons,
  Notice,
  PhotoUpload,
  Thumbnail,
} from "@/components/admin/shell";

export const Route = createFileRoute("/admin/_dash/projects/$id")({
  head: () => adminHead("Edit project"),
  component: EditProject,
});

type Project = {
  id: number;
  title: string;
  category: string;
  categories: string[];
  images: { id: number; slot: string; src: string; alt: string; video: boolean; cover: boolean }[];
};

function EditProject() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [notice, setNotice] = useState({ message: "", tone: "ok" as "ok" | "error" });
  const key = ["admin", "project", id];
  const { data, error } = useQuery({
    queryKey: key,
    queryFn: () => api<Project>(`/api/admin/projects/${id}`),
  });
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin"] });

  const run = async (fn: () => Promise<unknown>, done = "") => {
    setNotice({ message: "", tone: "ok" });
    try {
      await fn();
      if (done) setNotice({ message: done, tone: "ok" });
    } catch (e) {
      setNotice({
        message: e instanceof Error ? e.message : "Something went wrong.",
        tone: "error",
      });
    }
    await refresh();
  };

  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    run(
      () =>
        api(`/api/admin/projects/${id}`, {
          method: "PUT",
          json: { title: form.get("title"), category: form.get("category") },
        }),
      "Saved. The Projects page is updated.",
    );
  };

  const back = (
    <Link to="/admin/projects" className="admin-back">
      <ArrowLeft size={15} /> All projects
    </Link>
  );
  if (error)
    return (
      <AdminPage title="Project" back={back}>
        <Notice message={error.message} tone="error" />
      </AdminPage>
    );
  if (!data)
    return (
      <AdminPage title="Project" back={back}>
        <p className="admin-empty">Loading…</p>
      </AdminPage>
    );

  return (
    <AdminPage title={data.title} description={data.category} back={back}>
      <Notice message={notice.message} tone={notice.tone} />
      <AdminCard title="Details">
        <form className="admin-form-row" onSubmit={save} key={`${data.title}|${data.category}`}>
          <label className="admin-field">
            <span className="admin-label">Caption</span>
            <input
              name="title"
              className="admin-input"
              defaultValue={data.title}
              required
              maxLength={200}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Category</span>
            <select name="category" className="admin-input" defaultValue={data.category}>
              {data.categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="admin-form-actions">
            <Button type="submit" variant="brand">
              Save
            </Button>
          </div>
        </form>
      </AdminCard>

      <AdminCard
        title="Photos"
        description="The cover is shown on the Projects page; the rest appear when a visitor opens the project. JPG, PNG, WebP or AVIF, up to 10 MB each. Photos are resized before upload."
        actions={
          <PhotoUpload endpoint={`/api/admin/projects/${id}/images`} multiple onDone={refresh} />
        }
      >
        {data.images.length === 0 && (
          <p className="admin-empty">No photos yet. Add the first one; it becomes the cover.</p>
        )}
        <ul className="admin-gallery">
          {data.images.map((img, i) => (
            <li key={img.id} className={img.cover ? "is-cover" : undefined}>
              <Thumbnail image={img} className="admin-thumb-large" />
              {img.cover && <span className="admin-badge">Cover</span>}
              <div className="admin-gallery-actions">
                <MoveButtons
                  label="photo"
                  first={i === 0}
                  last={i === data.images.length - 1}
                  onMove={(dir) =>
                    run(() =>
                      api(`/api/admin/projects/${id}/images/${img.id}/move`, { json: { dir } }),
                    )
                  }
                />
                {!img.cover && (
                  <button
                    type="button"
                    className="admin-text-btn"
                    onClick={() =>
                      run(() =>
                        api(`/api/admin/projects/${id}/images/${img.id}/cover`, { method: "POST" }),
                      )
                    }
                  >
                    <Star size={14} /> Set as cover
                  </button>
                )}
                <button
                  type="button"
                  className="admin-icon-btn"
                  aria-label="Delete photo"
                  onClick={() => {
                    if (window.confirm("Delete this photo? This cannot be undone.")) {
                      run(() =>
                        api(`/api/admin/projects/${id}/images/${img.id}`, { method: "DELETE" }),
                      );
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </AdminCard>
    </AdminPage>
  );
}
