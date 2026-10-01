import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

export const Route = createFileRoute("/admin/_dash/services/")({
  head: () => adminHead("Services"),
  component: Services,
});

type ServiceList = {
  items: { id: number; slug: string; title: string; short: string; photos: number; image: Thumb }[];
};

function Services() {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const { data } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: () => api<ServiceList>("/api/admin/services"),
  });

  const move = async (id: number, dir: -1 | 1) => {
    setError("");
    try {
      await api(`/api/admin/services/${id}/move`, { json: { dir } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not move the service.");
    }
    await queryClient.invalidateQueries({ queryKey: ["admin"] });
  };

  return (
    <AdminPage
      title="Services"
      description="Text and photos for each service page. The order here is the order in the menu, the footer and the home page."
    >
      <Notice message={error} tone="error" />
      <AdminCard>
        <ul className="admin-list">
          {data?.items.map((s, i) => (
            <li key={s.id}>
              <MoveButtons
                label={s.title}
                first={i === 0}
                last={i === data.items.length - 1}
                onMove={(dir) => move(s.id, dir)}
              />
              <Thumbnail image={s.image} />
              <div className="admin-list-text">
                <strong>{s.title}</strong>
                <small>
                  {s.short} · {s.photos} gallery {s.photos === 1 ? "photo" : "photos"}
                </small>
              </div>
              <a
                href={`/services/${s.slug}`}
                target="_blank"
                rel="noopener"
                className="admin-link admin-hide-sm"
              >
                View
              </a>
              <Link to="/admin/services/$id" params={{ id: String(s.id) }} className="admin-link">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </AdminCard>
    </AdminPage>
  );
}
