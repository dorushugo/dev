import { NextRequest, NextResponse } from "next/server";

// La clé API est sécurisée sur le serveur
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // Récupérer la requête depuis les paramètres de l'URL
    console.log("GOOGLE_MAPS_API_KEY", GOOGLE_MAPS_API_KEY);
    console.log("request", request);
    console.log("try to autocomplet");
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    // Vérifier si la requête est valide
    if (!query) {
      return NextResponse.json(
        { success: false, error: "Requête manquante" },
        { status: 400 }
      );
    }

    // Vérifier si la clé API est configurée
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Clé API Google Maps non configurée");
      return NextResponse.json(
        { success: false, error: "Configuration du serveur incorrecte" },
        { status: 500 }
      );
    }

    // Construire l'URL pour l'API Google Places
    const apiUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    );
    apiUrl.searchParams.append("input", query);
    apiUrl.searchParams.append("types", "(cities)");
    apiUrl.searchParams.append("components", "country:fr");
    apiUrl.searchParams.append("language", "fr");
    apiUrl.searchParams.append("key", GOOGLE_MAPS_API_KEY);

    // Faire la requête à l'API Google Places
    const response = await fetch(apiUrl.toString());
    const data = await response.json();

    // Vérifier la réponse
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error(
        "Erreur API Google Places:",
        data.status,
        data.error_message
      );
      return NextResponse.json(
        { success: false, error: `Erreur API: ${data.status}` },
        { status: 500 }
      );
    }

    // Retourner les prédictions
    return NextResponse.json({
      success: true,
      predictions: data.predictions || [],
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
