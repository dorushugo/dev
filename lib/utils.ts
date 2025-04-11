import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fonction de simulation de prix pour un devis
export function calculateEstimatedPrice(
  departureLocation: string,
  arrivalLocation: string,
  passengers: number,
  serviceType: "one-way" | "round-trip" | "stay",
  options: {
    accessibility: boolean;
    wifi: boolean;
    toilet: boolean;
    airConditioning: boolean;
  },
  distanceKm?: number
): number {
  // Prix de base par passager
  const basePricePerPassenger = 20;

  // Calculer le prix total pour tous les passagers
  let totalPrice = basePricePerPassenger * passengers;

  // Si on a une distance, ajuster le prix en fonction de la distance
  if (distanceKm && distanceKm > 0) {
    // Prix par km pour chaque passager (décroissant avec le nombre de passagers)
    const pricePerKm = Math.max(0.1, 0.2 - passengers / 1000);

    // Ajouter le prix basé sur la distance
    totalPrice += distanceKm * pricePerKm * passengers;
  }

  // Appliquer un facteur multiplicateur en fonction du type de service
  if (serviceType === "round-trip") {
    totalPrice *= 1.8; // Aller-retour : 1.8x le prix d'un aller simple
  } else if (serviceType === "stay") {
    totalPrice *= 2.2; // Séjour : 2.2x le prix d'un aller simple (inclut un délai d'attente)
  }

  // Ajouter des suppléments pour les options
  let optionsPrice = 0;
  if (options.accessibility) optionsPrice += 100;
  if (options.wifi) optionsPrice += 50;
  if (options.toilet) optionsPrice += 50;
  if (options.airConditioning) optionsPrice += 70;

  // Ajouter le prix des options au total
  totalPrice += optionsPrice;

  // Arrondir à l'entier le plus proche
  return Math.round(totalPrice);
}

// Fonction pour générer un ID unique
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Fonction pour obtenir la date actuelle au format ISO
export function getCurrentISODate(): string {
  return new Date().toISOString();
}

// Fonction pour formatter la date (de ISO à affichage utilisateur)
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Fonction pour formatter l'heure (de ISO à affichage utilisateur)
export function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Fonction pour formatter la date et l'heure (de ISO à affichage utilisateur)
export function formatDateTime(isoDate: string): string {
  return `${formatDate(isoDate)} à ${formatTime(isoDate)}`;
}

// Fonction pour formatter le prix en euros
export function formatPrice(price: number | null): string {
  if (price === null) return "N/A";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

// Fonction pour sauvegarder dans localStorage
export function saveToLocalStorage<T>(key: string, data: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Fonction pour récupérer depuis localStorage
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }
  return defaultValue;
}

// Fonction pour traduire le statut en français
export function translateStatus(
  status: "pending" | "confirmed" | "rejected"
): string {
  switch (status) {
    case "pending":
      return "En attente";
    case "confirmed":
      return "Confirmé";
    case "rejected":
      return "Refusé";
    default:
      return status;
  }
}

// Fonction pour traduire le type de service en français
export function translateServiceType(
  type: "one-way" | "round-trip" | "stay"
): string {
  switch (type) {
    case "one-way":
      return "Aller simple";
    case "round-trip":
      return "Aller-retour";
    case "stay":
      return "Séjour";
    default:
      return type;
  }
}
