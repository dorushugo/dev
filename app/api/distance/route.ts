import { NextRequest, NextResponse } from "next/server";

// La clé API est sécurisée côté serveur
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // Récupérer les paramètres de l'URL
    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");

    // Vérifier si les paramètres sont valides
    if (!origin || !destination) {
      return NextResponse.json(
        {
          success: false,
          error: "Origine ou destination manquante",
        },
        { status: 400 }
      );
    }

    // Vérifier si la clé API est configurée
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Clé API Google Maps non configurée");
      return NextResponse.json(
        {
          success: false,
          error: "Configuration du serveur incorrecte",
        },
        { status: 500 }
      );
    }

    // Construire l'URL pour l'API Google Distance Matrix
    const apiUrl = new URL(
      "https://maps.googleapis.com/maps/api/distancematrix/json"
    );
    apiUrl.searchParams.append("origins", origin);
    apiUrl.searchParams.append("destinations", destination);
    apiUrl.searchParams.append("mode", "driving");
    apiUrl.searchParams.append("language", "fr");
    apiUrl.searchParams.append("key", GOOGLE_MAPS_API_KEY);

    // Faire la requête à l'API Google Distance Matrix
    const response = await fetch(apiUrl.toString());
    const data = await response.json();

    // Vérifier la réponse
    if (data.status !== "OK") {
      console.error(
        "Erreur API Google Distance Matrix:",
        data.status,
        data.error_message
      );
      return NextResponse.json(
        {
          success: false,
          error: `Erreur API: ${data.status}`,
        },
        { status: 500 }
      );
    }

    // Extraire les informations de distance et durée
    const results = data.rows[0]?.elements[0];
    if (!results || results.status !== "OK") {
      return NextResponse.json(
        {
          success: false,
          error: "Impossible de calculer la distance",
        },
        { status: 400 }
      );
    }

    // Retourner les résultats
    return NextResponse.json({
      success: true,
      distance: results.distance,
      duration: results.duration,
    });
  } catch (error) {
    console.error("Erreur lors du calcul de la distance:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}
