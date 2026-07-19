import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { LightboxGallery } from "@/components/destinations/lightbox-gallery";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllDestinations, getDestinationBySlug } from "@/lib/data/services/destination-service";
import { sanitizeMapEmbedUrl } from "@/lib/data/validation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination not found" };
  }

  return {
    title: destination.name,
    description: destination.shortDescription,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Badge>{destination.category.replace("-", " ")}</Badge>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{destination.name}</h1>
      <p className="mt-2 text-zinc-600">{destination.shortDescription}</p>
      <p className="mt-3 inline-flex items-center gap-1 text-sm text-zinc-500"><MapPin className="h-4 w-4 text-sky-600" /> {destination.location}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="mb-3 text-xl font-semibold">Gallery</h2>
          <LightboxGallery images={destination.gallery} title={destination.name} />
        </div>

        <Card>
          <CardHeader><CardTitle>Highlights</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-600">
              {destination.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {destination.sections?.length ? (
        <div className="mt-8 grid gap-4">
          {destination.sections.map((section) => (
            <Card key={section.title}>
              <CardHeader><CardTitle>{section.title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-zinc-600">{section.body}</CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {destination.costs?.length ? (
        <Card className="mt-8">
          <CardHeader><CardTitle>Estimated costs</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600">
              {destination.costs.map((cost) => (
                <li key={cost}>{cost}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {sanitizeMapEmbedUrl(destination.mapEmbedUrl) ? (
        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200">
          <iframe title={`${destination.name} map`} src={sanitizeMapEmbedUrl(destination.mapEmbedUrl)} width="100%" height="420" loading="lazy" />
        </div>
      ) : null}
    </section>
  );
}
