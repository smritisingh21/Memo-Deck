import { useState } from "react";
import axiosInstance from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/signup", form);
      console.log("Signup route hit");

      localStorage.setItem("token", res.data.token);
      navigate("/");
      toast.success("Welcome to MemoDeck");
    } catch {
      toast.error("Signup failed.Try again.");
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
        {/* Header */}
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-base-content/60">
            Start organizing your notes
          </p>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Name</label>
          <input
            className="
              input input-bordered
              border-2 border-base-content
              focus:border-primary
              focus:outline-none
            "
            placeholder="Your name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Email</label>
          <input
            className="
              input input-bordered
              border-2 border-base-content
              focus:border-primary
              focus:outline-none
            "
            placeholder="you@example.com"
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
            className="
              input input-bordered
              border-2 border-base-content
              focus:border-primary
              focus:outline-none
            "
            placeholder="••••••••"
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
          "
        >
          Create Account
        </button>
            <p>Already have an account ? <a href="/login" className="underline"> Login</a></p>

      </form>
    </div>
  );
}
