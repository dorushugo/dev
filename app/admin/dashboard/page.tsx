"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useMessage } from "@/lib/message-context";
import { usePartner } from "@/lib/partner-context";
import { useQuote } from "@/lib/quote-context";
import { formatDate, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Type pour les activités
type ActivityItem = {
  type: "quote" | "message";
  content: string;
  timestamp: string;
  id: string;
  requestId?: string;
  location?: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const { quotes, getQuoteById } = useQuote();
  const { partners } = usePartner();
  const { messages, getUnreadMessagesCount } = useMessage();

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  // Rediriger si l'utilisateur n'est pas authentifié ou n'est pas admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!isAdmin) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  // Construire l'activité récente
  useEffect(() => {
    // Ajouter les derniers devis
    const recentQuotes: ActivityItem[] = [...quotes]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5)
      .map((quote) => ({
        type: "quote",
        content: `Demande: ${quote.departureLocation} - ${quote.arrivalLocation}`,
        timestamp: quote.createdAt,
        id: quote.id,
      }));

    // Ajouter les derniers messages
    const recentMessages: ActivityItem[] = [...messages]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 5)
      .map((message) => {
        const quote = getQuoteById(message.requestId);
        return {
          type: "message",
          content: `Message: ${message.content.slice(0, 30)}${
            message.content.length > 30 ? "..." : ""
          }`,
          timestamp: message.timestamp,
          id: message.id,
          requestId: message.requestId,
          location: quote
            ? `${quote.departureLocation} - ${quote.arrivalLocation}`
            : "",
        };
      });

    // Combiner et trier par date
    const combinedActivity = [...recentQuotes, ...recentMessages]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10);

    setRecentActivity(combinedActivity);
  }, [quotes, messages, getQuoteById]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  // Calculer les statistiques
  const pendingQuotes = quotes.filter((quote) => quote.status === "pending");
  const confirmedQuotes = quotes.filter(
    (quote) => quote.status === "confirmed"
  );

  const upcomingTrips = confirmedQuotes
    .filter((quote) => {
      const tripDate = new Date(quote.date);
      const today = new Date();
      return tripDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const unreadMessages = getUnreadMessagesCount(true);

  // Calculer le revenu total des prestations confirmées
  const totalRevenue = confirmedQuotes.reduce(
    (total, quote) => total + (quote.price || 0),
    0
  );

  return (
    <div className="py-10 px-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Tableau de bord administrateur
        </h1>
        <p className="text-muted-foreground">
          Bienvenue, {user?.name}. Voici une vue d&apos;ensemble de
          l&apos;activité.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Demandes en attente
            </CardTitle>
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
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
              <path d="M16 2v4" />
              <path d="M8 2v4" />
              <path d="M3 10h18" />
              <circle cx="18" cy="18" r="3" />
              <path d="M18.5 15.5v3h3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingQuotes.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingQuotes.length
                ? `Dernière: ${formatDate(
                    pendingQuotes[pendingQuotes.length - 1].createdAt
                  )}`
                : "Aucune demande en attente"}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/admin/requests" className="w-full">
              <Button variant="ghost" size="sm" className="w-full">
                Voir toutes les demandes
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prestations confirmées
            </CardTitle>
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
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedQuotes.length}</div>
            <p className="text-xs text-muted-foreground">
              {confirmedQuotes.length
                ? `${upcomingTrips.length} à venir`
                : "Aucune prestation confirmée"}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <div className="text-sm font-medium text-center w-full">
              {formatPrice(totalRevenue)} de revenus
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Messages non lus
            </CardTitle>
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
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              {unreadMessages ? "À traiter" : "Tous les messages ont été lus"}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/admin/messages" className="w-full">
              <Button variant="ghost" size="sm" className="w-full">
                Voir les messages
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partenaires</CardTitle>
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
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.length}</div>
            <p className="text-xs text-muted-foreground">
              {partners.length
                ? "Partenaires actifs"
                : "Aucun partenaire disponible"}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/admin/partners" className="w-full">
              <Button variant="ghost" size="sm" className="w-full">
                Gérer les partenaires
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demandes récentes à traiter</CardTitle>
            <CardDescription>
              Les 5 dernières demandes en attente de traitement
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingQuotes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune demande en attente.
              </p>
            ) : (
              <div className="space-y-4">
                {pendingQuotes
                  .slice(-5)
                  .reverse()
                  .map((quote) => (
                    <div key={quote.id} className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {quote.departureLocation} - {quote.arrivalLocation}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(quote.date)} • {quote.passengers}{" "}
                          passagers • {formatPrice(quote.price)}
                        </p>
                      </div>
                      <Link href={`/admin/requests?id=${quote.id}`}>
                        <Button size="sm" variant="outline">
                          Traiter
                        </Button>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Les dernières activités sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune activité récente.
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.content}
                      </p>
                      {activity.type === "message" && activity.location && (
                        <p className="text-xs text-muted-foreground">
                          Trajet: {activity.location}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                    {activity.type === "quote" && (
                      <Link href={`/admin/requests?id=${activity.id}`}>
                        <Button size="sm" variant="outline">
                          Voir
                        </Button>
                      </Link>
                    )}
                    {activity.type === "message" && activity.requestId && (
                      <Link href={`/admin/messages?id=${activity.requestId}`}>
                        <Button size="sm" variant="outline">
                          Répondre
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
