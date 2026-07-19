export type DestinationCategory = "cafe-resto" | "mountain-hill" | "camping" | "lodging";

export interface DestinationSection {
  title: string;
  body: string;
}

export interface Destination {
  slug: string;
  name: string;
  category: DestinationCategory;
  shortDescription: string;
  location: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  sections?: DestinationSection[];
  costs?: string[];
  mapEmbedUrl?: string;
  sourcePage?: string;
  featured?: boolean;
}

export interface EmergencyContact {
  label: string;
  numbers: string[];
}

export interface SiteContent {
  tagline: string;
  about: string;
  emergencyContacts: EmergencyContact[];
}
