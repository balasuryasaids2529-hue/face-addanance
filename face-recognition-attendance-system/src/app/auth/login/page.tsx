"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Redirect to home, the layout will handle role-based routing
        router.push("/dashboard");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl" variant="elevated">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Smart Attendance</h1>
          <p className="text-slate-500 mt-1">Sign in to your account</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-slate-600">Remember me</span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              isLoading={isSubmitting || isLoading}
            >
              Sign In
            </Button>
          </CardFooter>
        </form>

        <div className="text-center py-4 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>

      {/* Demo credentials */}
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>Demo Credentials:</p>
        <div className="mt-2 space-y-1">
          <p>
            <span className="font-medium">Admin:</span> admin@university.edu / admin123
          </p>
          <p>
            <span className="font-medium">Lecturer:</span> john.smith@university.edu / lecturer123
          </p>
          <p>
            <span className="font-medium">Student:</span> alice@student.university.edu / student123
          </p>
        </div>
      </div>
    </div>
  );
}
