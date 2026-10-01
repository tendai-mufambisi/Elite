import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileText,
  FolderKanban,
  Image as ImageIcon,
  Plus,
  Settings,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/components/admin/api";
import { adminHead } from "@/components/admin/head";
import { AdminCard, AdminPage, Thumbnail, type Thumb } from "@/components/admin/shell";

export const Route = createFileRoute("/admin/_dash/")({
  head: () => adminHead("Dashboard"),
  component: Dashboard,
});

type Overview = {
  projects: number;
  services: number;
  photos: number;
  companyProfile: boolean;
  recent: { id: number; title: string; category: string; image: Thumb }[];
};

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => api<Overview>("/api/admin/overview"),
  });

  const tiles = [
    { to: "/admin/projects", label: "Projects", value: data?.projects, icon: FolderKanban },
    { to: "/admin/services", label: "Services", value: data?.services, icon: Wrench },
    { to: "/admin/photos", label: "Page photos", value: data?.photos, icon: ImageIcon },
  ] as const;

  return (
    <AdminPage
      title="Dashboard"
      description="Everything the public site shows is managed from here. Changes go live the moment you save — no redeploy."
      actions={
        <Button asChild variant="brand">
          <Link to="/admin/projects" search={{ add: true }}>
            <Plus /> Add a project
          </Link>
        </Button>
      }
    >
      <div className="admin-tiles">
        {tiles.map(({ to, label, value, icon: Icon }) => (
          <Link key={to} to={to} className="admin-tile">
            <Icon size={20} aria-hidden="true" />
            <strong>{value ?? "–"}</strong>
            <span>{label}</span>
          </Link>
        ))}
        <Link to="/admin/settings" className="admin-tile">
          <FileText size={20} aria-hidden="true" />
          <strong>{data ? (data.companyProfile ? "Published" : "Not set") : "–"}</strong>
          <span>Company profile</span>
        </Link>
      </div>

      <div className="admin-two">
        <AdminCard
          title="Recent projects"
          actions={
            <Link to="/admin/projects" className="admin-link">
              All projects <ArrowUpRight size={15} />
            </Link>
          }
        >
          {data && data.recent.length === 0 && (
            <p className="admin-empty">No projects yet. Add the first one.</p>
          )}
          <ul className="admin-list">
            {data?.recent.map((p) => (
              <li key={p.id}>
                <Thumbnail image={p.image} />
                <div className="admin-list-text">
                  <strong>{p.title}</strong>
                  <small>{p.category}</small>
                </div>
                <Link to="/admin/projects/$id" params={{ id: String(p.id) }} className="admin-link">
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard title="Quick actions">
          <div className="admin-actions">
            <Link to="/admin/projects" search={{ add: true }}>
              <Plus size={18} /> Add project photos
            </Link>
            <Link to="/admin/photos">
              <ImageIcon size={18} /> Change a page photo
            </Link>
            <Link to="/admin/services">
              <Wrench size={18} /> Edit a service
            </Link>
            <Link to="/admin/settings">
              <Settings size={18} /> Update contact details
            </Link>
          </div>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
