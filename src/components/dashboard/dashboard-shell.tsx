"use client";

import { BarChart3, LayoutDashboard, LogOut, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-[var(--background)] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-[var(--border)] bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center gap-3 px-6 font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700 text-white">
            <MessageSquareText className="h-5 w-5" />
          </span>
          Acowale
        </div>
        <nav className="flex gap-2 px-4 pb-4 lg:block lg:space-y-1">
          <a className="flex items-center gap-3 rounded-md bg-neutral-100 px-3 py-2 text-sm font-semibold" href="#overview">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </a>
          <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100" href="#analytics">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </a>
        </nav>
      </aside>

      <div>
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[var(--border)] bg-white px-6">
          <div>
            <p className="text-xs font-semibold uppercase text-neutral-500">Admin</p>
            <h1 className="text-lg font-bold">{user?.name ?? "Dashboard"}</h1>
          </div>
          <Button variant="secondary" size="sm" onClick={() => logout.mutate()} disabled={logout.isPending}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
