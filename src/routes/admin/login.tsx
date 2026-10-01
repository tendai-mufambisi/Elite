import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/components/admin/api";
import { adminHead } from "@/components/admin/head";
import { getAdminSession } from "@/data/admin-session";
import { getImage } from "@/data/images";

export const Route = createFileRoute("/admin/login")({
  beforeLoad: async () => {
    if ((await getAdminSession()).signedIn) throw redirect({ to: "/admin" });
  },
  head: () => adminHead("Sign in"),
  component: Login,
});

function Login() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const logo = getImage("logo-main");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      await api("/api/auth/login", {
        json: { password: form.get("password"), remember: form.get("remember") === "on" },
      });
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <img src={logo.src} alt="Elite Gutters" width={logo.width} height={logo.height} />
        <p className="admin-login-label">Owner area</p>
        <h1>Sign in</h1>
        <p>Enter your password to manage the photos and details on your website.</p>
        <label className="admin-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="admin-input"
          autoComplete="current-password"
          autoFocus
          required
        />
        <label className="admin-check">
          <input type="checkbox" name="remember" defaultChecked /> Keep me signed in for 30 days
        </label>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" variant="brand" size="large" className="w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
