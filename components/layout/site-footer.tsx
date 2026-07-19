import Link from "next/link";
import { MapPin, Phone, Shield } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">Tanay Tourist Spots</h3>
          <p className="mt-3 text-sm text-zinc-600">Freshly redesigned travel directory for Tanay&apos;s top destinations.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li><Link href="/sightseeing">Sightseeing</Link></li>
            <li><Link href="/lodging">Lodging</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">Quick info</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-600" /> Tanay, Rizal</li>
            <li className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-sky-600" /> +63 998-988-1590</li>
            <li className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-sky-600" /> Emergency numbers on Contact page</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">© {new Date().getFullYear()} Tanay Travel. All rights reserved.</div>
    </footer>
  );
}
