"use client";

import Link from "next/link";
import { Menu, Mountain, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const links = [
  { href: "/", label: "Home" },
  { href: "/sightseeing", label: "Sightseeing" },
  { href: "/lodging", label: "Lodging" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-900">
          <Mountain className="h-5 w-5 text-sky-600" /> Tanay Tourist Spots
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100",
                pathname === link.href ? "bg-zinc-100 text-zinc-900" : "text-zinc-600",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button variant="outline" size="sm" className="hidden md:inline-flex">
          <Phone className="h-4 w-4" /> Emergency Contacts
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 md:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm p-4">
            <nav className="mt-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    pathname === link.href ? "bg-zinc-100" : "text-zinc-700",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
