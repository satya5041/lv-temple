"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.user?.role !== "admin") {
        throw new Error("Access denied. Admin accounts only.");
      }

      // Full page reload so server layout picks up the new cookie
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1a0505 0%, #3d0a0a 50%, #8b1a1a 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3" style={{ color: "#f0c040" }}>ॐ</div>
          <h1 className="text-2xl font-bold text-white">LV Temple Admin</h1>
          <p className="text-stone-400 text-sm mt-1">Restricted access — authorized staff only</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-stone-900 mb-6 text-center">Admin Sign In</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Admin Email
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  placeholder="admin@lvtemple.org"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In to Admin Panel"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800 font-semibold mb-1">Demo Credentials</p>
              <p className="text-xs text-amber-700">Email: <code className="bg-amber-100 px-1 rounded">admin@lvtemple.org</code></p>
              <p className="text-xs text-amber-700">Password: <code className="bg-amber-100 px-1 rounded">admin123</code></p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-stone-400 hover:text-white text-sm transition-colors">
            ← Back to Temple Website
          </Link>
        </div>
      </div>
    </main>
  );
}
