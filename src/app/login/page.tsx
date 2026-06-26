import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-10">
      <section className="w-full max-w-md rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <Link href="/" className="mb-8 flex items-center gap-3 font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700 text-white">
            <MessageSquareText className="h-5 w-5" />
          </span>
          Acowale Feedback
        </Link>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Admin login</h1>
          <p className="mt-2 text-sm text-neutral-600">Use your admin credentials to manage feedback.</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
