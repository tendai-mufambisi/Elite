import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  FolderKanban,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Play,
  Settings,
  Upload,
  Wrench,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { getImage } from "@/data/images";
import { api, imageForm } from "./api";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/photos", label: "Page photos", icon: ImageIcon },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const logo = getImage("logo-main");
  const signOut = async () => {
    await api("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    window.location.href = "/admin/login";
  };
  return (
    <div className="admin">
      <aside className="admin-side">
        <Link to="/admin" className="admin-brand">
          <img src={logo.src} alt="" width={logo.width} height={logo.height} />
          <span>
            <strong>Elite Gutters</strong>
            <small>Owner dashboard</small>
          </span>
        </Link>
        <nav className="admin-nav" aria-label="Dashboard">
          {links.map(({ to, label, icon: Icon, ...rest }) => {
            const active =
              "exact" in rest ? pathname === to || pathname === `${to}/` : pathname.startsWith(to);
            return (
              <Link key={to} to={to} className={active ? "is-active" : undefined}>
                <Icon size={17} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-side-foot">
          <a href="/" target="_blank" rel="noopener">
            <ExternalLink size={16} aria-hidden="true" /> View website
          </a>
          <button type="button" onClick={signOut}>
            <LogOut size={16} aria-hidden="true" /> Sign out
          </button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

export function AdminPage({
  title,
  description,
  actions,
  back,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  back?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <header className="admin-head">
        <div>
          {back}
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {actions && <div className="admin-head-actions">{actions}</div>}
      </header>
      <div className="admin-body">{children}</div>
    </>
  );
}

export function AdminCard({
  title,
  description,
  actions,
  children,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="admin-card">
      {(title || actions) && (
        <div className="admin-card-head">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export type Thumb = { src: string; alt: string; video: boolean } | null;

export function Thumbnail({ image, className = "" }: { image: Thumb; className?: string }) {
  if (!image?.src)
    return <span className={`admin-thumb admin-thumb-empty ${className}`}>No photo</span>;
  return (
    <span className={`admin-thumb ${className}`}>
      <img src={image.src} alt={image.alt} loading="lazy" />
      {image.video && (
        <span className="admin-thumb-video">
          <Play size={12} fill="currentColor" aria-hidden="true" /> Video
        </span>
      )}
    </span>
  );
}

export function MoveButtons({
  onMove,
  first,
  last,
  label,
}: {
  onMove: (dir: -1 | 1) => void;
  first: boolean;
  last: boolean;
  label: string;
}) {
  return (
    <span className="admin-move">
      <button
        type="button"
        onClick={() => onMove(-1)}
        disabled={first}
        aria-label={`Move ${label} up`}
      >
        <ArrowUp size={15} />
      </button>
      <button
        type="button"
        onClick={() => onMove(1)}
        disabled={last}
        aria-label={`Move ${label} down`}
      >
        <ArrowDown size={15} />
      </button>
    </span>
  );
}

/** Picks one or more photos, shrinks them in the browser and uploads them one by one. */
export function PhotoUpload({
  endpoint,
  multiple = false,
  label = multiple ? "Add photos" : "Upload photo",
  extra,
  onDone,
}: {
  endpoint: string;
  multiple?: boolean;
  label?: string;
  extra?: () => Record<string, string>;
  onDone: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setError("");
    const list = [...files];
    try {
      for (const [i, file] of list.entries()) {
        setStatus(list.length > 1 ? `Uploading ${i + 1} of ${list.length}…` : "Uploading…");
        await api(endpoint, { form: await imageForm(file, extra?.() ?? {}) });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    } finally {
      setStatus("");
      if (input.current) input.current.value = "";
      onDone();
    }
  };
  return (
    <div className="admin-upload">
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        hidden
        onChange={(e) => upload(e.target.files)}
      />
      <Button
        type="button"
        variant="brand"
        disabled={Boolean(status)}
        onClick={() => input.current?.click()}
      >
        <Upload /> {status || label}
      </Button>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Notice({ message, tone = "ok" }: { message: string; tone?: "ok" | "error" }) {
  if (!message) return null;
  return (
    <p
      className={tone === "error" ? "admin-error" : "admin-ok"}
      role={tone === "error" ? "alert" : "status"}
    >
      {message}
    </p>
  );
}
