import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
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
  type Thumb,
} from "@/components/admin/shell";

export const Route = createFileRoute("/admin/_dash/services/$id")({
  head: () => adminHead("Edit service"),
  component: EditService,
});

type Service = {
  id: number;
  slug: string;
  title: string;
  short: string;
  intro: string;
  benefits: string;
  finishes: string;
  faqs: string;
  coverImage: Thumb;
  bannerImage: Thumb;
  images: { id: number; label: string; src: string; alt: string; video: boolean; slot: string }[];
};

function EditService() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [notice, setNotice] = useState({ message: "", tone: "ok" as "ok" | "error" });
  const newLabel = useRef<HTMLInputElement>(null);
  const { data, error } = useQuery({
    queryKey: ["admin", "service", id],
    queryFn: () => api<Service>(`/api/admin/services/${id}`),
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
    const json = Object.fromEntries(
      ["title", "short", "intro", "benefits", "finishes", "faqs"].map((k) => [k, form.get(k)]),
    );
    run(
      () => api(`/api/admin/services/${id}`, { method: "PUT", json }),
      "Saved. The service page is updated.",
    );
  };

  const back = (
    <Link to="/admin/services" className="admin-back">
      <ArrowLeft size={15} /> All services
    </Link>
  );
  if (error)
    return (
      <AdminPage title="Service" back={back}>
        <Notice message={error.message} tone="error" />
      </AdminPage>
    );
  if (!data)
    return (
      <AdminPage title="Service" back={back}>
        <p className="admin-empty">Loading…</p>
      </AdminPage>
    );

  return (
    <AdminPage
      title={data.title}
      back={back}
      actions={
        <Button asChild variant="outline">
          <a href={`/services/${data.slug}`} target="_blank" rel="noopener">
            View page
          </a>
        </Button>
      }
    >
      <Notice message={notice.message} tone={notice.tone} />

      <div className="admin-two">
        <AdminCard
          title="Main photo"
          description="Shown beside the introduction and on the service card."
          actions={
            <PhotoUpload
              endpoint={`/api/admin/services/${id}/photo/cover`}
              label="Replace"
              onDone={refresh}
            />
          }
        >
          <Thumbnail image={data.coverImage} className="admin-thumb-large" />
        </AdminCard>
        <AdminCard
          title="Banner"
          description="The wide photo behind the page title."
          actions={
            <PhotoUpload
              endpoint={`/api/admin/services/${id}/photo/banner`}
              label="Replace"
              onDone={refresh}
            />
          }
        >
          <Thumbnail image={data.bannerImage ?? data.coverImage} className="admin-thumb-large" />
        </AdminCard>
      </div>

      <AdminCard title="Text">
        <form
          className="admin-form"
          onSubmit={save}
          key={JSON.stringify([data.title, data.short, data.intro])}
        >
          <label className="admin-field">
            <span className="admin-label">Title</span>
            <input
              name="title"
              className="admin-input"
              defaultValue={data.title}
              required
              maxLength={120}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Short line</span>
            <input name="short" className="admin-input" defaultValue={data.short} maxLength={200} />
          </label>
          <label className="admin-field">
            <span className="admin-label">Introduction</span>
            <textarea name="intro" className="admin-input" rows={5} defaultValue={data.intro} />
          </label>
          <label className="admin-field">
            <span className="admin-label">Key benefits</span>
            <small className="admin-help">One per line.</small>
            <textarea
              name="benefits"
              className="admin-input"
              rows={6}
              defaultValue={data.benefits}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Available finishes</span>
            <small className="admin-help">One per line. Leave empty to hide this list.</small>
            <textarea
              name="finishes"
              className="admin-input"
              rows={4}
              defaultValue={data.finishes}
            />
          </label>
          <label className="admin-field">
            <span className="admin-label">Questions and answers</span>
            <small className="admin-help">
              Question on one line, the answer on the next, then an empty line before the next
              question.
            </small>
            <textarea name="faqs" className="admin-input" rows={12} defaultValue={data.faqs} />
          </label>
          <div className="admin-form-actions">
            <Button type="submit" variant="brand">
              Save text
            </Button>
          </div>
        </form>
      </AdminCard>

      <AdminCard
        title="Gallery"
        description="“The finished look” photos on the service page. The label (optional) is shown on the home page service card."
        actions={
          <div className="admin-inline">
            <input
              ref={newLabel}
              className="admin-input"
              placeholder="Label for new photos (optional)"
              maxLength={120}
            />
            <PhotoUpload
              endpoint={`/api/admin/services/${id}/images`}
              multiple
              extra={() => ({ label: newLabel.current?.value ?? "" })}
              onDone={refresh}
            />
          </div>
        }
      >
        {data.images.length === 0 && <p className="admin-empty">No gallery photos yet.</p>}
        <ul className="admin-gallery">
          {data.images.map((img, i) => (
            <li key={img.id}>
              <Thumbnail image={img} className="admin-thumb-large" />
              <input
                className="admin-input"
                defaultValue={img.label}
                placeholder="Label (optional)"
                aria-label="Photo label"
                maxLength={120}
                onBlur={(e) => {
                  if (e.target.value !== img.label) {
                    run(
                      () =>
                        api(`/api/admin/services/${id}/images/${img.id}`, {
                          method: "PUT",
                          json: { label: e.target.value },
                        }),
                      "Label saved.",
                    );
                  }
                }}
              />
              <div className="admin-gallery-actions">
                <MoveButtons
                  label="photo"
                  first={i === 0}
                  last={i === data.images.length - 1}
                  onMove={(dir) =>
                    run(() =>
                      api(`/api/admin/services/${id}/images/${img.id}/move`, { json: { dir } }),
                    )
                  }
                />
                <button
                  type="button"
                  className="admin-text-btn"
                  onClick={() =>
                    run(
                      () =>
                        api(`/api/admin/services/${id}/images/${img.id}/cover`, { method: "POST" }),
                      "Main photo updated.",
                    )
                  }
                >
                  <Star size={14} /> Use as main photo
                </button>
                <button
                  type="button"
                  className="admin-icon-btn"
                  aria-label="Delete photo"
                  onClick={() => {
                    if (window.confirm("Remove this photo from the gallery?")) {
                      run(() =>
                        api(`/api/admin/services/${id}/images/${img.id}`, { method: "DELETE" }),
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
