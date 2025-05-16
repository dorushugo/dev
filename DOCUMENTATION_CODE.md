# Documentation du Code

Ce document fournit des directives et un aperçu de la documentation du code pour le projet Autocar Location.

## 1. Principes Généraux de Documentation

- **Clarté et Conciseneté :** Les commentaires et la documentation doivent être clairs, concis et aller droit au but.
- **Pourquoi, pas Comment :** Le code lui-même explique _comment_ quelque chose est fait. Les commentaires doivent expliquer _pourquoi_ une certaine approche a été choisie, ou clarifier une logique complexe.
- **Maintenir à jour :** La documentation doit être maintenue à jour en même temps que le code. Une documentation obsolète est pire que pas de documentation.
- **Anglais ou Français :** Choisir une langue et s'y tenir pour la cohérence (le code actuel semble utiliser le français pour les commentaires et les noms de variables/fonctions orientés utilisateur, ce qui est bien pour un public francophone).

## 2. Outils et Formats Suggérés

- **JSDoc (ou TSDoc pour TypeScript) :** Utiliser des commentaires formatés JSDoc/TSDoc pour documenter les fonctions, les classes, les types et les paramètres. Cela permet également de générer automatiquement de la documentation HTML.
  - Exemple pour une fonction :
    ```typescript
    /**
     * Calcule le prix estimé d'un trajet en autocar.
     * @param departureLocation - Lieu de départ.
     * @param arrivalLocation - Lieu d'arrivée.
     * @param passengers - Nombre de passagers.
     * @param serviceType - Type de service (aller simple, aller-retour, séjour).
     * @param options - Options sélectionnées (accessibilité, wifi, etc.).
     * @param distanceKm - Distance du trajet en kilomètres (optionnel).
     * @returns Le prix estimé arrondi à l'entier le plus proche.
     */
    export function calculateEstimatedPrice(): number {
      // ...args
      // ...implementation
    }
    ```
- **README spécifiques aux modules :** Pour des modules complexes ou des répertoires importants (ex: `lib/auth`, `app/admin`), un petit fichier `README.md` à l'intérieur du répertoire peut expliquer son rôle, sa structure et comment l'utiliser.

## 3. Zones Clés à Documenter

Voici une liste non exhaustive des parties du code qui bénéficieraient particulièrement d'une bonne documentation :

### 3.1. Fichiers de Configuration

- `next.config.ts` : Expliquer toute configuration spécifique.
- `tsconfig.json` : Options importantes du compilateur TypeScript.
- Fichiers d'environnement (`.env.local.example`) : Lister et expliquer chaque variable d'environnement.

### 3.2. Librairie (`lib/`)

- **Contextes (`*-context.tsx`) :**
  - `AuthContext` : Rôle, état géré, fonctions exposées, comment l'utiliser.
  - `QuoteContext` : Rôle, état des devis, fonctions CRUD, interaction avec `localStorage`.
  - `PartnerContext` : Gestion des partenaires.
  - `MessageContext` : Gestion des messages.
- **Utilitaires (`utils.ts`) :**
  - `calculateEstimatedPrice` : Logique de calcul détaillée.
  - Fonctions de formatage, de génération d'ID, d'interaction avec `localStorage`.
- **Données initiales/mock (`data.ts`) :** Structure des données, à quoi elles servent.

### 3.3. Composants (`components/`)

- **Composants UI réutilisables (`components/ui/`) :** Si des personnalisations importantes ont été faites par rapport à Shadcn/UI.
- **Composants spécifiques :**
  - `QuoteForm` : Logique du formulaire, validation (Zod), états, interaction avec les contextes et API.
  - `AutocompleteComponent` : Fonctionnement, intégration avec Google Places API.
  - `Navbar` : Logique de navigation, affichage conditionnel.

### 3.4. Pages et Routes API (`app/`)

- **Structure générale du `App Router`** : Comment les `layout.tsx` et `page.tsx` sont utilisés.
- **Pages clés :**
  - `app/quote/page.tsx` : Flux de demande de devis.
  - `app/admin/requests/page.tsx` : Logique de gestion des devis (filtrage, mise à jour, assignation, messagerie).
  - `app/admin/partners/page.tsx` : Gestion des partenaires.
  - `app/dashboard/page.tsx` (ou équivalent client) : Ce que le client peut voir et faire.
- **Routes API (`app/api/`) :**
  - `app/api/distance/route.ts` : Endpoint, paramètres attendus, ce qu'il retourne, interaction avec Google Distance Matrix API.
  - Autres API s'il y en a.

### 3.5. Schéma de Base de Données (si passage à Prisma/autre BDD)

- `prisma/schema.prisma` : Documenter chaque modèle, champ, relation et type énuméré.
  - Expliquer les choix de conception du modèle de données.

## 4. Génération de Documentation

Si JSDoc/TSDoc est utilisé de manière consistente, des outils comme [TypeDoc](https://typedoc.org/) peuvent générer un site web de documentation HTML à partir des commentaires du code source.

## 5. Prochaines Étapes

1.  Choisir un standard de documentation (ex: JSDoc pour toutes les fonctions exportées et types).
2.  Commencer par documenter les modules critiques dans `lib/` et les composants complexes.
3.  Intégrer la documentation dans le processus de revue de code pour s'assurer qu'elle est écrite et maintenue.
