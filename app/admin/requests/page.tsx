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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { QuoteRequest } from "@/lib/data";
import { useMessage } from "@/lib/message-context";
import { usePartner } from "@/lib/partner-context";
import { useQuote } from "@/lib/quote-context";
import {
  formatDate,
  formatPrice,
  translateServiceType,
  translateStatus,
} from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminRequestsPage() {
  const router = useRouter();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const { quotes, updateQuoteStatus, assignPartner } = useQuote();
  const { partners } = usePartner();
  const { addMessage, getMessagesForRequest } = useMessage();

  // État local
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteRequest[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("no_change");
  const [selectedPartnerId, setSelectedPartnerId] =
    useState<string>("no_partner");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Rediriger si l'utilisateur n'est pas authentifié ou n'est pas admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!isAdmin) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  // Filtrer les devis
  useEffect(() => {
    let filtered = [...quotes];

    // Filtrer par statut
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((quote) => quote.status === statusFilter);
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (quote) =>
          quote.departureLocation.toLowerCase().includes(lowerSearchTerm) ||
          quote.arrivalLocation.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Trier par date de création (le plus récent en premier)
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredQuotes(filtered);
  }, [quotes, searchTerm, statusFilter]);

  // Fonction pour mettre à jour le statut et assigner un partenaire
  const handleUpdateQuote = () => {
    if (!selectedQuoteId) return;

    let updated = false;

    // Mettre à jour le statut si nécessaire
    if (selectedStatus && selectedStatus !== "no_change") {
      const status = selectedStatus as "pending" | "confirmed" | "rejected";
      updated = updateQuoteStatus(selectedQuoteId, status);
    }

    // Assigner un partenaire si nécessaire
    if (
      selectedStatus === "confirmed" &&
      selectedPartnerId &&
      selectedPartnerId !== "no_partner"
    ) {
      updated = assignPartner(selectedQuoteId, selectedPartnerId) || updated;
    }

    if (updated) {
      toast.success("Demande mise à jour avec succès");
      setSelectedStatus("no_change");
      setSelectedPartnerId("no_partner");
    } else {
      toast.error("Erreur lors de la mise à jour de la demande");
    }
  };

  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (!selectedQuoteId || !newMessage.trim() || !user) return;

    addMessage({
      requestId: selectedQuoteId,
      userId: user.id,
      isAdmin: true,
      content: newMessage.trim(),
    });

    setNewMessage("");
    toast.success("Message envoyé");
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="py-10 px-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des demandes
          </h1>
          <p className="text-muted-foreground">
            Consultez et traitez les demandes de devis.
          </p>
        </div>
        <Link href="/admin/dashboard">
          <Button variant="outline">Retour au tableau de bord</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
        <div className="flex-1 space-y-2 md:space-y-0 md:space-x-2 md:flex md:items-center">
          <Input
            placeholder="Rechercher par lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:max-w-xs"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="md:w-40">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmés</SelectItem>
              <SelectItem value="rejected">Refusés</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredQuotes.length} demande
          {filteredQuotes.length !== 1 ? "s" : ""} trouvée
          {filteredQuotes.length !== 1 ? "s" : ""}
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">Aucune demande trouvée</h3>
          <p className="text-muted-foreground mt-1">
            Aucune demande ne correspond à vos critères de recherche.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuotes.map((quote) => {
            const partner = quote.partnerId
              ? partners.find((p) => p.id === quote.partnerId)
              : null;
            const quoteMessages = getMessagesForRequest(quote.id);

            return (
              <Card key={quote.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {quote.departureLocation} - {quote.arrivalLocation}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(quote.date)} à {quote.time}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        quote.status === "confirmed"
                          ? "default"
                          : quote.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {translateStatus(quote.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client :</span>
                      <p>
                        {quote.userId ? "Client enregistré" : "Demande anonyme"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type :</span>
                      <p>{translateServiceType(quote.serviceType)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Passagers :</span>
                      <p>{quote.passengers}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Prix :</span>
                      <p className="font-semibold">
                        {formatPrice(quote.price)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedQuoteId(quote.id)}
                      >
                        Gérer la demande
                        {quoteMessages.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {quoteMessages.length}
                          </Badge>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Gérer la demande</DialogTitle>
                        <DialogDescription>
                          {quote.departureLocation} - {quote.arrivalLocation} le{" "}
                          {formatDate(quote.date)} à {quote.time}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-medium">
                              Informations
                            </h3>
                            <div className="mt-2 space-y-2">
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Client :
                                </span>
                                <span>
                                  {quote.userId
                                    ? "Client enregistré"
                                    : "Demande anonyme"}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Statut :
                                </span>
                                <span>{translateStatus(quote.status)}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Type :
                                </span>
                                <span>
                                  {translateServiceType(quote.serviceType)}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Passagers :
                                </span>
                                <span>{quote.passengers}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Prix :
                                </span>
                                <span className="font-semibold">
                                  {formatPrice(quote.price)}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Date de création :
                                </span>
                                <span>{formatDate(quote.createdAt)}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium">Options</h3>
                            <div className="mt-2 space-y-2">
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Accessibilité PMR :
                                </span>
                                <span>
                                  {quote.options.accessibility ? "Oui" : "Non"}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  WiFi :
                                </span>
                                <span>
                                  {quote.options.wifi ? "Oui" : "Non"}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Toilettes :
                                </span>
                                <span>
                                  {quote.options.toilet ? "Oui" : "Non"}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-sm">
                                <span className="text-muted-foreground">
                                  Climatisation :
                                </span>
                                <span>
                                  {quote.options.airConditioning
                                    ? "Oui"
                                    : "Non"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium">Actions</h3>
                            <div className="mt-2 space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Changer le statut
                                </label>
                                <Select
                                  value={selectedStatus}
                                  onValueChange={setSelectedStatus}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un statut" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="no_change">
                                      Aucun changement
                                    </SelectItem>
                                    <SelectItem value="pending">
                                      En attente
                                    </SelectItem>
                                    <SelectItem value="confirmed">
                                      Confirmé
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                      Refusé
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {selectedStatus === "confirmed" && (
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    Assigner un partenaire
                                  </label>
                                  <Select
                                    value={selectedPartnerId}
                                    onValueChange={setSelectedPartnerId}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner un partenaire" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="no_partner">
                                        Aucun partenaire
                                      </SelectItem>
                                      {partners.map((partner) => (
                                        <SelectItem
                                          key={partner.id}
                                          value={partner.id}
                                        >
                                          {partner.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}

                              <Button
                                onClick={handleUpdateQuote}
                                disabled={!selectedStatus && !selectedPartnerId}
                                className="w-full"
                              >
                                Mettre à jour
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-medium">Messages</h3>
                            {quoteMessages.length === 0 ? (
                              <p className="text-sm text-muted-foreground mt-2">
                                Aucun message pour cette demande.
                              </p>
                            ) : (
                              <div className="mt-2 h-48 overflow-y-auto space-y-3 p-2 border rounded-md">
                                {quoteMessages.map((msg) => (
                                  <div
                                    key={msg.id}
                                    className={`rounded-lg p-3 ${
                                      msg.isAdmin
                                        ? "bg-primary text-primary-foreground ml-8"
                                        : "bg-muted mr-8"
                                    }`}
                                  >
                                    <p className="text-sm">{msg.content}</p>
                                    <p className="text-xs mt-1 opacity-70">
                                      {msg.isAdmin ? "Vous" : "Client"} -{" "}
                                      {formatDate(msg.timestamp)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Nouveau message
                            </label>
                            <Textarea
                              placeholder="Écrivez votre message ici..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              className="min-h-0"
                            />
                            <Button
                              onClick={handleSendMessage}
                              disabled={!newMessage.trim()}
                              className="w-full"
                            >
                              Envoyer
                            </Button>
                          </div>

                          {partner && (
                            <div className="mt-4 rounded-md bg-muted p-3">
                              <h4 className="font-medium">
                                Partenaire assigné
                              </h4>
                              <p>{partner.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Tel: {partner.phone}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Email: {partner.contactEmail}
                              </p>
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
