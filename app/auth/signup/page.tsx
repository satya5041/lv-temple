"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    agreedToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setError("Please agree to the Terms of Service to continue.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Signup failed");
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create account."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16"
        style={{ background: "linear-gradient(135deg, #fdfcf8 0%, #f5f0e8 50%, #fdfcf8 100%)" }}
      >
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">
              Account Created!
            </h2>
            <p className="text-stone-500 mb-2">
              Welcome to the LV Temple community!
            </p>
            <p className="text-stone-500 text-sm mb-6">
              We sent a confirmation email to{" "}
              <strong>{formData.email}</strong>. Please verify your email to
              activate your account.
            </p>
            <Link href="/auth/login">
              <Button className="w-full" size="lg">
                Sign In Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{
        background:
          "linear-gradient(135deg, #fdfcf8 0%, #f5f0e8 50%, #fdfcf8 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-block">
              <div className="text-4xl mb-2" style={{ color: "#8b1a1a" }}>
                ॐ
              </div>
              <div className="font-bold text-xl text-stone-900">LV Temple</div>
              <div className="text-stone-500 text-sm">Redmond, WA</div>
            </div>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-stone-900 mb-1 text-center">
              Create Account
            </h1>
            <p className="text-stone-500 text-sm text-center mb-6">
              Join our temple community — it&apos;s free
            </p>

            {/* Google Sign Up */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-stone-200 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors mb-5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-stone-400 text-xs">or sign up with email</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    First Name *
                  </label>
                  <Input
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((f) => ({
                        ...f,
                        firstName: e.target.value,
                      }))
                    }
                    placeholder="Priya"
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Last Name *
                  </label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((f) => ({
                        ...f,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Sharma"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email Address *
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Password *
                </label>
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Phone Number{" "}
                  <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+1 (425) 555-0123"
                  autoComplete="tel"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreedToTerms}
                  onChange={(e) =>
                    setFormData((f) => ({
                      ...f,
                      agreedToTerms: e.target.checked,
                    }))
                  }
                  className="mt-1 rounded border-stone-300"
                  style={{ accentColor: "#8b1a1a" }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-stone-600 cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#8b1a1a] underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#8b1a1a] underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-stone-500 mt-5">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-[#8b1a1a] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-700">
            ← Back to Temple Home
          </Link>
        </div>
      </div>
    </main>
  );
}
