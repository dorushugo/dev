"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { Partner } from "@/lib/data";
import { usePartner } from "@/lib/partner-context";
import { useQuote } from "@/lib/quote-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPartnersPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { partners } = usePartner();
  const { quotes } = useQuote();

  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);

  // Rediriger si l'utilisateur n'est pas authentifié ou n'est pas admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!isAdmin) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  // Filtrer les partenaires
  useEffect(() => {
    let filtered = [...partners];

    // Filtrer par terme de recherche
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (partner) =>
          partner.name.toLowerCase().includes(lowerSearchTerm) ||
          partner.area.some((area) =>
            area.toLowerCase().includes(lowerSearchTerm)
          )
      );
    }

    // Trier par nombre de collaborations (descendant)
    filtered.sort((a, b) => b.collaborations - a.collaborations);

    setFilteredPartners(filtered);
  }, [partners, searchTerm]);

  // Obtenir les devis associés à un partenaire
  const getPartnerQuotes = (partnerId: string) => {
    return quotes.filter((quote) => quote.partnerId === partnerId);
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="py-10 px-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Partenaires</h1>
          <p className="text-muted-foreground">
            Consultez les informations sur vos partenaires.
          </p>
        </div>
        <Link href="/admin/dashboard">
          <Button variant="outline">Retour au tableau de bord</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom ou zone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:max-w-xs"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredPartners.length} partenaire
          {filteredPartners.length !== 1 ? "s" : ""} trouvé
          {filteredPartners.length !== 1 ? "s" : ""}
        </div>
      </div>

      {filteredPartners.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">Aucun partenaire trouvé</h3>
          <p className="text-muted-foreground mt-1">
            Aucun partenaire ne correspond à vos critères de recherche.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner) => {
            const partnerQuotes = getPartnerQuotes(partner.id);
            const pendingQuotes = partnerQuotes.filter(
              (quote) => quote.status === "pending"
            ).length;
            const confirmedQuotes = partnerQuotes.filter(
              (quote) => quote.status === "confirmed"
            ).length;

            return (
              <Card key={partner.id}>
                <CardHeader>
                  <CardTitle>{partner.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="outline" className="font-normal">
                      {partner.collaborations} collaboration
                      {partner.collaborations !== 1 ? "s" : ""}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <span className="font-medium">Contact :</span>
                      <span>{partner.contactEmail}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <span className="font-medium">Téléphone :</span>
                      <span>{partner.phone}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <span className="font-medium">Zones :</span>
                      <span>{partner.area.join(", ")}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <span className="font-medium">Véhicules :</span>
                      <div>
                        {partner.vehicles.map((vehicle, idx) => (
                          <div key={idx}>
                            {vehicle.count} x {vehicle.type} ({vehicle.capacity}{" "}
                            places)
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedPartnerId(partner.id)}
                      >
                        Voir les détails
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{partner.name}</DialogTitle>
                        <DialogDescription>
                          Informations détaillées sur le partenaire
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">
                            Informations de contact
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-[120px_1fr] gap-1">
                              <span className="font-medium">Email :</span>
                              <span>{partner.contactEmail}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-1">
                              <span className="font-medium">Téléphone :</span>
                              <span>{partner.phone}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-1">
                              <span className="font-medium">
                                Collaborations :
                              </span>
                              <span>{partner.collaborations}</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-medium mt-6 mb-3">
                            Zones desservies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {partner.area.map((area, idx) => (
                              <Badge key={idx} variant="secondary">
                                {area}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-lg font-medium mt-6 mb-3">
                            Flotte de véhicules
                          </h3>
                          <div className="space-y-2">
                            {partner.vehicles.map((vehicle, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 bg-muted rounded-md"
                              >
                                <div>
                                  <span className="font-medium">
                                    {vehicle.type}
                                  </span>
                                  <p className="text-sm text-muted-foreground">
                                    {vehicle.capacity} places
                                  </p>
                                </div>
                                <Badge variant="outline">
                                  {vehicle.count} véhicule
                                  {vehicle.count !== 1 ? "s" : ""}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3">
                            Statistiques des prestations
                          </h3>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-muted p-4 rounded-lg">
                              <div className="text-sm text-muted-foreground">
                                En attente
                              </div>
                              <div className="text-2xl font-bold">
                                {pendingQuotes}
                              </div>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                              <div className="text-sm text-muted-foreground">
                                Confirmées
                              </div>
                              <div className="text-2xl font-bold">
                                {confirmedQuotes}
                              </div>
                            </div>
                          </div>

                          <h3 className="text-lg font-medium mb-3">
                            Dernières prestations
                          </h3>
                          {partnerQuotes.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              Aucune prestation pour ce partenaire.
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-2">
                              {partnerQuotes
                                .sort(
                                  (a, b) =>
                                    new Date(b.date).getTime() -
                                    new Date(a.date).getTime()
                                )
                                .slice(0, 5)
                                .map((quote) => (
                                  <div
                                    key={quote.id}
                                    className="border-b last:border-b-0 pb-2 last:pb-0"
                                  >
                                    <div className="font-medium">
                                      {quote.departureLocation} -{" "}
                                      {quote.arrivalLocation}
                                    </div>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                      <span>
                                        {new Date(
                                          quote.date
                                        ).toLocaleDateString("fr-FR")}{" "}
                                        • {quote.passengers} passagers
                                      </span>
                                      <Badge
                                        variant={
                                          quote.status === "confirmed"
                                            ? "default"
                                            : quote.status === "rejected"
                                            ? "destructive"
                                            : "outline"
                                        }
                                      >
                                        {quote.status === "pending"
                                          ? "En attente"
                                          : quote.status === "confirmed"
                                          ? "Confirmé"
                                          : "Refusé"}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <DialogFooter className="mt-4">
                        <Button variant="outline">Fermer</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
