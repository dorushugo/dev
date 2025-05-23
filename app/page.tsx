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
import Image from "next/image";

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

        {/* Hero Image Section */}
        <div className="mt-16 space-y-8">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 to-green-50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20"></div>
            <div className="relative h-96 md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Autocar moderne blanc sur route"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Autocar Premium
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Confort optimal • WiFi • Climatisation • Sièges
                      ergonomiques
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transport Types Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-64 relative">
                <Image
                  src="https://media.istockphoto.com/id/1395748040/fr/photo/un-jeune-gar%C3%A7on-monte-dans-un-autobus-scolaire-au-soleil.jpg?s=612x612&w=0&k=20&c=eElbaxY_5dOz8lcM78nVSs1RVr15MW2_tKfTGCN7Vvc="
                  alt="Autocar scolaire jaune"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-blue-500/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Voyages Scolaires</h3>
                    <p className="text-sm mt-2 opacity-90">
                      Transport sécurisé pour vos sorties éducatives
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <p className="text-sm">
                    Découvrez nos solutions dédiées aux établissements scolaires
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-64 relative">
                <Image
                  src="https://lemagdelaconso.ouest-france.fr/images/dossiers/2024-06/car-vacances-160818.jpg"
                  alt="Autocar moderne pour entreprises"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-green-500/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">
                      Événements d&apos;Entreprise
                    </h3>
                    <p className="text-sm mt-2 opacity-90">
                      Séminaires et déplacements professionnels
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <p className="text-sm">
                    Solutions sur mesure pour vos besoins professionnels
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-64 relative">
                <Image
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Autocar de tourisme"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-purple-500/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">
                      Tourisme & Excursions
                    </h3>
                    <p className="text-sm mt-2 opacity-90">
                      Découvrez de nouveaux horizons en groupe
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <p className="text-sm">
                    Voyages mémorables et excursions exceptionnelles
                  </p>
                </div>
              </div>
            </div>
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

          {/* Autocar Showcase */}
          <div className="mt-12 mb-16">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
              <div className="relative px-8 py-16 md:px-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 text-white">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-sm font-medium">
                        🚍 Flotte moderne
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                      Voyagez dans le confort
                      <span className="block text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
                        et la sécurité
                      </span>
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Nos autocars modernes sont équipés de toutes les
                      commodités pour rendre vos trajets agréables :
                      climatisation, WiFi gratuit, prises USB et sièges
                      ergonomiques.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">WiFi gratuit</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Climatisation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Prises USB</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Sièges confort</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                      <div className="aspect-video rounded-xl overflow-hidden relative">
                        <Image
                          src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                          alt="Autocar Premium 55 places - Intérieur luxueux"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm bg-white/20">
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3"
                                />
                              </svg>
                            </div>
                            <h4 className="text-xl font-bold mb-2">
                              Autocar Premium 55 places
                            </h4>
                            <p className="text-sm opacity-90">
                              Confort maximal pour vos longs trajets
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card className="transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-2 group-hover:bg-blue-200 transition-colors">
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
                    className="h-6 w-6 text-blue-600"
                  >
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Déplacements scolaires
                </CardTitle>
                <CardDescription>
                  Transport sécurisé pour vos sorties scolaires, voyages de
                  classe et activités extrascolaires.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 mb-2 group-hover:bg-green-200 transition-colors">
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
                    className="h-6 w-6 text-green-600"
                  >
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <CardTitle className="group-hover:text-green-600 transition-colors">
                  Événements d&apos;entreprise
                </CardTitle>
                <CardDescription>
                  Solutions pour vos séminaires, team building et déplacements
                  professionnels.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 mb-2 group-hover:bg-purple-200 transition-colors">
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
                    className="h-6 w-6 text-purple-600"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors">
                  Tourisme & Excursions
                </CardTitle>
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
            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  Rapidité
                </CardTitle>
                <CardDescription>
                  Devis rapides et réponses dans les meilleurs délais.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  Flexibilité
                </CardTitle>
                <CardDescription>
                  Des solutions adaptées à vos besoins spécifiques.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  Qualité
                </CardTitle>
                <CardDescription>
                  Véhicules de qualité et chauffeurs expérimentés.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  Tarifs compétitifs
                </CardTitle>
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
