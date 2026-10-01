import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { api } from "@/components/admin/api";
import { adminHead } from "@/components/admin/head";
import {
  AdminCard,
  AdminPage,
  Notice,
  PhotoUpload,
  Thumbnail,
  type Thumb,
} from "@/components/admin/shell";

export const Route = createFileRoute("/admin/_dash/photos")({
  head: () => adminHead("Page photos"),
  component: PagePhotos,
});

type Spot = { key: string; label: string; group: string; image: Thumb; custom: boolean };

function PagePhotos() {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const { data } = useQuery({
    queryKey: ["admin", "photos"],
    queryFn: () => api<{ items: Spot[] }>("/api/admin/photos"),
  });
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin"] });
  const groups = [...new Set(data?.items.map((s) => s.group))];

  const reset = async (spot: Spot) => {
    if (!window.confirm(`Put the original photo back for "${spot.label}"?`)) return;
    setError("");
    try {
      await api(`/api/admin/photos/${spot.key}`, { method: "DELETE" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reset the photo.");
    }
    await refresh();
  };

  return (
    <AdminPage
      title="Page photos"
      description="The fixed photos around the site: banners, home page sections and the founder. Replace any of them with your own."
    >
      <Notice message={error} tone="error" />
      {groups.map((group) => (
        <AdminCard key={group} title={group}>
          <ul className="admin-gallery">
            {data?.items
              .filter((s) => s.group === group)
              .map((spot) => (
                <li key={spot.key}>
                  <Thumbnail image={spot.image} className="admin-thumb-large" />
                  <strong className="admin-gallery-title">{spot.label}</strong>
                  <div className="admin-gallery-actions">
                    <PhotoUpload
                      endpoint={`/api/admin/photos/${spot.key}`}
                      label="Replace"
                      onDone={refresh}
                    />
                    {spot.custom && (
                      <button type="button" className="admin-text-btn" onClick={() => reset(spot)}>
                        <RotateCcw size={14} /> Use original
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </AdminCard>
      ))}
    </AdminPage>
  );
}
