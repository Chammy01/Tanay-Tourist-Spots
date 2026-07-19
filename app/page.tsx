import Image from "next/image";
import Link from "next/link";
import { Compass, Hotel, Mountain, TentTree } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { DestinationGrid } from "@/components/destinations/destination-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getHomePageData } from "@/lib/data/services/destination-service";

export default async function HomePage() {
  const { content, featured, counts } = await getHomePageData();

  return (
    <>
      <PageHero eyebrow="Fresh Redesign" title={content.tagline} description={content.about} />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><CardContent className="flex items-center gap-3"><Compass className="h-5 w-5 text-sky-600" /><p>{counts.total} total spots</p></CardContent></Card>
          <Card><CardContent className="flex items-center gap-3"><Mountain className="h-5 w-5 text-sky-600" /><p>{counts.mountains} mountain & hill spots</p></CardContent></Card>
          <Card><CardContent className="flex items-center gap-3"><TentTree className="h-5 w-5 text-sky-600" /><p>{counts.camping} camping destinations</p></CardContent></Card>
          <Card><CardContent className="flex items-center gap-3"><Hotel className="h-5 w-5 text-sky-600" /><p>{counts.lodging} lodging options</p></CardContent></Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Featured destinations</h2>
          <div className="flex gap-2">
            <Button asChild variant="secondary"><Link href="/sightseeing">Explore sightseeing</Link></Button>
            <Button asChild variant="outline"><Link href="/lodging">Find lodging</Link></Button>
          </div>
        </div>
        <DestinationGrid destinations={featured} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="relative h-72 overflow-hidden rounded-2xl">
          <Image src="/images/tanaybanner.png" alt="Tanay banner" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 p-8 text-white">
            <h3 className="text-2xl font-semibold">Plan your next Tanay escape</h3>
            <p className="max-w-xl text-sm text-white/90">Browse mountain adventures, cafe stops, and resort stays in one modern destination directory.</p>
            <Button asChild><Link href="/contact">Get in touch</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
