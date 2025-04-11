"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { Message } from "@/lib/data";
import { useMessage } from "@/lib/message-context";
import { useQuote } from "@/lib/quote-context";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminMessagesPage() {
  const router = useRouter();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const { messages, getMessagesForRequest, addMessage, markAsRead } =
    useMessage();
  const { quotes, getQuoteById } = useQuote();

  const [messagesByRequest, setMessagesByRequest] = useState<
    Record<string, Message[]>
  >({});
  const [newMessages, setNewMessages] = useState<Record<string, string>>({});
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<
    Record<string, number>
  >({});

  // Rediriger si l'utilisateur n'est pas authentifié ou n'est pas admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!isAdmin) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  // Organiser les messages par demande
  useEffect(() => {
    const groupedMessages: Record<string, Message[]> = {};
    const unreadCount: Record<string, number> = {};

    // Regrouper les messages par demande
    messages.forEach((message) => {
      if (!groupedMessages[message.requestId]) {
        groupedMessages[message.requestId] = [];
        unreadCount[message.requestId] = 0;
      }

      groupedMessages[message.requestId].push(message);

      // Compter les messages non lus des clients
      if (!message.read && !message.isAdmin) {
        unreadCount[message.requestId]++;
      }
    });

    // Trier les messages par timestamp (croissant) pour chaque demande
    Object.keys(groupedMessages).forEach((requestId) => {
      groupedMessages[requestId].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });

    setMessagesByRequest(groupedMessages);
    setUnreadMessagesCount(unreadCount);

    // Initialiser l'objet de nouveaux messages
    const newMessagesObj: Record<string, string> = {};
    Object.keys(groupedMessages).forEach((requestId) => {
      newMessagesObj[requestId] = "";
    });
    setNewMessages(newMessagesObj);

    // Sélectionner automatiquement la première demande qui a des messages non lus
    if (!selectedRequestId) {
      const firstUnreadRequest = Object.keys(unreadCount).find(
        (requestId) => unreadCount[requestId] > 0
      );
      if (firstUnreadRequest) {
        setSelectedRequestId(firstUnreadRequest);
      } else if (Object.keys(groupedMessages).length > 0) {
        setSelectedRequestId(Object.keys(groupedMessages)[0]);
      }
    }
  }, [messages, selectedRequestId]);

  // Marquer les messages comme lus lorsqu'on sélectionne une demande
  useEffect(() => {
    if (selectedRequestId && messagesByRequest[selectedRequestId]) {
      messagesByRequest[selectedRequestId].forEach((message) => {
        if (!message.read && !message.isAdmin) {
          markAsRead(message.id);
        }
      });
    }
  }, [selectedRequestId, messagesByRequest, markAsRead]);

  // Fonction pour envoyer un message
  const handleSendMessage = (requestId: string) => {
    if (!newMessages[requestId] || !newMessages[requestId].trim() || !user)
      return;

    addMessage({
      requestId,
      userId: user.id,
      isAdmin: true,
      content: newMessages[requestId].trim(),
    });

    // Réinitialiser le champ de saisie
    setNewMessages({
      ...newMessages,
      [requestId]: "",
    });

    toast.success("Message envoyé");
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const requestIds = Object.keys(messagesByRequest);
  const totalUnreadMessages = Object.values(unreadMessagesCount).reduce(
    (total, count) => total + count,
    0
  );

  return (
    <div className="py-10 px-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Messagerie</h1>
          <p className="text-muted-foreground">
            Gérez les conversations avec vos clients.
          </p>
        </div>
        <Link href="/admin/dashboard">
          <Button variant="outline">Retour au tableau de bord</Button>
        </Link>
      </div>

      {requestIds.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">Aucun message</h3>
          <p className="text-muted-foreground mt-1">
            Vous n&apos;avez pas encore de messages.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          {/* Liste des conversations */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-3 border-b">
              <h3 className="font-medium">Conversations</h3>
              <p className="text-sm text-muted-foreground">
                {totalUnreadMessages} message
                {totalUnreadMessages !== 1 ? "s" : ""} non lu
                {totalUnreadMessages !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {requestIds.map((requestId) => {
                const quote = getQuoteById(requestId);
                if (!quote) return null;

                const lastMessage =
                  messagesByRequest[requestId][
                    messagesByRequest[requestId].length - 1
                  ];
                const hasUnread = unreadMessagesCount[requestId] > 0;

                return (
                  <div
                    key={requestId}
                    className={`p-3 border-b cursor-pointer hover:bg-muted/50 ${
                      selectedRequestId === requestId ? "bg-muted" : ""
                    } ${hasUnread ? "bg-blue-50 hover:bg-blue-100" : ""}`}
                    onClick={() => setSelectedRequestId(requestId)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium truncate flex-1">
                        {quote.departureLocation} - {quote.arrivalLocation}
                      </div>
                      {hasUnread && (
                        <Badge className="ml-2">
                          {unreadMessagesCount[requestId]}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {lastMessage.isAdmin ? "Vous" : "Client"}:{" "}
                      {lastMessage.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDate(lastMessage.timestamp)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conversation sélectionnée */}
          {selectedRequestId && messagesByRequest[selectedRequestId] ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>
                  {(() => {
                    const quote = getQuoteById(selectedRequestId);
                    return quote
                      ? `${quote.departureLocation} - ${
                          quote.arrivalLocation
                        } (${formatDate(quote.date)})`
                      : "Conversation";
                  })()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] overflow-y-auto border rounded-md p-3 mb-4">
                  {messagesByRequest[selectedRequestId].map((message) => (
                    <div
                      key={message.id}
                      className={`mb-3 ${
                        message.isAdmin ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block rounded-lg p-3 max-w-[80%] ${
                          message.isAdmin
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.isAdmin ? "Vous" : "Client"} -{" "}
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Tapez votre message ici..."
                    value={newMessages[selectedRequestId] || ""}
                    onChange={(e) =>
                      setNewMessages({
                        ...newMessages,
                        [selectedRequestId]: e.target.value,
                      })
                    }
                    className="min-h-0"
                  />
                  <Button
                    onClick={() => handleSendMessage(selectedRequestId)}
                    disabled={!newMessages[selectedRequestId]?.trim()}
                  >
                    Envoyer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-[400px] text-muted-foreground">
                Sélectionnez une conversation pour afficher les messages.
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
