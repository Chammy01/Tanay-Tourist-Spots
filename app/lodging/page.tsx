import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { DestinationGrid } from "@/components/destinations/destination-grid";
import { getDestinationsByCategory } from "@/lib/data/services/destination-service";

export const metadata: Metadata = {
  title: "Lodging",
  description: "Find resorts, hotels, and camp-style stays in Tanay.",
};

export default async function LodgingPage() {
  const lodging = await getDestinationsByCategory("lodging");

  return (
    <>
      <PageHero
        eyebrow="Lodging"
        title="Stay options in Tanay"
        description="Discover hotels, resorts, and leisure camps for overnight trips and weekend escapes."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <DestinationGrid destinations={lodging} />
      </section>
    </>
  );
}
