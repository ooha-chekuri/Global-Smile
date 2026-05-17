import { redirect } from "next/navigation";

export default function LoginPageAlias() {
  redirect("/auth/signin");
}
