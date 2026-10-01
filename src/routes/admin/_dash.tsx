import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/shell";
import { adminHead } from "@/components/admin/head";
import { getAdminSession } from "@/data/admin-session";

// Every dashboard page sits under this layout. The redirect is a convenience; the API
// itself refuses every request without a valid session.
export const Route = createFileRoute("/admin/_dash")({
  beforeLoad: async () => {
    if (!(await getAdminSession()).signedIn) throw redirect({ to: "/admin/login" });
  },
  head: () => adminHead("Owner dashboard"),
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
});
