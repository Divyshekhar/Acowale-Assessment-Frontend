"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-auth";

export function ProtectedDashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (isError) {
      router.replace("/login");
    }
  }, [isError, router]);

  if (isLoading || !user) {
    return (
      <main className="grid min-h-screen place-items-center">
        <div className="flex items-center gap-3 text-sm font-semibold text-neutral-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading dashboard
        </div>
      </main>
    );
  }

  return children;
}
