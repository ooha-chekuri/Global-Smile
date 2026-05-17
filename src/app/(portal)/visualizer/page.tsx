import { redirect } from "next/navigation";

export default function VisualizerRedirect() {
  redirect("/patient/dashboard");
}
