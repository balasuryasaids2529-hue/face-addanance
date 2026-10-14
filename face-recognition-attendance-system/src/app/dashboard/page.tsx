import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default async function DashboardPage() {
  // For now, just redirect to admin dashboard
  // We'll handle role-based routing in the middleware
  redirect("/admin/dashboard");
}
