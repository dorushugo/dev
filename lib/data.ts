export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  phone?: string;
  company?: string;
};

export type QuoteRequest = {
  id: string;
  userId: string | null; // null pour les demandes non authentifiées
  email?: string; // Email pour les utilisateurs non connectés
  departureLocation: string;
  arrivalLocation: string;
  date: string;
  time: string;
  passengers: number;
  serviceType: "one-way" | "round-trip" | "stay";
  options: {
    accessibility: boolean;
    wifi: boolean;
    toilet: boolean;
    airConditioning: boolean;
  };
  status: "pending" | "confirmed" | "rejected";
  price: number | null;
  partnerId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Partner = {
  id: string;
  name: string;
  contactEmail: string;
  phone: string;
  area: string[];
  location: string; // Principale ville d'activité
  vehicles: {
    type: string;
    capacity: number;
    count: number;
  }[];
  vehicleTypes: string[]; // Types de véhicules simplifiés pour l'affichage
  collaborations: number;
  image?: string; // URL de l'image
  yearFounded: string; // Année de création ou de début de partenariat
};

export type Message = {
  id: string;
  requestId: string;
  userId: string;
  isAdmin: boolean;
  content: string;
  timestamp: string;
  read: boolean;
};

// Données mockées des utilisateurs
export const users: User[] = [
  {
    id: "user1",
    email: "client@exemple.fr",
    password: "123456",
    name: "Client Test",
    isAdmin: false,
  },
  {
    id: "admin1",
    email: "admin@exemple.fr",
    password: "admin123",
    name: "Administrateur",
    isAdmin: true,
  },
];

// Données mockées des demandes de devis
export const quoteRequests: QuoteRequest[] = [
  {
    id: "req1",
    userId: "user1",
    email: "client@exemple.fr",
    departureLocation: "Marseille",
    arrivalLocation: "Lyon",
    date: "2024-06-15",
    time: "09:00",
    passengers: 50,
    serviceType: "one-way",
    options: {
      accessibility: true,
      wifi: true,
      toilet: true,
      airConditioning: true,
    },
    status: "pending",
    price: 1200,
    partnerId: "partner1",
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-05-01T10:00:00Z",
  },
  {
    id: "req2",
    userId: "user1",
    email: "client@exemple.fr",
    departureLocation: "Lille",
    arrivalLocation: "Bruxelles",
    date: "2024-06-20",
    time: "08:00",
    passengers: 40,
    serviceType: "round-trip",
    options: {
      accessibility: false,
      wifi: true,
      toilet: true,
      airConditioning: true,
    },
    status: "pending",
    price: 1500,
    partnerId: null,
    createdAt: "2024-05-02T14:30:00Z",
    updatedAt: "2024-05-02T14:30:00Z",
  },
  {
    id: "req3",
    userId: null,
    email: undefined,
    departureLocation: "Nice",
    arrivalLocation: "Milan",
    date: "2024-06-25",
    time: "07:00",
    passengers: 45,
    serviceType: "stay",
    options: {
      accessibility: false,
      wifi: true,
      toilet: false,
      airConditioning: true,
    },
    status: "pending",
    price: 1800,
    partnerId: null,
    createdAt: "2024-05-03T09:15:00Z",
    updatedAt: "2024-05-03T09:15:00Z",
  },
  {
    id: "req4",
    userId: null,
    email: undefined,
    departureLocation: "Bordeaux",
    arrivalLocation: "Toulouse",
    date: "2024-07-01",
    time: "10:00",
    passengers: 30,
    serviceType: "one-way",
    options: {
      accessibility: false,
      wifi: false,
      toilet: true,
      airConditioning: true,
    },
    status: "pending",
    price: 900,
    partnerId: null,
    createdAt: "2024-05-04T16:45:00Z",
    updatedAt: "2024-05-04T16:45:00Z",
  },
  {
    id: "req5",
    userId: "user1",
    email: "client@exemple.fr",
    departureLocation: "Paris",
    arrivalLocation: "Tours",
    date: "2024-06-12",
    time: "08:30",
    passengers: 35,
    serviceType: "one-way",
    options: {
      accessibility: true,
      wifi: true,
      toilet: true,
      airConditioning: true,
    },
    status: "confirmed",
    price: 1100,
    partnerId: "partner2",
    createdAt: "2024-04-30T11:20:00Z",
    updatedAt: "2024-05-01T14:10:00Z",
  },
  {
    id: "req6",
    userId: "user1",
    email: "client@exemple.fr",
    departureLocation: "Reims",
    arrivalLocation: "Metz",
    date: "2024-06-13",
    time: "10:45",
    passengers: 25,
    serviceType: "round-trip",
    options: {
      accessibility: false,
      wifi: true,
      toilet: false,
      airConditioning: true,
    },
    status: "confirmed",
    price: 850,
    partnerId: "partner3",
    createdAt: "2024-04-29T13:50:00Z",
    updatedAt: "2024-05-02T09:30:00Z",
  },
  {
    id: "req7",
    userId: "user1",
    email: "client@exemple.fr",
    departureLocation: "Angers",
    arrivalLocation: "Rennes",
    date: "2024-06-18",
    time: "07:10",
    passengers: 20,
    serviceType: "one-way",
    options: {
      accessibility: false,
      wifi: false,
      toilet: false,
      airConditioning: true,
    },
    status: "confirmed",
    price: 600,
    partnerId: "partner4",
    createdAt: "2024-05-02T16:40:00Z",
    updatedAt: "2024-05-03T10:15:00Z",
  },
];

// Données mockées des partenaires
export const partners: Partner[] = [
  {
    id: "partner1",
    name: "Transport Solutions",
    contactEmail: "contact@transport-solutions.fr",
    phone: "01 23 45 67 89",
    location: "Marseille",
    area: ["Marseille", "Lyon", "Avignon", "Montpellier"],
    vehicles: [
      { type: "Standard", capacity: 50, count: 5 },
      { type: "Luxe", capacity: 40, count: 2 },
    ],
    vehicleTypes: ["Standard", "Luxe"],
    collaborations: 12,
    yearFounded: "2015",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: "partner2",
    name: "Autocars Bernier",
    contactEmail: "info@autocars-bernier.fr",
    phone: "02 34 56 78 90",
    location: "Paris",
    area: ["Paris", "Tours", "Orléans", "Chartres"],
    vehicles: [
      { type: "Standard", capacity: 55, count: 8 },
      { type: "Mini-bus", capacity: 20, count: 4 },
    ],
    vehicleTypes: ["Standard", "Mini-bus"],
    collaborations: 18,
    yearFounded: "2012",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: "partner3",
    name: "TransExpress",
    contactEmail: "contact@transexpress.fr",
    phone: "03 45 67 89 01",
    location: "Lille",
    area: ["Lille", "Amiens", "Reims", "Metz"],
    vehicles: [
      { type: "Standard", capacity: 50, count: 3 },
      { type: "Grand Tourisme", capacity: 45, count: 1 },
    ],
    vehicleTypes: ["Standard", "Grand Tourisme"],
    collaborations: 8,
    yearFounded: "2017",
    image:
      "https://images.unsplash.com/photo-1473042904451-00171c69419d?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: "partner4",
    name: "Voyages Durand",
    contactEmail: "info@voyages-durand.fr",
    phone: "04 56 78 90 12",
    location: "Nantes",
    area: ["Nantes", "Angers", "Rennes", "Vannes"],
    vehicles: [
      { type: "Standard", capacity: 52, count: 4 },
      { type: "VIP", capacity: 30, count: 2 },
      { type: "Mini-bus", capacity: 18, count: 3 },
    ],
    vehicleTypes: ["Standard", "VIP", "Mini-bus"],
    collaborations: 15,
    yearFounded: "2014",
    image:
      "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2572&auto=format&fit=crop",
  },
  {
    id: "partner5",
    name: "Sud Mobilité",
    contactEmail: "contact@sud-mobilite.fr",
    phone: "05 67 89 01 23",
    location: "Toulouse",
    area: ["Toulouse", "Bordeaux", "Montpellier", "Perpignan"],
    vehicles: [
      { type: "Standard", capacity: 50, count: 6 },
      { type: "Luxe", capacity: 40, count: 3 },
      { type: "Accessible", capacity: 45, count: 2 },
    ],
    vehicleTypes: ["Standard", "Luxe", "Accessible"],
    collaborations: 10,
    yearFounded: "2016",
    image:
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2660&auto=format&fit=crop",
  },
];

// Données mockées des messages
export const messages: Message[] = [
  {
    id: "msg1",
    requestId: "req1",
    userId: "user1",
    isAdmin: false,
    content:
      "Bonjour, est-il possible d'avoir des sièges plus confortables pour ce trajet ?",
    timestamp: "2024-05-01T14:30:00Z",
    read: true,
  },
  {
    id: "msg2",
    requestId: "req1",
    userId: "admin1",
    isAdmin: true,
    content:
      "Bonjour, oui c'est tout à fait possible. Cela entraînera un supplément de 100€. Souhaitez-vous que je l'ajoute à votre devis ?",
    timestamp: "2024-05-01T15:45:00Z",
    read: true,
  },
  {
    id: "msg3",
    requestId: "req1",
    userId: "user1",
    isAdmin: false,
    content: "Oui, merci d'ajouter cette option à mon devis.",
    timestamp: "2024-05-01T16:20:00Z",
    read: false,
  },
  {
    id: "msg4",
    requestId: "req2",
    userId: "user1",
    isAdmin: false,
    content: "Bonjour, quand puis-je espérer une réponse pour ce devis ?",
    timestamp: "2024-05-03T09:10:00Z",
    read: false,
  },
];
