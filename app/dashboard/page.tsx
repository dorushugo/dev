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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { quotes, getUserQuotes } = useQuote();
  const { getPartnerById } = usePartner();
  const { getMessagesForRequest, addMessage } = useMessage();

  const [userQuotes, setUserQuotes] = useState<QuoteRequest[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router, user]);

  // Charger les devis de l'utilisateur
  useEffect(() => {
    if (isAuthenticated && user && !user.isAdmin) {
      const userQuotesList = getUserQuotes(user.id);
      setUserQuotes(userQuotesList);
    }
  }, [isAuthenticated, user, quotes, getUserQuotes]);

  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (!selectedQuoteId || !newMessage.trim() || !user) return;

    addMessage({
      requestId: selectedQuoteId,
      userId: user.id,
      isAdmin: false,
      content: newMessage.trim(),
    });

    setNewMessage("");
    toast.success("Message envoyé");
  };

  if (!isAuthenticated || !user || user.isAdmin) {
    return null;
  }

  // Filtrer les devis par statut
  const pendingQuotes = userQuotes.filter(
    (quote) => quote.status === "pending"
  );
  const confirmedQuotes = userQuotes.filter(
    (quote) => quote.status === "confirmed"
  );
  const rejectedQuotes = userQuotes.filter(
    (quote) => quote.status === "rejected"
  );

  return (
    <div className="py-10 px-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mon espace client</h1>
        <p className="text-muted-foreground">
          Bienvenue, {user.name}. Suivez vos demandes et consultez vos messages.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            Toutes les demandes ({userQuotes.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            En attente ({pendingQuotes.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmées ({confirmedQuotes.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Refusées ({rejectedQuotes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderQuotesList(userQuotes)}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {renderQuotesList(pendingQuotes)}
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          {renderQuotesList(confirmedQuotes)}
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          {renderQuotesList(rejectedQuotes)}
        </TabsContent>
      </Tabs>

      {userQuotes.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">Aucune demande de devis</h3>
          <p className="text-muted-foreground mt-1">
            Vous n&apos;avez pas encore effectué de demande de devis.
          </p>
          <Button className="mt-4" onClick={() => router.push("/quote")}>
            Demander un devis
          </Button>
        </div>
      )}
    </div>
  );

  // Fonction pour afficher la liste des devis
  function renderQuotesList(quotesList: QuoteRequest[]) {
    if (quotesList.length === 0) {
      return (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">Aucun résultat</h3>
          <p className="text-muted-foreground mt-1">
            Aucune demande ne correspond à ce filtre.
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quotesList.map((quote) => {
          const partner = quote.partnerId
            ? getPartnerById(quote.partnerId)
            : null;
          const quoteMessages = getMessagesForRequest(quote.id);

          return (
            <Card key={quote.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
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
                    <span className="text-muted-foreground">Type :</span>
                    <p>{translateServiceType(quote.serviceType)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Passagers :</span>
                    <p>{quote.passengers}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prix :</span>
                    <p className="font-semibold">{formatPrice(quote.price)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Créé le :</span>
                    <p>{formatDate(quote.createdAt)}</p>
                  </div>
                </div>

                {quote.status === "confirmed" && partner && (
                  <div className="mt-4 rounded-md bg-green-50 p-3">
                    <h4 className="font-medium">Transport assuré par :</h4>
                    <p>{partner.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {partner.phone}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedQuoteId(quote.id)}
                    >
                      Voir les détails
                      {quoteMessages.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {quoteMessages.length} message
                          {quoteMessages.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Détails de la demande</DialogTitle>
                      <DialogDescription>
                        {quote.departureLocation} - {quote.arrivalLocation} le{" "}
                        {formatDate(quote.date)} à {quote.time}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div>
                        <h4 className="font-medium mb-2">Informations</h4>
                        <div className="space-y-1 text-sm">
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              Statut :
                            </span>
                            <span>{translateStatus(quote.status)}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              Type :
                            </span>
                            <span>
                              {translateServiceType(quote.serviceType)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              Passagers :
                            </span>
                            <span>{quote.passengers}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              Prix :
                            </span>
                            <span className="font-semibold">
                              {formatPrice(quote.price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Options</h4>
                        <div className="space-y-1 text-sm">
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              Accessibilité PMR :
                            </span>
                            <span>
                              {quote.options.accessibility ? "Oui" : "Non"}
                            </span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              WiFi :
                            </span>
                            <span>{quote.options.wifi ? "Oui" : "Non"}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              Toilettes :
                            </span>
                            <span>{quote.options.toilet ? "Oui" : "Non"}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-muted-foreground">
                              Climatisation :
                            </span>
                            <span>
                              {quote.options.airConditioning ? "Oui" : "Non"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {partner && (
                      <div className="rounded-md bg-muted p-3 mb-4">
                        <h4 className="font-medium">Transport assuré par :</h4>
                        <p>{partner.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Tel: {partner.phone}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Email: {partner.contactEmail}
                        </p>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Messages</h4>
                      {quoteMessages.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Aucun message pour cette demande.
                        </p>
                      ) : (
                        <div className="space-y-3 max-h-40 overflow-y-auto mb-4">
                          {quoteMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`rounded-lg p-3 ${
                                msg.isAdmin
                                  ? "bg-muted ml-4"
                                  : "bg-primary text-primary-foreground mr-4"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {msg.isAdmin ? "Agent" : "Vous"} -{" "}
                                {formatDate(msg.timestamp)}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 mt-2">
                        <Textarea
                          placeholder="Écrivez votre message ici..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="min-h-0"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          size="sm"
                        >
                          Envoyer
                        </Button>
                      </div>
                    </div>

                    <DialogFooter className="mt-4">
                      <Button variant="outline" className="w-full">
                        Fermer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  }
}
