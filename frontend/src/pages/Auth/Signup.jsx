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
      const res = await axiosInstance.post("/signup", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Account created");
      navigate("/");
    } catch {
      toast.error("Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="card bg-base-100 p-6 w-96 space-y-4">
        <h2 className="text-xl font-bold">Sign up</h2>

        <input
          className="input input-bordered"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input input-bordered"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="input input-bordered"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-primary w-full">Create account</button>
      </form>
    </div>
  );
}
