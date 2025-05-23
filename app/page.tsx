"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto max-w-7xl py-10 px-6 lg:px-10">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            🚍 Transport éco-responsable & moderne
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Location d&apos;autocars
            <span className="text-primary block bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent">
              pour tous vos déplacements
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une solution moderne et éco-responsable pour organiser vos
            déplacements de groupe. Demandez un devis personnalisé en quelques
            clics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/quote">
              <Button
                size="lg"
                className="min-w-48 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🌱 Demander un devis
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="min-w-48 border-primary/30 hover:bg-primary/5"
              >
                ⚡ Accéder à mon espace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Nos services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos solutions de transport adaptées à tous vos besoins.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                  </svg>
                </div>
                <CardTitle>Déplacements scolaires</CardTitle>
                <CardDescription>
                  Transport sécurisé pour vos sorties scolaires, voyages de
                  classe et activités extrascolaires.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <CardTitle>Événements d&apos;entreprise</CardTitle>
                <CardDescription>
                  Solutions pour vos séminaires, team building et déplacements
                  professionnels.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <CardTitle>Tourisme & Excursions</CardTitle>
                <CardDescription>
                  Voyages organisés, excursions touristiques et transport pour
                  vos événements privés.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Nos chiffres parlent
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La confiance de nos clients se mesure en résultats.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">
                  500+
                </CardTitle>
                <CardDescription>Trajets réalisés</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">
                  50+
                </CardTitle>
                <CardDescription>Partenaires de confiance</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">
                  98%
                </CardTitle>
                <CardDescription>Clients satisfaits</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">
                  24h
                </CardTitle>
                <CardDescription>Délai de réponse moyen</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des avantages qui font toute la différence.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <CardTitle>Rapidité</CardTitle>
                <CardDescription>
                  Devis rapides et réponses dans les meilleurs délais.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M3 3v5h5" />
                    <path d="M3 8a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 4" />
                    <path d="M21 21v-5h-5" />
                    <path d="M21 16a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 20" />
                  </svg>
                </div>
                <CardTitle>Flexibilité</CardTitle>
                <CardDescription>
                  Des solutions adaptées à vos besoins spécifiques.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                  </svg>
                </div>
                <CardTitle>Qualité</CardTitle>
                <CardDescription>
                  Véhicules de qualité et chauffeurs expérimentés.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <CardTitle>Tarifs compétitifs</CardTitle>
                <CardDescription>
                  Des prix transparents et adaptés à votre budget.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Comment ça marche ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un processus simple en 4 étapes pour votre réservation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="relative">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <CardTitle>Remplissez le formulaire</CardTitle>
                <CardDescription>
                  Indiquez vos besoins : lieu, date, nombre de passagers...
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <CardTitle>Estimation instantanée</CardTitle>
                <CardDescription>
                  Obtenez une estimation de prix pour planifier votre budget.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <CardTitle>Envoi de la demande</CardTitle>
                <CardDescription>
                  Envoyez votre demande et recevez une confirmation par email.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <CardTitle>Finalisation</CardTitle>
                <CardDescription>
                  Notre équipe vous contacte sous 24h pour finaliser.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Card className="bg-gradient-to-br from-primary via-green-500 to-emerald-600 text-primary-foreground border-0 shadow-2xl">
          <CardContent className="p-12 text-center space-y-6">
            <Badge
              variant="secondary"
              className="mb-4 bg-white/20 text-white border-white/30"
            >
              🚀 Démarrez maintenant
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Prêt à réserver votre autocar ?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Demandez votre devis personnalisé en quelques étapes simples.
              Notre équipe d&apos;experts éco-responsables est à votre
              disposition pour vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button
                  size="lg"
                  variant="secondary"
                  className="min-w-48 bg-white text-primary hover:bg-white/90 shadow-lg"
                >
                  🌱 Demander un devis maintenant
                </Button>
              </Link>
              <Link href="/partners">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-48 bg-primary border-white/50 text-white hover:bg-white/10 hover:border-white"
                >
                  🤝 Découvrir nos partenaires
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
