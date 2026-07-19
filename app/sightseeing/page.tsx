import { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { DestinationGrid } from "@/components/destinations/destination-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllDestinations } from "@/lib/data/services/destination-service";

export const metadata: Metadata = {
  title: "Sightseeing",
  description: "Explore mountains, campsites, and cafe spots in Tanay.",
};

export default async function SightseeingPage() {
  const all = await getAllDestinations();
  const cafes = all.filter((d) => d.category === "cafe-resto");
  const mountains = all.filter((d) => d.category === "mountain-hill");
  const camping = all.filter((d) => d.category === "camping");

  return (
    <>
      <PageHero
        eyebrow="Sightseeing"
        title="Explore Tanay destinations"
        description="Browse cafes, mountains, and camping locations with refreshed cards and faster discovery."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs defaultValue="mountains" className="w-full">
          <TabsList>
            <TabsTrigger value="mountains">Mountains & Hills</TabsTrigger>
            <TabsTrigger value="cafes">Cafe & Resto</TabsTrigger>
            <TabsTrigger value="camping">Camping</TabsTrigger>
          </TabsList>
          <TabsContent value="mountains"><DestinationGrid destinations={mountains} /></TabsContent>
          <TabsContent value="cafes"><DestinationGrid destinations={cafes} /></TabsContent>
          <TabsContent value="camping"><DestinationGrid destinations={camping} /></TabsContent>
        </Tabs>
      </section>
    </>
  );
}
