"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Location d&apos;autocars pour tous vos déplacements
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Une solution simple et efficace pour organiser vos
                  déplacements de groupe. Demandez un devis personnalisé en
                  quelques clics.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/quote">
                  <Button size="lg" className="gap-1">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="gap-1">
                    Accéder à mon espace
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/images/bus.jpg"
                  alt="Autocar moderne"
                  className="w-full object-cover"
                  style={{ height: "350px" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Nos services
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez nos solutions de transport adaptées à tous vos
                besoins.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-blue-500"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Déplacements scolaires</h3>
              <p className="text-center text-gray-500">
                Transport sécurisé pour vos sorties scolaires, voyages de classe
                et activités extrascolaires.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-blue-500"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">
                Événements d&apos;entreprise
              </h3>
              <p className="text-center text-gray-500">
                Solutions pour vos séminaires, team building et déplacements
                professionnels.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-blue-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Tourisme & Excursions</h3>
              <p className="text-center text-gray-500">
                Voyages organisés, excursions touristiques et transport pour vos
                événements privés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pourquoi nous choisir ?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Des avantages qui font la différence.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Rapidité</h3>
              <p className="text-center text-sm text-gray-500">
                Devis rapides et réponses dans les meilleurs délais.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Flexibilité</h3>
              <p className="text-center text-sm text-gray-500">
                Des solutions adaptées à vos besoins spécifiques.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19-1.14-.93-2-2.31-2.29-3.76 0 0-1.96 5.04-4.85 6.32-.71.32-1.15.86-1.15 1.55 0 1.8 2.25 3.13 6 3.13Z" />
                  <path d="M15.7 18.9a3 3 0 0 0-1.04-4.12 2.9 2.9 0 0 0-3.35.61c-.86.86-2.13 1.11-3.24.59 0 0 3.14 3.64 2.4 6.06-.2.58-.15 1.2.18 1.71a2.2 2.2 0 0 0 3.04.36c1.47-1.29 2.15-3.21 2-5.22Z" />
                  <path d="M19.5 9.5c-1.5 0-2.7-.82-2.93-2A4.5 4.5 0 0 0 19.13 4c.4-.6.4-1.5-.3-2a.6.6 0 0 0-.53-.16 3 3 0 0 0-2.3 1.86 5.2 5.2 0 0 0-.39 3.18c.2.64.46 1.22.52 1.87.13 1.4-.47 2.76-1.2 4 1.88.15 3.4-1.17 3.9-3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Qualité</h3>
              <p className="text-center text-sm text-gray-500">
                Véhicules de qualité et chauffeurs expérimentés.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="M5 7 3 5" />
                  <path d="M9 6V3" />
                  <path d="m13 7 2-2" />
                  <circle cx="9" cy="13" r="3" />
                  <path d="M16.8 16.8c-1 1-2.3 1.2-3.4.6-.8-.5-1.8-.5-2.6 0-1.1.6-2.4.4-3.4-.6-1-1-1.2-2.3-.6-3.4.5-.8.5-1.8 0-2.6-.6-1.1-.4-2.4.6-3.4s2.3-1.2 3.4-.6c.8.5 1.8.5 2.6 0 1.1-.6 2.4-.4 3.4.6 1 1 1.2 2.3.6 3.4-.5.8-.5 1.8 0 2.6.6 1.1.4 2.4-.6 3.4Z" />
                  <path d="M19 7 5 21" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Tarifs compétitifs</h3>
              <p className="text-center text-sm text-gray-500">
                Des prix transparents et adaptés à votre budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Prêt à réserver votre autocar ?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Demandez votre devis personnalisé en quelques étapes simples.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/quote">
                <Button className="w-full" size="lg">
                  Demander un devis maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
