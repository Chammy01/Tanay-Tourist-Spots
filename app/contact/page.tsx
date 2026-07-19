import { Metadata } from "next";
import { Phone, Shield } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactData } from "@/lib/data/services/destination-service";

export const metadata: Metadata = {
  title: "Contact",
  description: "Emergency numbers and contact form for Tanay travel help.",
};

export default async function ContactPage() {
  const content = await getContactData();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Need help planning your trip?"
        description="Reach out through the client-side contact form and keep emergency numbers handy while visiting Tanay."
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          {content.emergencyContacts.map((contact) => (
            <Card key={contact.label}>
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-base"><Shield className="h-4 w-4 text-sky-600" /> {contact.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-zinc-600">
                {contact.numbers.map((number) => (
                  <p key={number} className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-sky-600" /> {number}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <ContactForm />
      </section>
    </>
  );
}
