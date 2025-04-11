"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";
import { useQuote } from "@/lib/quote-context";
import { calculateEstimatedPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import AutocompleteComponent from "./autocomplete-component";

// Schéma de validation Zod pour le formulaire de devis
const quoteSchema = z.object({
  departureLocation: z
    .string()
    .min(2, "Le lieu de départ doit comporter au moins 2 caractères"),
  arrivalLocation: z
    .string()
    .min(2, "Le lieu d'arrivée doit comporter au moins 2 caractères"),
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  passengers: z.coerce
    .number()
    .int()
    .min(1, "Le nombre de passagers est requis")
    .max(200, "Maximum 200 passagers"),
  serviceType: z.enum(["one-way", "round-trip", "stay"], {
    required_error: "Veuillez sélectionner un type de service",
  }),
  options: z.object({
    accessibility: z.boolean().default(false),
    wifi: z.boolean().default(false),
    toilet: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
  }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

// Note: Pour utiliser l'API Google Maps, remplacez YOUR_API_KEY_HERE dans .env.local
// avec votre clé API Google Maps

export function QuoteForm() {
  const { isAuthenticated, user } = useAuth();
  const { addQuote } = useQuote();
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isPriceCalculated, setIsPriceCalculated] = useState(false);
  const [distanceInfo, setDistanceInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);

  // Initialiser le formulaire avec react-hook-form et zod
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      departureLocation: "",
      arrivalLocation: "",
      date: "",
      time: "",
      passengers: undefined,
      serviceType: "one-way",
      options: {
        accessibility: false,
        wifi: false,
        toilet: false,
        airConditioning: false,
      },
    },
  });

  // Fonction pour estimer le prix
  const estimatePrice = () => {
    try {
      const values = form.getValues();

      // Vérifier que tous les champs nécessaires sont remplis
      if (
        !values.departureLocation ||
        !values.arrivalLocation ||
        !values.passengers ||
        !values.serviceType
      ) {
        toast.error("Formulaire incomplet", {
          description:
            "Veuillez remplir tous les champs obligatoires pour estimer le prix.",
        });
        return;
      }

      // Extraire la distance en km du texte (ex: "150 km" -> 150)
      let distanceKm = 0;
      if (distanceInfo?.distance) {
        const distanceMatch = distanceInfo.distance.match(/(\d+[,.]?\d*)/);
        if (distanceMatch) {
          // Remplacer la virgule par un point et convertir en nombre
          distanceKm = parseFloat(distanceMatch[0].replace(",", "."));
        }
      }

      // Calculer le prix avec la distance si disponible
      const price = calculateEstimatedPrice(
        values.departureLocation,
        values.arrivalLocation,
        values.passengers,
        values.serviceType,
        values.options,
        distanceKm
      );

      setEstimatedPrice(price);
      setIsPriceCalculated(true);

      toast.success("Prix estimé", {
        description: `Le prix estimé pour votre trajet est de ${price} €`,
      });
    } catch (error) {
      toast.error("Erreur", {
        description: "Une erreur s'est produite lors de l'estimation du prix.",
      });
    }
  };

  // Fonction de soumission du formulaire
  const onSubmit = (values: QuoteFormValues) => {
    try {
      // Si le prix n'a pas été calculé, le faire maintenant
      if (!isPriceCalculated) {
        // Extraire la distance si disponible
        let distanceKm = 0;
        if (distanceInfo?.distance) {
          const distanceMatch = distanceInfo.distance.match(/(\d+[,.]?\d*)/);
          if (distanceMatch) {
            distanceKm = parseFloat(distanceMatch[0].replace(",", "."));
          }
        }

        const price = calculateEstimatedPrice(
          values.departureLocation,
          values.arrivalLocation,
          values.passengers,
          values.serviceType,
          values.options,
          distanceKm
        );
        setEstimatedPrice(price);
      }

      // Ajouter le devis
      addQuote({
        userId: isAuthenticated ? user?.id : null,
        departureLocation: values.departureLocation,
        arrivalLocation: values.arrivalLocation,
        date: values.date,
        time: values.time,
        passengers: values.passengers,
        serviceType: values.serviceType,
        options: values.options,
        status: "pending",
        price: estimatedPrice,
        partnerId: null,
      });

      // Réinitialiser le formulaire
      form.reset();
      setEstimatedPrice(null);
      setIsPriceCalculated(false);
      setDistanceInfo(null);

      // Afficher un message de succès
      toast.success("Demande envoyée", {
        description:
          "Votre demande de devis a été envoyée avec succès. Nous vous contacterons prochainement.",
      });
    } catch (error) {
      toast.error("Erreur", {
        description: "Une erreur s'est produite lors de l'envoi de la demande.",
      });
    }
  };

  // Fonction pour calculer la distance entre deux points
  const calculateDistance = async (origin: string, destination: string) => {
    if (!origin || !destination) return;

    try {
      const response = await fetch(
        `/api/distance?origin=${encodeURIComponent(
          origin
        )}&destination=${encodeURIComponent(destination)}`
      );
      const data = await response.json();

      if (data.success) {
        setDistanceInfo({
          distance: data.distance.text,
          duration: data.duration.text,
        });
      } else {
        setDistanceInfo(null);
        console.error("Erreur lors du calcul de la distance:", data.error);
      }
    } catch (error) {
      setDistanceInfo(null);
      console.error("Erreur lors de la requête de distance:", error);
    }
  };

  // Fonction pour les changements de champs
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleFieldChange = (
    field: "departureLocation" | "arrivalLocation",
    value: string
  ) => {
    form.setValue(field, value);

    // Si les deux champs sont remplis, calculer la distance
    const departureLocation =
      field === "departureLocation"
        ? value
        : form.getValues("departureLocation");
    const arrivalLocation =
      field === "arrivalLocation" ? value : form.getValues("arrivalLocation");

    if (
      departureLocation &&
      arrivalLocation &&
      departureLocation.length > 3 &&
      arrivalLocation.length > 3
    ) {
      // Nettoyer le timer précédent si existe
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Créer un nouveau timer
      const timer = setTimeout(() => {
        calculateDistance(departureLocation, arrivalLocation);
      }, 1000);

      // Sauvegarder le timer pour pouvoir le nettoyer
      setDebounceTimer(timer);
    }
  };

  // Remarque: Vous pourrez ajouter l'autocomplete de lieux après avoir obtenu une clé API Google valide
  // et l'avoir configurée dans le fichier .env.local
  // Pour des raisons de simplicité et pour éviter les erreurs de type, on utilise simplement
  // les champs Input standard pour l'instant.

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="departureLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lieu de départ</FormLabel>
                    <FormControl>
                      <AutocompleteComponent
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          handleFieldChange("departureLocation", value);
                        }}
                        placeholder="Paris"
                        error={!!form.formState.errors.departureLocation}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrivalLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lieu d&apos;arrivée</FormLabel>
                    <FormControl>
                      <AutocompleteComponent
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          handleFieldChange("arrivalLocation", value);
                        }}
                        placeholder="Lyon"
                        error={!!form.formState.errors.arrivalLocation}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de départ</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure de départ</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de passagers</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={200}
                        placeholder="50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de prestation</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de prestation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="one-way">Aller simple</SelectItem>
                        <SelectItem value="round-trip">Aller-retour</SelectItem>
                        <SelectItem value="stay">Séjour</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="options"
              render={() => (
                <FormItem>
                  <FormLabel>Options</FormLabel>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="options.accessibility"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Accessibilité PMR</FormLabel>
                            <FormDescription>
                              Véhicule adapté aux personnes à mobilité réduite
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="options.wifi"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>WiFi</FormLabel>
                            <FormDescription>
                              Connexion internet à bord
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="options.toilet"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Toilettes</FormLabel>
                            <FormDescription>
                              Toilettes à bord du véhicule
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="options.airConditioning"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Climatisation</FormLabel>
                            <FormDescription>
                              Véhicule climatisé
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />

            {/* Affichage de la distance */}
            {distanceInfo && (
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium">Estimation du trajet :</p>
                <div className="mt-1 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d="M19 19H5V5" />
                      <path d="M19 5 5 19" />
                    </svg>
                    <span>{distanceInfo.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{distanceInfo.duration}</span>
                  </div>
                </div>
              </div>
            )}

            {isPriceCalculated && estimatedPrice !== null && (
              <div className="rounded-md border p-4 bg-muted/50">
                <div className="font-medium">Prix estimé</div>
                <div className="text-2xl font-bold text-primary">
                  {estimatedPrice} €
                </div>
                <div className="text-sm text-muted-foreground">
                  Ce prix est une estimation et peut varier selon disponibilité.
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={estimatePrice}
              >
                Estimer le prix
              </Button>
              <Button type="submit" className="flex-1">
                Envoyer la demande
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
