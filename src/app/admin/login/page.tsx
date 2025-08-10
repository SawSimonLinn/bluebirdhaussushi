"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) window.location.href = "/admin";
    else alert("Invalid password");
  }

  return (
    <div className="max-w-sm mx-auto mt-24">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          className="border rounded px-3 py-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-primary text-white px-4 py-2 rounded w-full">
          Sign in
        </button>
      </form>
    </div>
  );
}
