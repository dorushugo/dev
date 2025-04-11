"use client";

import { useEffect, useState } from "react";

interface AutocompleteComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  error?: boolean;
}

interface PlacePrediction {
  description: string;
  place_id: string;
}

// Pour la sécurité, nous n'exposerons pas directement la clé API
// À la place, nous utiliserons notre propre API pour les requêtes de géocodage
export default function AutocompleteComponent({
  value,
  onChange,
  placeholder,
  className = "",
  error = false,
}: AutocompleteComponentProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour récupérer les suggestions via notre propre API
  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      // Cette route API sera créée dans la prochaine étape
      const response = await fetch(
        `/api/places?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.success && data.predictions) {
        setSuggestions(
          data.predictions.map((p: PlacePrediction) => p.description)
        );
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mettre à jour le champ et notifier le parent
  const handleChange = (value: string) => {
    setInputValue(value);
    onChange(value);
  };

  // Débounce la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder={placeholder}
        className={`h-10 w-full rounded-md border ${
          error ? "border-red-500" : "border-input"
        } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />

      {isLoading && (
        <div className="absolute right-3 top-3 h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
      )}

      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-background shadow-lg">
          <ul className="py-1 text-sm">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-3 py-2 hover:bg-muted"
                onClick={() => {
                  handleChange(suggestion);
                  setIsFocused(false);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
