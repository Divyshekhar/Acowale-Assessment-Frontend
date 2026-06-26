import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { FeedbackForm } from "@/components/feedback/feedback-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700 text-white">
              <MessageSquareText className="h-5 w-5" />
            </span>
            Acowale Feedback
          </div>
          <Link className="text-sm font-semibold text-teal-800 hover:text-teal-950" href="/login">
            Admin login
          </Link>
        </div>
      </section>

      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Customer feedback</p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-neutral-950 sm:text-5xl">
            Help Acowale build sharper products and faster support.
          </h1>
          <p className="max-w-lg text-lg leading-8 text-neutral-600">
            Share product ideas, report issues, or tell the team where the experience can improve.
          </p>
          <div className="grid max-w-lg grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-[var(--border)] bg-white p-4">
              <strong className="block text-neutral-950">Fast</strong>
              Routed instantly
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-white p-4">
              <strong className="block text-neutral-950">Simple</strong>
              No account needed
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-white p-4">
              <strong className="block text-neutral-950">Optional</strong>
              Email only if useful
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Submit feedback</h2>
            <p className="mt-2 text-sm text-neutral-600">Choose a category and add the details the team should know.</p>
          </div>
          <FeedbackForm />
        </div>
      </section>
    </main>
  );
}
