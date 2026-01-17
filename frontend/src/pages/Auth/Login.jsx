import { useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back");
      navigate("/");
    } catch {
      toast.error("Invalid credentials");
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
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
           MemoDeck
          </h2>
          <p className="text-sm text-base-content/60">
             Login to your existing account
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
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

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="••••••••"
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

        {/* Button */}
        <button
          type="submit"
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
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}
