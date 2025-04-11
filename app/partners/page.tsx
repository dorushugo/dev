"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Partner } from "@/lib/data";
import { usePartner } from "@/lib/partner-context";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PartnersPage() {
  const { partners } = usePartner();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);

  // Filtrer les partenaires selon le terme de recherche
  useEffect(() => {
    if (!partners || !Array.isArray(partners) || partners.length === 0) {
      setFilteredPartners([]);
      return;
    }

    const filtered = partners.filter((partner) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        partner.name?.toLowerCase().includes(searchLower) ||
        partner.location?.toLowerCase().includes(searchLower) ||
        partner.vehicleTypes?.some((type) =>
          type.toLowerCase().includes(searchLower)
        ) ||
        partner.vehicles?.some((vehicle) =>
          vehicle.type.toLowerCase().includes(searchLower)
        ) ||
        (partner.area &&
          partner.area.some((area) => area.toLowerCase().includes(searchLower)))
      );
    });

    // Trier les partenaires par nom
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredPartners(filtered);
  }, [partners, searchTerm]);

  return (
    <div className="py-10 px-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Nos partenaires transporteurs
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Découvrez notre réseau de transporteurs partenaires qui nous
          permettent de vous offrir un service de qualité sur l&apos;ensemble du
          territoire. Tous nos partenaires sont sélectionnés pour leur
          professionnalisme et la qualité de leur flotte.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <Input
          placeholder="Rechercher par nom, lieu ou type de véhicule..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {filteredPartners && filteredPartners.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">Aucun partenaire trouvé</h3>
          <p className="text-muted-foreground mt-1">
            Essayez de modifier votre recherche.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners &&
            filteredPartners.map((partner) => (
              <Card key={partner.id} className="flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">{partner.name}</h3>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {partner.collaborations} trajets
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {partner.location && (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {partner.location}
                      </p>
                    )}
                    <p className="text-muted-foreground flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {partner.yearFounded
                        ? `Partenaire depuis ${partner.yearFounded}`
                        : `Partenaire récent`}
                    </p>
                    {partner.area && partner.area.length > 0 && (
                      <p className="text-muted-foreground flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 mt-1"
                        >
                          <rect
                            x="2"
                            y="7"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        <span>Opère dans : {partner.area.join(", ")}</span>
                      </p>
                    )}
                  </div>
                  {partner.vehicleTypes && partner.vehicleTypes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Types de véhicules</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.vehicleTypes.map((type) => (
                          <span
                            key={type}
                            className="bg-muted text-sm px-2 py-1 rounded-md"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Affichage alternatif avec le tableau vehicles */}
                  {partner.vehicles && partner.vehicles.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Flotte de véhicules</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.vehicles.map((vehicle, idx) => (
                          <span
                            key={idx}
                            className="bg-muted text-sm px-2 py-1 rounded-md"
                          >
                            {vehicle.count}x {vehicle.type} ({vehicle.capacity}{" "}
                            places)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-auto pt-4">
                    <Link href="/quote">
                      <Button className="w-full">Demander un devis</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      <div className="mt-16 bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Devenir partenaire transporteur
        </h2>
        <p className="mb-6 max-w-3xl">
          Vous êtes une entreprise de transport et vous souhaitez rejoindre
          notre réseau de partenaires ? Contactez-nous pour en savoir plus sur
          notre programme de partenariat et les avantages que nous pouvons vous
          offrir.
        </p>
        <Link href="/contact">
          <Button>Contactez-nous</Button>
        </Link>
      </div>
    </div>
  );
}
