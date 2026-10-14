import { redirect } from "next/navigation";

export default async function HomePage() {
  // Redirect to login
  redirect("/auth/login");
}
