import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-zinc-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">{description}</p>
      </div>
    </section>
  );
}
