"use client";

import { Message, messages } from "@/lib/data";
import {
  generateId,
  getCurrentISODate,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

type MessageContextType = {
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "timestamp" | "read">) => Message;
  markAsRead: (id: string) => boolean;
  getMessagesForRequest: (requestId: string) => Message[];
  getUnreadMessagesCount: (isAdmin: boolean) => number;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger les messages depuis localStorage ou utiliser les données mockées
    const storedMessages = getFromLocalStorage<Message[]>("messages", messages);
    setAllMessages(storedMessages);
    setIsLoaded(true);
  }, []);

  // Sauvegarder dans localStorage à chaque mise à jour
  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage("messages", allMessages);
    }
  }, [allMessages, isLoaded]);

  const addMessage = (message: Omit<Message, "id" | "timestamp" | "read">) => {
    const newMessage: Message = {
      ...message,
      id: generateId(),
      timestamp: getCurrentISODate(),
      read: false,
    };

    setAllMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const markAsRead = (id: string) => {
    let updated = false;

    setAllMessages((prev) =>
      prev.map((message) => {
        if (message.id === id && !message.read) {
          updated = true;
          return {
            ...message,
            read: true,
          };
        }
        return message;
      })
    );

    return updated;
  };

  const getMessagesForRequest = (requestId: string) => {
    return allMessages.filter((message) => message.requestId === requestId);
  };

  const getUnreadMessagesCount = (isAdmin: boolean) => {
    return allMessages.filter(
      (message) => !message.read && message.isAdmin !== isAdmin
    ).length;
  };

  return (
    <MessageContext.Provider
      value={{
        messages: allMessages,
        addMessage,
        markAsRead,
        getMessagesForRequest,
        getUnreadMessagesCount,
      }}
    >
      {isLoaded ? children : null}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error(
      "useMessage doit être utilisé à l'intérieur d'un MessageProvider"
    );
  }
  return context;
};
