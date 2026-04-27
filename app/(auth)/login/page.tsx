import { redirect } from "next/navigation";

// Login is now at the root route "/"
export default function LoginRedirect() {
  redirect("/");
}
