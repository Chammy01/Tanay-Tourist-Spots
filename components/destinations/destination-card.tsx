import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Destination } from "@/lib/data/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categoryLabels: Record<Destination["category"], string> = {
  "cafe-resto": "Cafe & Resto",
  "mountain-hill": "Mountain & Hills",
  camping: "Camping",
  lodging: "Lodging",
};

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-52 w-full">
        <Image src={destination.heroImage} alt={destination.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <Badge variant="outline" className="mb-2 w-fit">{categoryLabels[destination.category]}</Badge>
        <CardTitle>{destination.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 text-sm text-zinc-600">
        <p>{destination.shortDescription}</p>
        <p className="mt-3 inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-sky-600" /> {destination.location}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/destinations/${destination.slug}`}>View destination</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
