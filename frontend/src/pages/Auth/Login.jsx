import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { login, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      return;
    }

    setSubmitting(true);
    try {
      await login(form);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-base-100
          border-2 border-primary
          shadow-[6px_6px_0_0_theme(colors.primary)]
          p-8
          space-y-6
        "
      >
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            MemoDeck
          </h2>
          <p className="text-sm text-base-content/60">
            Login to your existing account
          </p>
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
            mt-4
            py-3
            font-bold
            border-2 border-primary
            bg-primary
            text-primary-content
            shadow-[4px_4px_0_0_theme(colors.primary)]
            hover:shadow-[6px_6px_0_0_theme(colors.primary)]
            transition-all
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
        
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="underline text-primary">
            Create new account
          </a>
        </p>
      </form>
    </div>
  );
}
