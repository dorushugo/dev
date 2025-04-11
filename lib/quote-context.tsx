"use client";

import { QuoteRequest, quoteRequests } from "@/lib/data";
import {
  generateId,
  getCurrentISODate,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

type QuoteContextType = {
  quotes: QuoteRequest[];
  addQuote: (
    quote: Omit<QuoteRequest, "id" | "createdAt" | "updatedAt">
  ) => QuoteRequest;
  updateQuoteStatus: (
    id: string,
    status: "pending" | "confirmed" | "rejected"
  ) => boolean;
  assignPartner: (id: string, partnerId: string) => boolean;
  getUserQuotes: (userId: string) => QuoteRequest[];
  getQuoteById: (id: string) => QuoteRequest | undefined;
};

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger les devis depuis localStorage ou utiliser les données mockées
    const storedQuotes = getFromLocalStorage<QuoteRequest[]>(
      "quotes",
      quoteRequests
    );
    setQuotes(storedQuotes);
    setIsLoaded(true);
  }, []);

  // Sauvegarder dans localStorage à chaque mise à jour
  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage("quotes", quotes);
    }
  }, [quotes, isLoaded]);

  const addQuote = (
    quote: Omit<QuoteRequest, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = getCurrentISODate();
    const newQuote: QuoteRequest = {
      ...quote,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    setQuotes((prev) => [...prev, newQuote]);
    return newQuote;
  };

  const updateQuoteStatus = (
    id: string,
    status: "pending" | "confirmed" | "rejected"
  ) => {
    let updated = false;

    setQuotes((prev) =>
      prev.map((quote) => {
        if (quote.id === id) {
          updated = true;
          return {
            ...quote,
            status,
            updatedAt: getCurrentISODate(),
          };
        }
        return quote;
      })
    );

    return updated;
  };

  const assignPartner = (id: string, partnerId: string) => {
    let updated = false;

    setQuotes((prev) =>
      prev.map((quote) => {
        if (quote.id === id) {
          updated = true;
          return {
            ...quote,
            partnerId,
            updatedAt: getCurrentISODate(),
          };
        }
        return quote;
      })
    );

    return updated;
  };

  const getUserQuotes = (userId: string) => {
    return quotes.filter((quote) => quote.userId === userId);
  };

  const getQuoteById = (id: string) => {
    return quotes.find((quote) => quote.id === id);
  };

  return (
    <QuoteContext.Provider
      value={{
        quotes,
        addQuote,
        updateQuoteStatus,
        assignPartner,
        getUserQuotes,
        getQuoteById,
      }}
    >
      {isLoaded ? children : null}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error(
      "useQuote doit être utilisé à l'intérieur d'un QuoteProvider"
    );
  }
  return context;
};
