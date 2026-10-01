import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/components/admin/api";
import { adminHead } from "@/components/admin/head";
import {
  AdminCard,
  AdminPage,
  MoveButtons,
  Notice,
  Thumbnail,
  type Thumb,
} from "@/components/admin/shell";

export const Route = createFileRoute("/admin/_dash/projects/")({
  validateSearch: (search: Record<string, unknown>): { add?: boolean } =>
    search["add"] ? { add: true } : {},
  head: () => adminHead("Projects"),
  component: Projects,
});

type ProjectList = {
  categories: string[];
  items: { id: number; title: string; category: string; photos: number; image: Thumb }[];
};

function Projects() {
  const { add } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(Boolean(add));
  const { data } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => api<ProjectList>("/api/admin/projects"),
  });
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin"] });

  const run = async (fn: () => Promise<unknown>) => {
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
    await refresh();
  };

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError("");
    try {
      const { id } = await api<{ id: number }>("/api/admin/projects", {
        json: { title: form.get("title"), category: form.get("category") },
      });
      await refresh();
      navigate({ to: "/admin/projects/$id", params: { id: String(id) } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add the project.");
    }
  };

  return (
    <AdminPage
      title="Projects"
      description="The photos on the Projects page, newest first. Use the arrows to change the order."
      actions={
        <Button variant="brand" onClick={() => setAdding(true)}>
          <Plus /> Add project
        </Button>
      }
    >
      <Notice message={error} tone="error" />
      {adding && data && (
        <AdminCard
          title="New project"
          description="Give it a caption and a category, then add its photos."
        >
          <form className="admin-form-row" onSubmit={create}>
            <label className="admin-field">
              <span className="admin-label">Caption</span>
              <input name="title" className="admin-input" required maxLength={200} autoFocus />
            </label>
            <label className="admin-field">
              <span className="admin-label">Category</span>
              <select name="category" className="admin-input" required defaultValue="">
                <option value="" disabled>
                  Choose…
                </option>
                {data.categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <div className="admin-form-actions">
              <Button type="submit" variant="brand">
                Continue to photos
              </Button>
              <Button type="button" variant="outline" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </AdminCard>
      )}
      <AdminCard>
        {data && data.items.length === 0 && (
          <p className="admin-empty">No projects yet. Add the first one.</p>
        )}
        <ul className="admin-list">
          {data?.items.map((p, i) => (
            <li key={p.id}>
              <MoveButtons
                label={p.title}
                first={i === 0}
                last={i === data.items.length - 1}
                onMove={(dir) =>
                  run(() => api(`/api/admin/projects/${p.id}/move`, { json: { dir } }))
                }
              />
              <Thumbnail image={p.image} />
              <div className="admin-list-text">
                <strong>{p.title}</strong>
                <small>
                  {p.category} · {p.photos} {p.photos === 1 ? "photo" : "photos"}
                </small>
              </div>
              <Link to="/admin/projects/$id" params={{ id: String(p.id) }} className="admin-link">
                Edit
              </Link>
              <button
                type="button"
                className="admin-icon-btn"
                aria-label={`Delete ${p.title}`}
                onClick={() => {
                  if (
                    window.confirm(`Delete "${p.title}" and its photos? This cannot be undone.`)
                  ) {
                    run(() => api(`/api/admin/projects/${p.id}`, { method: "DELETE" }));
                  }
                }}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </AdminCard>
    </AdminPage>
  );
}
