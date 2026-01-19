import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { signup, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return;
    }

    setSubmitting(true);
    try {
      await signup(form);
      // Navigation handled by context
    } catch (error) {
      // Error handling done by context
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm sm:max-w-md
          bg-base-100
          border-2 border-primary
          shadow-[6px_6px_0_0_theme(colors.primary)]
          p-6 sm:p-8
          space-y-5
        "
      >
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-base-content/60">
            Start organizing your notes
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            required
            className="
              input input-bordered
              border-2 border-base-content
              focus:border-primary
              focus:outline-none
            "
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            required
            className="
              input input-bordered
              border-2 border-base-content
              focus:border-primary
              focus:outline-none
            "
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            required
            className="
              input input-bordered
              border-2 border-base-content
              focus:border-primary
              focus:outline-none
            "
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="
            w-full
            mt-2
            py-3
            text-sm sm:text-base
            font-bold
            border-2 border-primary
            bg-primary
            text-primary-content
            shadow-[4px_4px_0_0_theme(colors.primary)]
            hover:shadow-[6px_6px_0_0_theme(colors.primary)]
            transition-all
            active:translate-y-[1px]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {submitting ? "Creating Account..." : "Create Account"}
        </button>
        
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline text-primary">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
