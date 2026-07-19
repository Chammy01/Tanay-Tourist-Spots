import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-zinc-600">The page you are looking for does not exist in the redesigned app.</p>
      <Button asChild className="mt-6"><Link href="/">Back to home</Link></Button>
    </section>
  );
}
